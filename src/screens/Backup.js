import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { getConfig } from "../App";
import Api from "../utils/api";
import fetchData from "../utils/fetch";
import Restore from "./Restore";
import { TabPanel } from "./Transactions";
export const qs = require("query-string");

var FileSaver = require("file-saver");
let form = {};
export function preventExit(ev) {
  ev.preventDefault();
  return (ev.returnValue = "Are you sure you want to close?");
}

function Backup(props) {
  const [tabvalue, setTabvalue] = useState(0);
  const query = qs.parse(window.location.search);
  useEffect(() => {
    let tab = parseInt(query.tab);
    if (!isNaN(tab)) {
      setTabvalue(tab);
    }
  }, [query.tab]);
  return (
    <React.Fragment>
      <Tabs
        value={tabvalue}
        onChange={(e, val) => {
          setTabvalue(val);
          props.history.push({
            search: "tab=" + val,
          });
        }}
      >
        <Tab label="Backup" />
        <Tab label="Restore" />
      </Tabs>
      <TabPanel index={0} value={tabvalue}>
        <BackupData {...props} />
      </TabPanel>
      <TabPanel index={1} value={tabvalue}>
        <Restore {...props} />
      </TabPanel>
    </React.Fragment>
  );
}

function BackupData(props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Copying database please wait...");
  const startBackUp = useCallback(() => {
    window.addEventListener("beforeunload", preventExit);

    fetchData({
      before: () => {
        setLoading(true);
        setStatus("Copying database please wait...");
      },
      send: async () => await Api.post("/backup"),
      after: (data) => {
        let blob = new Blob([data], {
          type: "application/octet-stream",
        });
        FileSaver.saveAs(blob, "backup.sql");
        window.removeEventListener("beforeunload", preventExit);
        setLoading(false);
      },
    });
  }, [loading]);
  useEffect(() => {
    form = { ...getConfig().backup };
  }, []);
  return (
    <React.Fragment>
      <Dialog open={loading}>
        <Box position="relative">
          <DialogTitle>
            <LinearProgress />
            <Typography variant="h5">{status}</Typography>
            <Typography variant="body1" color="textSecondary">
              Don't close this tab
            </Typography>
          </DialogTitle>
          <DialogContent>
            <img
              src="/static/img/cake.gif"
              alt="Saving..."
              width="100%"
              style={{ pointerEvents: "none", userSelect: "none" }}
            />
          </DialogContent>
        </Box>
      </Dialog>
      <Box p={2}>
        <TextField
          defaultValue={getConfig().backup?.host || "localhost"}
          variant="outlined"
          label="Host"
          onChange={(e) => (form["host"] = e.target.value)}
          disabled={true}
        />
        <br />
        <br />
        <TextField
          defaultValue={getConfig().backup?.user || "root"}
          variant="outlined"
          label="Username"
          onChange={(e) => (form["user"] = e.target.value)}
          disabled={true}
        />
        <br />
        <br />
        <TextField
          defaultValue={getConfig().backup?.pass || ""}
          variant="outlined"
          label="Password"
          onChange={(e) => (form["pass"] = e.target.value)}
          disabled={true}
        />
        <br />
        <br />
        <TextField
          defaultValue={getConfig().backup?.table || "nenpos"}
          variant="outlined"
          label="Table"
          onChange={(e) => (form["table"] = e.target.value)}
          disabled={true}
        />
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={startBackUp}>
          Backup
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default Backup;
