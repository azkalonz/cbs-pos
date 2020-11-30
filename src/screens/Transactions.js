import { Box, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { qs } from "./Backup";
import POS, { POSHistory } from "./POS";

export function TabPanel(props) {
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
  const query = qs.parse(window.location.search);
  useEffect(() => {
    let tab = parseInt(query.tab);
    if (!isNaN(tab)) {
      setTabvalue(tab);
    }
  }, [query.tab]);
  return (
    <Box>
      <Tabs
        value={tabValue}
        onChange={(e, val) => {
          setTabvalue(val);
          props.history.push({
            search: "tab=" + val,
          });
        }}
      >
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
