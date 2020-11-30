import { Box } from "@material-ui/core";
import React from "react";
import store from "../utils/store";
import moment from "moment";

export const getOR = (number) => {
  let l = "00000000000";
  number = number + "";
  return l.slice(0, 11 - number.length) + number;
};

function Receipt(props) {
  const { username } = store.getState().userInfo;
  const { cart, grantTotal, lastOrder } = props;
  return (
    <Box>
      <table
        id="receipt"
        style={{ tableLayout: "fixed", wordBreak: "break-word" }}
      >
        <tr>
          <td colSpan={4} align="center">
            CEBU BAKERY SUPPL
            <br />
            Humay-Humay Road, Gun-ob, Lapu-Lapu City
          </td>
        </tr>
        <tr>
          <td colSpan={4} align="center" style={{ padding: "17px 0" }}>
            ORDER SLIP
          </td>
        </tr>
        <tr>
          <td colSpan={4} align="left">
            SO : #
            {getOR(
              lastOrder?.transaction_id ? lastOrder.transaction_id + 1 : 0
            )}
          </td>
        </tr>
        <tr>
          <td colSpan={4} align="left">
            Cashier : {username}
          </td>
        </tr>
        <tr>
          <td colSpan={4} align="left">
            Date :{" "}
            {props.isCurrent
              ? moment(lastOrder.created_at).format("L hh:mm A")
              : moment().format("L hh:mm A")}
          </td>
        </tr>
        <tr>
          <td colSpan={4} align="left">
            Customer : maica
          </td>
        </tr>
        <tr className="receipt-header">
          <td>Desc</td>
          <td>Price</td>
          <td>Qty</td>
          <td>Amt</td>
        </tr>
        {cart?.map((product) => {
          const { product_name, product_id, price, quantity } = product;
          return (
            <React.Fragment key={product_id}>
              <tr key={product_id}>
                <td colSpan={4}>{product_name}</td>
              </tr>
              <tr>
                <td></td>
                <td>{price.toFixed(2)}</td>
                <td>{quantity}</td>
                <td>{(price * quantity).toFixed(2)}</td>
              </tr>
            </React.Fragment>
          );
        })}
        <tfoot>
          <tr className="receipt-footer">
            <td colSpan={2}>SUBTOTAL</td>
            <td colSpan={2} align="right">
              {grantTotal.toFixed(2)}
            </td>
          </tr>

          <tr>
            <td colSpan={2}>AMOUNT DUE</td>
            <td colSpan={2} align="right">
              {grantTotal.toFixed(2)}
            </td>
          </tr>
          <tr className="received-by">
            <td colSpan={4} align="center">
              <hr />
              Received By
            </td>
          </tr>
        </tfoot>
      </table>
    </Box>
  );
}

export default Receipt;
