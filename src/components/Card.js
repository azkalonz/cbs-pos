import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Grow,
} from "@material-ui/core";

export function CardContent(props) {
  return (
    <Box className="content" width="100%">
      <Typography component="div" className="primary">
        {props.primary}
      </Typography>
      <Typography className="secondary">{props.secondary}</Typography>
    </Box>
  );
}

export default function Card(props) {
  const [loading, setLoading] = useState(props.loading || false);
  useEffect(() => {
    if (props.onLoad) props.onLoad(setLoading);
  }, [props.onLoad]);
  return (
    <Grow in={true}>
      <Box
        component={Paper}
        className={["card", props.color].join(" ")}
        style={{ width: props.width, position: "relative" }}
      >
        {!loading && props.actions && (
          <Box className="actions">{props.actions}</Box>
        )}
        {loading && <CircularProgress />}
        {!loading && props.children}
      </Box>
    </Grow>
  );
}
