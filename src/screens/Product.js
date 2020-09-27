import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import Card, { CardContent } from "../components/Card";
import Loader from "../components/Loader";
import Api from "../utils/api";
import fetchData from "../utils/fetch";
import formatter from "../utils/formatter";
import { Product as ProductUtil } from "../utils/products";
import moment from "moment";

function Product(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { product_id } = props.match.params;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [productCost, setProductCost] = useState([]);

  useEffect(() => {
    let id = parseInt(product_id);
    console.log(id, product_id);
    if (!isNaN(id)) {
      fetchData({
        before: () => setLoading(true),
        send: async () => await Api.get("/product/" + id),
        after: (data) => {
          fetchData({
            send: async () => await Api.get("/product/" + id + "/cost"),
            after: (costs) => {
              if (data) {
                data = {
                  ...data,
                  quantity: !data.quantity ? 0 : data.quantity,
                  price: data.price,
                  product_name: data.product_name?.replace("&quot;", '"'),
                  long_description: data.long_description?.replace(
                    "&quot;",
                    '"'
                  ),
                  costs,
                };
              }
              if (!ProductUtil.isHidden(data || {})) {
                setProduct(data || {});
              }
              setLoading(false);
            },
          });
        },
      });
    } else {
      alert("Invalid product_id");
    }
  }, [product_id]);
  return (
    <React.Fragment>
      {!loading && product.product_id && (
        <React.Fragment>
          <Box p={2}>
            <IconButton onClick={() => props.history.push("/products")}>
              <Icon>arrow_back</Icon>
            </IconButton>
            <Box>
              <Typography variant="h6">{product.product_name}</Typography>
              <Typography variant="body1">
                {product.long_description}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
            overflow="auto"
          >
            <Card color="maroon-yellow">
              <CardContent
                primary={product.quantity + " pcs"}
                secondary="Quantity"
              />
            </Card>
            <Card color="blue-green">
              <CardContent
                primary={formatter.format(product.price)}
                secondary="Price"
              />
            </Card>
          </Box>
          <Box>
            <MaterialTable
              title="Product Cost History"
              columns={[
                {
                  title: "Date",
                  field: "date_time",
                  render: (rowData) => {
                    return moment(rowData.date_time).format("LL (hh:mm A)");
                  },
                },
                {
                  title: "Cost Per Unit",
                  field: "cost_per_unit",
                  type: "currency",
                  currencySetting: {
                    currencyCode: "PHP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  },
                },
                { title: "Quantity", field: "total_quantity" },
                {
                  title: "Total Cost",
                  field: "total_product_cost",
                  type: "currency",
                  currencySetting: {
                    currencyCode: "PHP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  },
                },
              ]}
              data={product.costs}
            />
          </Box>
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

export default Product;
