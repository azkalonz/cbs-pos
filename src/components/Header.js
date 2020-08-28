import {
  AppBar,
  Avatar,
  Box,
  Icon,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React from "react";
import { connect } from "react-redux";
import { getCurrentMenu } from "./NavBar";
import { SearchProduct } from "./SearchInput";
import Api from "../utils/api";

function Header(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { first_name, last_name } = props.userInfo || {};
  return (
    <AppBar
      variant="outlined"
      position="sticky"
      style={{ background: "#fff", borderLeft: 0, color: "#000" }}
    >
      <Box component={Toolbar} display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center" width={isMobile ? "auto" : 150}>
          <IconButton onClick={props.nav.toggleNav}>
            <Icon>menu</Icon>
          </IconButton>
          {!isMobile && (
            <Typography className="title">
              {getCurrentMenu(props.history.location.pathname)?.name}
            </Typography>
          )}
        </Box>
        <SearchProduct
          placeholder="Search Product"
          fullWidth={isMobile}
          {...props}
        />
        <Box display="flex" alignItems="center">
          <PopupState variant="popover" popupId="add-file-btn">
            {(popupState) => (
              <React.Fragment>
                <IconButton {...bindTrigger(popupState)}>
                  <Icon>arrow_drop_down</Icon>
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem>
                    <Avatar
                      style={{ marginRight: 13, width: 30, height: 30 }}
                      src="/"
                      alt={first_name}
                    />
                    <Typography className="title-2">
                      {first_name + " " + last_name}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.localStorage.clear();
                      Api.auth();
                      popupState.close();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </Box>
      </Box>
    </AppBar>
  );
}
export default connect((states) => ({ userInfo: states.userInfo }))(Header);
