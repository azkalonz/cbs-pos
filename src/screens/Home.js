import { Box } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Card, { CardContent } from "../components/Card";

function Home(props) {
  return (
    <React.Fragment>
      <Box display="flex" width="100%" overflow="auto">
        <Card color="maroon-yellow">
          <CardContent primary="2000" secondary="Total Sales" />
        </Card>
        <Card color="blue-green">
          <CardContent primary="2000" secondary="Total Sales" />
        </Card>
      </Box>
    </React.Fragment>
  );
}

export default connect((states) => ({ userInfo: states.userInfo }))(Home);
