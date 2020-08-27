import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";

export function CardContent(props) {
  return (
    <Box className="content" width="100%">
      <Typography className="primary">{props.primary}</Typography>
      <Typography className="secondary">{props.secondary}</Typography>
    </Box>
  );
}

export default function Card(props) {
  return (
    <Box
      component={Paper}
      className={["card", props.color].join(" ")}
      style={{ width: props.width }}
    >
      {props.children}
    </Box>
  );
}
