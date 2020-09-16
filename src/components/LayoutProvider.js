import React, { useState, useEffect } from "react";
import { Box, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import Scrollbar from "./Scrollbar";
import { useHistory } from "react-router-dom";

const NAVBAR_WIDTH = 250;

function LayoutProvider(props) {
  const theme = useTheme();
  const history = useHistory();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isNavOpen, setNavOpen] = useState(isMobile);
  const [pathname, setPathname] = useState(history.location?.pathname);
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  useEffect(() => {
    history.listen((location, action) => {
      setPathname(location.pathname);
    });
  }, []);
  const styles = useStyles();
  useEffect(() => {
    if (isMobile) {
      setNavOpen(false);
    } else if (!isNavOpen && !isMobile) {
      setNavOpen(true);
    }
  }, [isMobile]);
  return props.ignore.indexOf(pathname) >= 0 ? (
    props.children
  ) : (
    <React.Fragment>
      <Box display="flex" height="100vh" overflow="hidden">
        <Box className={[styles.navBar, isNavOpen ? "opened" : ""].join(" ")}>
          <props.navbar history={history} />
        </Box>
        <Box width="100%" display="flex" flexDirection="column">
          <Box>
            <props.header nav={{ toggleNav }} history={history} />
          </Box>
          <Box height="100%" overflow="auto">
            <Scrollbar autoHide>
              <Box p={2}>
                {React.Children.map(props.children, (child) => {
                  const props = {
                    pathname,
                  };
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child, props);
                  }
                  return child;
                })}
              </Box>
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
