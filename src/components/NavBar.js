import React from "react";
import {
  List,
  ListItemText,
  ListItem,
  Box,
  Toolbar,
  Typography,
  Divider,
} from "@material-ui/core";
import Scrollbar from "./Scrollbar";
import { getConfig } from "../App";

const createMenu = (name, path) => ({ name, path });

export const getCurrentMenu = (path) => {
  path = path.split("/")[1];
  path = "/" + path;
  return dashboardMenu.find((q) => q.path.indexOf(path) >= 0);
};
export const dashboardMenu = [
  createMenu("Products", ["/products", "/"]),
  createMenu("Sales", ["/sales"]),
  createMenu("Backup", ["/backup"]),
];
function NavBar(props) {
  const { pathname } = props.history?.location || {};
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Toolbar disableGutters>
        <img
          src={getConfig().logo || "/static/logo.png"}
          height="70%"
          style={{ padding: 5 }}
        />
        <Typography className="title">
          {getConfig().appname || "CEBU BAKERY SUPPLY"}
        </Typography>
      </Toolbar>
      <Divider />
      <Box overflow="auto" height="100%" className="nav-list">
        <Scrollbar autoHide>
          <List>
            {dashboardMenu.map((m, i) => (
              <ListItem
                button
                key={i}
                divider
                selected={getCurrentMenu(pathname)?.name === m.name}
                onClick={() => props.history?.push(m.path[0])}
              >
                <ListItemText primary={m.name} />
              </ListItem>
            ))}
          </List>
        </Scrollbar>
      </Box>
    </Box>
  );
}

export default NavBar;
