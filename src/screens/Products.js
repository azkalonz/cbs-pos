import MaterialTable from "material-table";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Api from "../utils/api";
import fetchData from "../utils/fetch";
import Sales from "../components/Sales";
import { Product } from "../utils/products";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultHeaders = useMemo(
    () => [
      { title: "Name", field: "product_name" },
      { title: "Quantity", field: "quantity" },
	{
        title: "Cost",
        field: "cost_per_unit",
        type: "currency",
        currencySetting: {
          currencyCode: "PHP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      },
      {
        title: "Price",
        field: "price",
        type: "currency",
        currencySetting: {
          currencyCode: "PHP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      },
    ],
    []
  );
  useEffect(() => {
    fetchData({
      before: () => setLoading(true),
      send: async () => await Api.get("/products"),
      after: (data) => {
        setProducts(
          Product.ignore(
            data?.map((q) => ({
              ...q,
              quantity: !q.quantity ? 0 : q.quantity,
              product_name: q.product_name?.replace("&quot;", '"'),
              price: parseInt(q.price) || 0,
            })) || []
          )
        );
        setLoading(false);
      },
    });
  }, []);
  return (
    <React.Fragment>
      <Sales {...props} />
      <MaterialTable
        columns={defaultHeaders}
        data={products}
        isLoading={loading}
        title="Products"
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
  );
}

export default connect((states) => ({ userInfo: states.userInfo }))(Products);
