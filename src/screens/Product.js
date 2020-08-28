import React, { useEffect, useState } from "react";
import LayoutProvider from "../components/LayoutProvider";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import fetchData from "../utils/fetch";
import Api from "../utils/api";
import { Box, Typography, IconButton, Icon } from "@material-ui/core";
import Loader from "../components/Loader";
import Card, { CardContent } from "../components/Card";

function Product(props) {
  const { product_id } = props.match.params;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let id = parseInt(product_id);
    if (!isNaN(id)) {
      fetchData({
        before: () => setLoading(true),
        send: async () => await Api.get("/product/" + id),
        after: (data) => {
          if (data) {
            data = {
              ...data,
              quantity: !data.quantity ? 0 : data.quantity,
              price: "Php " + (parseInt(data.price) || 0).toFixed(2),
            };
          }
          setProduct(data || {});
          setLoading(false);
        },
      });
    } else {
      alert("Invalid product_id");
    }
  }, [product_id]);
  return (
    <LayoutProvider header={Header} navbar={NavBar} {...props}>
      {!loading && product.product_id && (
        <React.Fragment>
          <Box p={2} display="flex" alignItems="center">
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
          <Box display="flex">
            <Card color="maroon-yellow">
              <CardContent
                primary={product.quantity + " pcs"}
                secondary="Quantity"
              />
            </Card>
            <Card color="blue-green">
              <CardContent primary={product.price} secondary="Price" />
            </Card>
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
    </LayoutProvider>
  );
}

export default Product;
