import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Chip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Card, { CardContent } from "../components/Card";
import Loader from "../components/Loader";
import Api from "../utils/api";
import fetchData from "../utils/fetch";
import formatter from "../utils/formatter";
import MaterialTable from "material-table";
import moment from "moment";

function Sale(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { sales_id } = props.match.params;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let id = parseInt(sales_id);
    console.log(id, sales_id);
    if (!isNaN(id)) {
      fetchData({
        before: () => setLoading(true),
        send: async () => await Api.get("/sales/" + id),
        after: (data) => {
          if (data) {
            data.sales = data.sales?.map((q) => ({
              ...q,
              entry_date2: moment(q.entry_date).format("LL | hh:mm A"),
              long_description: q.long_description?.replace("&quot;", '"'),
              product_name: q.product_name?.replace("&quot;", '"'),
            }));
            data = {
              ...data,
              quantity: !data.quantity ? 0 : data.quantity,
              price: data.price,
              product_name: data.product_name?.replace("&quot;", '"'),
              long_description: data.long_description?.replace("&quot;", '"'),
            };
          }
          setProduct(data || {});
          setLoading(false);
        },
      });
    } else {
      alert("Invalid sales_id");
    }
  }, [sales_id]);
  return (
    <React.Fragment>
      {!loading && (
        <React.Fragment>
          <Box p={2} display="flex" alignItems="center">
            <IconButton onClick={() => props.history.push("/sales")}>
              <Icon>arrow_back</Icon>
            </IconButton>
            <Box>
              <Typography variant="h6" component="div">
                #{product.sales_id}
                <Chip
                  label={product.description}
                  style={{ marginLeft: 13, marginBottom: 6 }}
                  color="secondary"
                />
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            paddingBottom={2}
          >
            <Box>
              <Typography>
                Total : {formatter.format(product.amount)}
              </Typography>
              <Typography variant="body1">
                Transaction Date :{" "}
                {moment(product.entry_date).format("LL (hh:mm A)")}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                props.history.push("/products/" + product?.product_id)
              }
            >
              View Stocks
            </Button>
          </Box>
          <MaterialTable
            columns={[
              {
                id: 1,
                title: "Product ID",
                field: "product_id",
                filtering: false,
              },
              {
                id: 5,
                title: "Product",
                field: "product_name",
                filtering: false,
              },
              {
                id: 2,
                title: "Description",
                field: "long_description",
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
            ]}
            data={product?.sales}
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
              props.history.push("/products/" + data.product_id);
            }}
          />
        </React.Fragment>
      )}
      {loading && (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Loader label="Loading product..." />
        </Box>
      )}
    </React.Fragment>
  );
}

export default Sale;
