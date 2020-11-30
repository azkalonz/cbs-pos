import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { getConfig } from "../App";
import Api from "../utils/api";
import fetchData from "../utils/fetch";
var FileSaver = require("file-saver");
let form = {};
function preventExit(ev) {
  ev.preventDefault();
  return (ev.returnValue = "Are you sure you want to close?");
}
function Restore(props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Restoring database please wait...");
  const startBackUp = useCallback(() => {
    window.addEventListener("beforeunload", preventExit);

    fetchData({
      before: () => {
        setLoading(true);
        setStatus("Restoring database please wait...");
      },
      send: async () =>
        await Api.post("/restore", {
          body: form,
        }),
      after: (data) => {
        if (data?.success) {
          alert("Sucess");
        }
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
        />
        <br />
        <br />
        <TextField
          defaultValue={getConfig().backup?.user || "root"}
          variant="outlined"
          label="Username"
          onChange={(e) => (form["user"] = e.target.value)}
        />
        <br />
        <br />
        <TextField
          defaultValue={getConfig().backup?.pass || ""}
          variant="outlined"
          label="Password"
          onChange={(e) => (form["pass"] = e.target.value)}
        />
        <br />
        <br />
        <TextField
          defaultValue={getConfig().backup?.table || "nenpos"}
          variant="outlined"
          label="Table"
          onChange={(e) => (form["table"] = e.target.value)}
        />
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={startBackUp}>
          Restore
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default Restore;
