import React from "react";
import LayoutProvider from "../components/LayoutProvider";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Card, { CardContent } from "../components/Card";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";

function Home(props) {
  return (
    <LayoutProvider header={Header} navbar={NavBar} {...props}>
      <Box display="flex" width="100%" overflow="auto">
        <Card color="maroon-yellow">
          <CardContent primary="2000" secondary="Total Sales" />
        </Card>
        <Card color="blue-green">
          <CardContent primary="2000" secondary="Total Sales" />
        </Card>
      </Box>
    </LayoutProvider>
  );
}

export default connect((states) => ({ userInfo: states.userInfo }))(Home);
