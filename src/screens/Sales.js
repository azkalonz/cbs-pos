import MaterialTable from "material-table";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import Api from "../utils/api";
import fetchData from "../utils/fetch";
import moment from "moment";
import {
  TextField,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import formatter, { UNIXtoDate, dateToUNIX } from "../utils/formatter";
import Card, { CardContent } from "../components/Card";
const qs = require("query-string");
const momentRange = require("moment-range");
momentRange.extendMoment(moment);

function Sales(props) {
  const query = qs.parse(window.location.search);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDate] = useState({
    from: moment(UNIXtoDate(query.from)).format("YYYY-MM-DDThh:mm"),
    to: moment(UNIXtoDate(query.to)).format("YYYY-MM-DDThh:mm"),
  });
  const onSalesRangeClose = useCallback(
    (range) => {
      props.history.push("/sales?" + createRangeParam(range));
    },
    [dateRange]
  );
  const createRangeParam = useCallback((range) => {
    const { from, to } = range;
    let f = dateToUNIX(new Date(from)),
      t = dateToUNIX(new Date(to));
    return `from=${f}&to=${t}`;
  }, []);
  const dateRangeFilter = (a, b) => {
    let startDate = new Date(dateRange.from),
      endDate = new Date(dateRange.to),
      date = new Date(a.entry_date_orig),
      range = moment().range(startDate, endDate);
    return range.contains(date);
  };
  const getFilteredSales = useCallback(() => {
    return [...sales]
      .filter(dateRangeFilter)
      .sort(
        (a, b) => new Date(b.entry_date_orig) - new Date(a.entry_date_orig)
      );
  }, [sales, dateRange]);
  const salesByMethod = useCallback(
    (method) => {
      let totalSales = 0;
      getFilteredSales()
        .filter((q) => q.description === method)
        .forEach((q) => {
          totalSales += q.amount;
        });
      return totalSales;
    },
    [getFilteredSales]
  );
  useEffect(() => {
    fetchData({
      before: () => setLoading(true),
      send: async () => await Api.get("/sales"),
      after: (data) => {
        setSales(
          data?.map((q) => ({
            ...q,
            entry_date_orig: q.entry_date,
            entry_date: moment(q.entry_date).format("LL | hh:mm A"),
          })) || []
        );
        setLoading(false);
      },
    });
  }, []);
  useEffect(() => {
    if (sales?.length && !(query.from && query.to)) {
      setDate({
        from: moment(sales[0].entry_date_orig).format("YYYY-MM-DDThh:mm"),
        to: moment().format("YYYY-MM-DDThh:mm"),
      });
    }
  }, [sales]);
  return (
    <React.Fragment>
      <Dialog
        open={props.history.location.hash === "#salesrange"}
        onClose={onSalesRangeClose}
      >
        <DialogTitle>Sales Date Range</DialogTitle>
        <DialogContent>
          <DateFilter
            dateRange={dateRange}
            onChange={(range) => {
              setDate(range);
              onSalesRangeClose(range);
            }}
          />
        </DialogContent>
      </Dialog>
      <Box display="flex" width="100%" overflow="auto">
        <Card color="blue-green">
          <CardContent
            primary={formatter.format(salesByMethod("Cash"))}
            secondary="Cash"
          />
        </Card>
        <Card color="blue-green">
          <CardContent
            primary={formatter.format(salesByMethod("Debit Card"))}
            secondary="Debit Card"
          />
        </Card>
      </Box>
      <Box p={2}>
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-end"
          paddingBottom={2}
        >
          <Box display="flex" alignItems="center">
            <Typography>Sales</Typography>
            <Button
              style={{ marginLeft: 13 }}
              color="primary"
              variant="contained"
              onClick={() => props.history.push("#salesrange")}
            >
              {moment(dateRange.from).format("MMM D")}
              {" - "}
              {moment(dateRange.to).format("MMM D")}
            </Button>
          </Box>
        </Box>
        <MaterialTable
          columns={[
            { id: 1, title: "Sales ID", field: "sales_id", filtering: false },
            { id: 5, title: "Note", field: "note", filtering: false },
            {
              id: 2,
              title: "Description",
              field: "description",
            },
            {
              id: 3,
              title: "Amount",
              field: "amount",
              type: "currency",
              currencySetting: {
                currencyCode: "PHP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              },
            },
            {
              id: 4,
              title: "Date",
              field: "entry_date",
              type: "date-time",
            },
          ]}
          data={getFilteredSales()}
          isLoading={loading}
          title="sales"
          style={{ marginBottom: 100 }}
          options={{
            pageSize: 10,
            showTitle: false,
            searchFieldVariant: "outlined",
            searchFieldStyle: {
              height: 34,
              marginTop: 13,
            },
          }}
          onRowClick={(e, data) => {
            props.history.push("/sales/" + data.sales_id);
          }}
        />
      </Box>
    </React.Fragment>
  );
}
export function DateFilter(props) {
  const [dateRange, setDate] = useState(props.dateRange);
  const onChange = useCallback(
    (key, val) => {
      let d = {};
      d[key] = val;
      setDate({ ...dateRange, ...d });
    },
    [dateRange]
  );
  const todaysSales = useCallback(() => {
    setDate({
      from: moment().format("YYYY-MM-DDThh:mm"),
      to: moment().format("YYYY-MM-DDThh:mm"),
    });
  }, []);
  const onSave = useCallback(() => {
    props.onChange(dateRange);
  }, [dateRange]);
  return (
    <Box display="flex" flexDirection="column">
      <Box p={2.5} marginBottom={3} display="flex" style={{ float: "right" }}>
        <TextField
          id="datetime-local"
          label="From"
          type="datetime-local"
          defaultValue={props.dateRange.from}
          value={dateRange.from}
          onChange={(e) => {
            onChange("from", e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="datetime-local"
          label="To"
          type="datetime-local"
          defaultValue={props.dateRange.to}
          value={dateRange.to}
          onChange={(e) => {
            onChange("to", e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Button onClick={todaysSales} variant="outlined" color="primary">
        Today's Sales
      </Button>
      <Button onClick={onSave} variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
}

export default connect((states) => ({ userInfo: states.userInfo }))(Sales);
