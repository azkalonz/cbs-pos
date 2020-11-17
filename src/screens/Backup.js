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

let form = {};
function preventExit(ev) {
  ev.preventDefault();
  return (ev.returnValue = "Are you sure you want to close?");
}
function Backup(props) {
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
      after: () => {
        fetchData({
          before: () => {
            setStatus("Restoring database please wait...");
          },
          send: async () =>
            await Api.post("/restore", {
              body: form,
            }),
          after: () => {
            window.removeEventListener("beforeunload", preventExit);
            setLoading(false);
            alert("Success");
          },
        });
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
      <form width="100%">
        <fieldset>
          <legend>
            <Typography>Output</Typography>
          </legend>
          <Box>
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
              Backup
            </Button>
          </Box>
        </fieldset>
      </form>
    </React.Fragment>
  );
}

export default Backup;