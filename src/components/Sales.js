import React, { useCallback, useState, useMemo, useEffect } from "react";
import Card, { CardContent } from "./Card";
import {
  ButtonGroup,
  Button,
  Icon,
  Tooltip,
  DialogContent,
  Dialog,
  DialogTitle,
  Chip,
  Typography,
} from "@material-ui/core";
import fetchData from "../utils/fetch";
import formatter, { dateToUNIX, UNIXtoDate } from "../utils/formatter";
import Api from "../utils/api";
import { DateFilter } from "../screens/Sales";
import moment from "moment";
const qs = require("query-string");

function Sales(props) {
  const query = qs.parse(window.location.search);
  const [sales, setSales] = useState([]);
  const [dateRange, setDate] = useState({
    from: moment(UNIXtoDate(query.from)).format("YYYY-MM-DDThh:mm"),
    to: moment(UNIXtoDate(query.to)).format("YYYY-MM-DDThh:mm"),
  });
  const onSalesRangeClose = () => {
    props.history.push("#");
  };
  const dateRangeFilter = (a, b) => {
    let startDate = new Date(dateRange.from),
      endDate = new Date(dateRange.to),
      date = new Date(a.entry_date),
      range = moment().range(startDate, endDate);
    return range.contains(date);
  };
  const getFilteredSales = useCallback(() => {
    return [...sales]
      .filter(dateRangeFilter)
      .sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
  }, [sales, dateRange]);
  const getTotalRevenue = useCallback(() => {
    let totalAmount = 0;
    getFilteredSales().forEach((q) => {
      totalAmount += q.amount;
    });
    return totalAmount;
  }, [getFilteredSales]);
  const createRangeParam = useCallback(() => {
    const { from, to } = dateRange;
    let f = dateToUNIX(new Date(from)),
      t = dateToUNIX(new Date(to));
    console.log(from, to);
    return `from=${f}&to=${t}`;
  }, [dateRange]);
  const CardActions = useMemo(
    () => (
      <ButtonGroup variant="text" color="primary">
        <Tooltip title="View details">
          <Button
            onClick={() => props.history.push("/sales?" + createRangeParam())}
          >
            <Icon>visibility</Icon>
          </Button>
        </Tooltip>
        {/* <Tooltip title="Filter">
          <Button>
            <Icon>filter_alt</Icon>
          </Button>
        </Tooltip> */}
        <Tooltip title="Date range">
          <Button onClick={() => props.history.push("#salesrange")}>
            <Icon>today</Icon>
          </Button>
        </Tooltip>
      </ButtonGroup>
    ),
    [dateRange]
  );
  const fetchSales = useCallback((setLoading) => {
    fetchData({
      send: async () => await Api.get("/sales"),
      after: (data) => {
        setSales(
          data?.sort(
            (a, b) => new Date(b.entry_date) - new Date(a.entry_date)
          ) || []
        );
        setLoading(false);
      },
    });
  }, []);
  //   useEffect(() => {
  //     if (sales?.length) {
  //       setDate({
  //         from: moment(sales[0].entry_date).format("YYYY-MM-DDThh:mm"),
  //         to: moment().format("YYYY-MM-DDThh:mm"),
  //       });
  //     }
  //   }, [sales]);
  return (
    <div>
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
              onSalesRangeClose();
            }}
          />
        </DialogContent>
      </Dialog>
      <Card
        color="maroon-yellow"
        loading={true}
        onLoad={fetchSales}
        actions={CardActions}
      >
        <CardContent
          primary={
            <React.Fragment>
              <Chip
                label={
                  moment(dateRange.from).format("MMM D") +
                  " - " +
                  moment(dateRange.to).format("MMM D")
                }
              />
              <Typography variant="h5" style={{ fontWeight: 600 }}>
                {formatter.format(getTotalRevenue())}
              </Typography>
            </React.Fragment>
          }
          secondary={"Sales Revenue"}
        />
      </Card>
    </div>
  );
}

export default Sales;
