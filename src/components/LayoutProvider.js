import React, { useState, useEffect } from "react";
import { Box, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import Scrollbar from "./Scrollbar";

const NAVBAR_WIDTH = 250;

function LayoutProvider(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isNavOpen, setNavOpen] = useState(true);
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  const styles = useStyles();
  useEffect(() => {
    if (isMobile) {
      setNavOpen(false);
    } else if (!isNavOpen && !isMobile) {
      setNavOpen(true);
    }
  }, [isMobile]);
  return (
    <React.Fragment>
      <Box display="flex" height="100vh" overflow="hidden">
        <Box className={[styles.navBar, isNavOpen ? "opened" : ""].join(" ")}>
          <props.navbar {...props} />
        </Box>
        <Box width="100%" display="flex" flexDirection="column">
          <Box>
            <props.header nav={{ toggleNav }} {...props} />
          </Box>
          <Box height="100%" overflow="auto">
            <Scrollbar autoHide>
              <Box p={2}>{props.children}</Box>
            </Scrollbar>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
const useStyles = makeStyles((theme) => ({
  navBar: {
    width: NAVBAR_WIDTH,
    minWidth: NAVBAR_WIDTH,
    overflow: "hidden",
    transition: "margin .4s ease-out",
    borderRight: "1px solid " + theme.palette.divider,
    marginLeft: -NAVBAR_WIDTH,
    "&.opened": {
      marginLeft: 0,
      overflow: "auto",
    },
  },
}));
export default LayoutProvider;
