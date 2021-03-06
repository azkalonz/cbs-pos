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
import { connect } from "react-redux";
import store from "../utils/store";

const createMenu = (name, path, visibleTo) => ({
  name,
  path,
  visibleTo,
});
export const getCurrentMenu = (path) => {
  path = path.split("/")[1];
  path = "/" + path;
  return dashboardMenu.find((q) => q.path.indexOf(path) >= 0);
};
export const dashboardMenu = [
  createMenu("Products", ["/products", "/"], "admin"),
  createMenu("Sales", ["/sales"], "admin"),
  createMenu("Transactions", ["/transactions"]),
  createMenu("Backup", ["/backup"], "admin"),
];
function NavBar(props) {
  const { user_type } = store.getState().userInfo || {};
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
            {dashboardMenu
              .filter((q) => (q.visibleTo ? q.visibleTo === user_type : true))
              .map((m, i) => (
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
