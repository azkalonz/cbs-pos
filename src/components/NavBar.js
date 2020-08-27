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

const createMenu = (name, path) => ({ name, path });

export const getCurrentMenu = (path) => {
  return dashboardMenu.find((q) => q.path === path);
};
export const dashboardMenu = [
  createMenu("Dashboard", "/"),
  createMenu("Inventory", "/inventory"),
];
function NavBar(props) {
  const { pathname } = props.history?.location || {};
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Toolbar disableGutters>
        <img src="/static/logo.png" height="70%" style={{ padding: 5 }} />
        <Typography className="title">CEBU BAKERY SUPPLY</Typography>
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
                selected={pathname === m.path}
                onClick={() => props.history?.push(m.path)}
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
