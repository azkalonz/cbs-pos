import { createMuiTheme } from "@material-ui/core";
const TOOLBAR_HEIGHT = 60;
const TEXTFIELD_HEIGHT = 34;
const PRIMARY_COLOR = "#7e1316";
const SECONDARY_COLOR = "#ffb100";
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
        transition: "all 0.2s ease-out",
        "& input": {
          paddingTop: 0,
          paddingBottom: 0,
          height: TEXTFIELD_HEIGHT,
        },
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
