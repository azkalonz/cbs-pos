import React, { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";

const NAVBAR_WIDTH = 250;

function LayoutProvider(props) {
  const [isNavOpen, setNavOpen] = useState(true);
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  const styles = useStyles();
  return (
    <React.Fragment>
      <Box display="flex" height="100vh" overflow="hidden">
        <Box className={[styles.navBar, isNavOpen ? "opened" : ""].join(" ")}>
          <props.navbar {...props} />
        </Box>
        <Box width="100%">
          <Box>
            <props.header nav={{ toggleNav }} {...props} />
          </Box>
          <Box p={2}>{props.children}</Box>
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
