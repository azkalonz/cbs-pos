import React from "react";
import { Box, Typography } from "@material-ui/core";

function Loader(props) {
  return (
    <Box display="flex" alignItems="center">
      <img
        src="/static/img/cake.gif"
        width={props.size || 140}
        style={{ margin: (props.offset || -50) + "px" }}
      />
      <Typography className="title">
        {props.label || "Loading app..."}
      </Typography>
    </Box>
  );
}

export default Loader;
