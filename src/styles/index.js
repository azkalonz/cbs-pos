import { createMuiTheme } from "@material-ui/core";
import { getConfig } from "../App";
const TOOLBAR_HEIGHT = 60;
const TEXTFIELD_HEIGHT = 50;
const PRIMARY_COLOR = getConfig().theme?.primary || "#7e1316";
const SECONDARY_COLOR = getConfig().theme?.secondary || "#ffb100";
const SELECTED_ITEM = "rgba(0,0,0,0.3)";
export default createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        height: TOOLBAR_HEIGHT,
        minHeight: TOOLBAR_HEIGHT + "px!important",
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: SECONDARY_COLOR,
      },
    },
    MuiListItem: {
      root: {
        "&.Mui-selected": {
          backgroundColor: SELECTED_ITEM,
        },
      },
    },
    MuiTextField: {
      root: {
        height: TEXTFIELD_HEIGHT,
        background: "#fff",
        transition: "all 0.2s ease-out",
        "& input": {
          paddingTop: 0,
          paddingBottom: 0,
          height: TEXTFIELD_HEIGHT,
        },
      },
    },
    MuiPopover: {
      root: {
        marginTop: 45,
      },
    },
    MuiTypography: {
      root: {
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
});
