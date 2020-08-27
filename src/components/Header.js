import {
  AppBar,
  Icon,
  IconButton,
  Toolbar,
  Box,
  Typography,
} from "@material-ui/core";
import React from "react";
import { SearchProduct } from "./SearchInput";
import { getCurrentMenu } from "./NavBar";

function Header(props) {
  return (
    <AppBar
      variant="outlined"
      position="sticky"
      style={{ background: "#fff", borderLeft: 0, color: "#000" }}
    >
      <Box component={Toolbar} display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <IconButton onClick={props.nav.toggleNav}>
            <Icon>menu</Icon>
          </IconButton>
          <Typography className="title">
            {getCurrentMenu(props.history.location.pathname)?.name}
          </Typography>
        </Box>
        <SearchProduct placeholder="Search Product" />
      </Box>
    </AppBar>
  );
}
export default Header;
