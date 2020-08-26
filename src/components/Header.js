import { AppBar, Icon, IconButton, Toolbar } from "@material-ui/core";
import React from "react";
import { SearchProduct } from "./SearchInput";

function Header(props) {
  return (
    <AppBar
      variant="outlined"
      position="sticky"
      style={{ background: "#fff", borderLeft: 0 }}
    >
      <Toolbar>
        <IconButton onClick={props.nav.toggleNav}>
          <Icon>menu</Icon>
        </IconButton>
        <SearchProduct placeholder="Search Product" />
      </Toolbar>
    </AppBar>
  );
}
export default Header;
