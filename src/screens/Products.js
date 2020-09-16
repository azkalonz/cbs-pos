import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Api from "../utils/api";
import fetchData from "../utils/fetch";
import Sales from "../components/Sales";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData({
      before: () => setLoading(true),
      send: async () => await Api.get("/products"),
      after: (data) => {
        setProducts(
          data?.map((q) => ({
            ...q,
            quantity: !q.quantity ? 0 : q.quantity,
            product_name: q.product_name?.replace("&quot;", '"'),
            price: parseInt(q.price) || 0,
          })) || []
        );
        setLoading(false);
      },
    });
  }, []);
  return (
    <React.Fragment>
      <Sales {...props} />
      <MaterialTable
        columns={[
          { title: "ID", field: "product_id" },
          { title: "Name", field: "product_name" },
          { title: "Quantity", field: "quantity" },
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
        ]}
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
