import { Box, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import POS, { POSHistory } from "./POS";

function TabPanel(props) {
  const { index, value, saveState } = props;
  return saveState ? (
    <Box style={{ display: index === value ? "block" : "none" }}>
      {props.children}
    </Box>
  ) : index === value ? (
    props.children
  ) : null;
}

function Transactions(props) {
  const [tabValue, setTabvalue] = useState(0);
  return (
    <Box>
      <Tabs value={tabValue} onChange={(e, val) => setTabvalue(val)}>
        <Tab label="Create Transaction" />
        <Tab label="View History" />
      </Tabs>
      <TabPanel index={0} value={tabValue} saveState={true}>
        <POS />
      </TabPanel>
      <TabPanel index={1} value={tabValue}>
        <POSHistory {...props} />
      </TabPanel>
    </Box>
  );
}

export default Transactions;
