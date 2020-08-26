import { createMuiTheme } from "@material-ui/core";
const TOOLBAR_HEIGHT = 60;
const TEXTFIELD_HEIGHT = 34;
const PRIMARY_COLOR = "#7e1316";
const SECONDARY_COLOR = "#ffb100";
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
          backgroundColor: SECONDARY_COLOR,
        },
      },
    },
    MuiTextField: {
      root: {
        height: TEXTFIELD_HEIGHT,
        "& input": {
          paddingTop: 0,
          paddingBottom: 0,
          height: TEXTFIELD_HEIGHT,
        },
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
