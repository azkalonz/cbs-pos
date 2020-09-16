import React from "react";
import { Icon, IconButton, Typography, Box } from "@material-ui/core";

function PageNotFound(props) {
  return (
    <div>
      <IconButton onClick={() => props.history.push("/products")}>
        <Icon>arrow_back</Icon>
      </IconButton>
      <Box textAlign="center">
        <Typography variant="h5" style={{ opacity: 0.6 }}>
          Page Not Found
        </Typography>
      </Box>
    </div>
  );
}

export default PageNotFound;
