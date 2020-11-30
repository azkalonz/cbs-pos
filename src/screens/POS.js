import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import MaterialTable from "material-table";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SearchProduct } from "../components/SearchInput";
import Api from "../utils/api";
import fetchData from "../utils/fetch";
import moment from "moment";
import { preventExit } from "./Backup";
import print from "print-js";
import Receipt, { getOR } from "../components/Receipt";
const html2canvas = require("html2canvas");

var currencyFormatter = require("currency-formatter");

const printReceipt = (callback = () => {}) => {
  html2canvas(document.querySelector("#receipt"), {
    dpi: 144,
  }).then((canvas) => {
    let url = canvas.toDataURL("image/png");
    callback();
    print({
      printable: url,
      type: "image",
    });
  });
};

function POS(props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [cart, setCart] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastOrder, setLastOrder] = useState({});
  const noteRef = useRef();
  const amountRef = useRef();
  const addToCart = useCallback(
    (product, resetSearch) => {
      if (product?.product_id) {
        product = {
          product_id: product.product_id,
          product_name: product.product_name,
          quantity: 1,
          price: product.price,
          code: product.code,
        };
        setCart([product, ...cart]);
        resetSearch();
      }
    },
    [cart]
  );
  const getGrandTotal = useCallback(() => {
    let t = 0;
    cart.map((q) => {
      t += q.price * q.quantity;
    });
    return t;
  }, [cart]);
  const updateCart = useCallback(
    (product, update) => {
      let nextCart = [...cart];
      let index = nextCart.findIndex(
        (q) => q.product_id === product.product_id
      );
      if (index >= 0) {
        nextCart[index] = { ...nextCart[index], ...update };
        if (update.quantity !== undefined) {
          if (update.quantity <= 0) {
            nextCart.splice(index, 1);
          }
        }
      }
      setCart(nextCart);
    },
    [cart]
  );
  const getProduct = useCallback(
    (product, update) => {
      let nextCart = [...cart];
      let index = nextCart.findIndex(
        (q) => q.product_id === product.product_id
      );
      if (index >= 0) {
        return nextCart[index];
      } else {
        return {};
      }
    },
    [cart]
  );
  const continueTransaction = useCallback(() => {
    if (cart.length) {
      setDialogOpen(true);
      setSaving(true);
      fetchData({
        send: async () => await Api.get("/last-order"),
        after: (data) => {
          setSaving(false);
          setLastOrder(data);
        },
      });
    } else {
      alert("Table is empty");
    }
  }, [cart]);
  const checkout = useCallback(() => {
    if (cart.length) {
      setSaving(true);
      const transaction = {
        total: getGrandTotal(),
        transaction_meta: JSON.stringify(cart),
        note: noteRef.current.value,
        payment_id: 1,
        amount_paid: amountRef.current.value,
      };
      fetchData({
        send: async () => await Api.post("/transaction", { body: transaction }),
        after: (data) => {
          if (data) {
            printReceipt(() => {
              setDialogOpen(false);
              setCart([]);
              setPage(1);
            });
          }
          setSaving(false);
        },
      });
    }
  }, [cart]);
  const getPageCount = useCallback(() => {
    return Math.ceil(cart.length / pageSize);
  }, [cart, pageSize]);
  useEffect(() => {
    if (cart.length) {
      window.addEventListener("beforeunload", preventExit);
    } else {
      window.removeEventListener("beforeunload", preventExit);
    }
    return () => {
      window.removeEventListener("beforeunload", preventExit);
    };
  }, [cart]);
  return (
    <Box>
      <Dialog
        open={dialogOpen}
        onClose={() => !saving && setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Confirm
          {saving && <LinearProgress />}
        </DialogTitle>
        <DialogContent>
          <Receipt
            lastOrder={lastOrder}
            cart={cart}
            grantTotal={getGrandTotal()}
          />
          <TextField
            disabled={saving}
            multiline
            type="text"
            label="Note"
            placeholder="Transaction note"
            fullWidth
            rows={2}
            inputRef={noteRef}
          />
          <TextField
            disabled={saving}
            type="number"
            fullWidth
            label="Amount"
            inputRef={amountRef}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            disabled={saving}
            onClick={checkout}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialTable
        title=""
        onChangePage={(p) => {
          console.log(p);
        }}
        page={page}
        components={{
          Pagination: (e) => (
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
              p={2}
            >
              {cart.length ? (
                <Box alignSelf="flex-start">
                  <Pagination
                    page={page}
                    count={getPageCount()}
                    onChange={(e, page) => setPage(page)}
                  />
                </Box>
              ) : null}
              <Box display="flex" alignItems="center">
                <Typography>Grand Total</Typography>
                <Typography
                  style={{
                    marginLeft: 13,
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  {currencyFormatter.format(getGrandTotal(), {
                    locale: "ph-PH",
                  })}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Icon>https</Icon>}
                onClick={continueTransaction}
              >
                Continue
              </Button>
            </Box>
          ),
          Actions: () => (
            <Box position="relative" width={300}>
              <SearchProduct
                align="flex-end"
                onClick={addToCart}
                fullWidth
                placeholder="Product code/name"
              />
            </Box>
          ),
        }}
        options={{
          initialPage: 1,
          search: false,
          sorting: false,
          draggable: false,
          pageSize: pageSize,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "Add a product to continue",
          },
        }}
        columns={[
          {
            title: "Product name",
            render: (row) => (
              <Box className="center-all" justifyContent="flex-start">
                <IconButton onClick={() => updateCart(row, { quantity: 0 })}>
                  <Icon>close</Icon>
                </IconButton>
                <Typography>{row.product_name}</Typography>
              </Box>
            ),
          },
          {
            title: "Price",
            render: (row) =>
              currencyFormatter.format(row.price, {
                locale: "ph-PH",
              }),
          },
          {
            title: "Quantity",
            field: "quantity",
            render: (row) => (
              <Box>
                <IconButton
                  onClick={(e) => {
                    updateCart(row, { quantity: row.quantity - 1 });
                  }}
                >
                  <Icon>remove</Icon>
                </IconButton>
                <TextField type="number" value={getProduct(row).quantity} />
                <IconButton
                  onClick={(e) => {
                    updateCart(row, { quantity: row.quantity + 1 });
                  }}
                >
                  <Icon>add</Icon>
                </IconButton>
              </Box>
            ),
          },
          {
            title: "Sub Total",
            render: (row) =>
              currencyFormatter.format(row.quantity * row.price, {
                locale: "ph-PH",
              }),
          },
        ]}
        data={cart.slice(pageSize * (page - 1), pageSize * page)}
      />
    </Box>
  );
}
export default POS;

export function POSHistory(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTransaction, setSelected] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelToken;
    fetchData({
      send: async () =>
        await Api.get("/transaction", {
          cancelToken: (c) => (cancelToken = c),
        }),
      after: (data) => {
        if (data) {
          setTransactions(
            data.map((q) => ({
              ...q,
              transaction_meta: JSON.parse(q.transaction_meta),
              date: moment(q.created_at).format("lll"),
            }))
          );
          setLoading(false);
        }
      },
    });
    return () => {
      if (typeof cancelToken === "function") cancelToken();
    };
  }, []);
  const deleteTransaction = useCallback(
    ({ transaction_id }) => {
      setSaving(true);
      fetchData({
        send: async () => await Api.delete("/transaction/" + transaction_id),
        after: (data) => {
          if (data?.success) {
            let nextTransactions = [...transactions];
            setDialogOpen(false);
            let index = nextTransactions.findIndex(
              (q) => q.transaction_id === transaction_id
            );
            if (index >= 0) {
              nextTransactions.splice(index, 1);
              setTransactions(nextTransactions);
            }
          }
          setSaving(false);
        },
      });
    },
    [transactions]
  );
  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        onClose={() => !saving && setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {moment(selectedTransaction.created_at).format("lll")}
          {saving && <LinearProgress />}
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography style={{ fontWeight: "bold" }}>Note</Typography>
            <Typography>
              {selectedTransaction.note ? selectedTransaction.note : "Empty"}
            </Typography>
          </Box>
          <br />
          <Typography style={{ fontWeight: "bold" }}>Receipt</Typography>
          <Receipt
            lastOrder={selectedTransaction}
            cart={selectedTransaction.transaction_meta}
            grantTotal={selectedTransaction.total}
          />
          <br />
          <Typography style={{ fontWeight: "bold" }}>Details</Typography>
          <List>
            <ListItem>
              <Box
                className="center-all"
                justifyContent="space-between"
                width="100%"
              >
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  Code
                </Typography>{" "}
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  Name
                </Typography>
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  Quantity
                </Typography>
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  Price
                </Typography>
              </Box>
            </ListItem>
            {selectedTransaction?.transaction_meta?.map((product) => {
              const {
                product_id,
                product_name,
                quantity,
                price,
                code,
              } = product;
              return (
                <ListItem
                  key={product_id}
                  component={ButtonBase}
                  onClick={() => props.history.push("/products/" + product_id)}
                  divider
                >
                  <Box
                    className="center-all"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Typography style={{ flex: 1 }}>{code}</Typography>
                    <Typography style={{ flex: 1 }}>{product_name}</Typography>
                    <Typography style={{ flex: 1 }}>{quantity}</Typography>
                    <Typography style={{ flex: 1 }}>
                      {currencyFormatter.format(price, { locale: "ph-PH" })}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
            <ListItem>
              <Box
                className="center-all"
                justifyContent="space-between"
                width="100%"
              >
                <Typography
                  style={{ fontWeight: "bold", flex: 1 }}
                ></Typography>
                <Typography
                  style={{ fontWeight: "bold", flex: 1 }}
                ></Typography>
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  Amount Paid
                </Typography>
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  {currencyFormatter.format(selectedTransaction.amount_paid, {
                    locale: "ph-PH",
                  })}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box
                className="center-all"
                justifyContent="space-between"
                width="100%"
              >
                <Typography
                  style={{ fontWeight: "bold", flex: 1 }}
                ></Typography>
                <Typography
                  style={{ fontWeight: "bold", flex: 1 }}
                ></Typography>
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  Grand Total
                </Typography>
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  {currencyFormatter.format(selectedTransaction.total, {
                    locale: "ph-PH",
                  })}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box
                className="center-all"
                justifyContent="space-between"
                width="100%"
              >
                <Typography
                  style={{ fontWeight: "bold", flex: 1 }}
                ></Typography>
                <Typography
                  style={{ fontWeight: "bold", flex: 1 }}
                ></Typography>
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  Change
                </Typography>
                <Typography style={{ fontWeight: "bold", flex: 1 }}>
                  {currencyFormatter.format(
                    selectedTransaction.amount_paid - selectedTransaction.total,
                    {
                      locale: "ph-PH",
                    }
                  )}
                </Typography>
              </Box>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => deleteTransaction(selectedTransaction)}
            disabled={saving}
          >
            Delete
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => printReceipt()}
            disabled={saving}
          >
            Print
          </Button>
          <Button
            disabled={saving}
            onClick={() => setDialogOpen(false)}
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialTable
        title="Transactions"
        data={transactions}
        isLoading={loading}
        onRowClick={(e, row) => {
          setSelected(row);
          setDialogOpen(true);
        }}
        columns={[
          {
            title: "ID",
            field: "transaction_id",
            render: (row) => getOR(row.transaction_id),
          },
          {
            title: "Date",
            field: "date",
          },
          {
            title: "Total",
            field: "total",
            render: (row) =>
              currencyFormatter.format(row.total, {
                locale: "ph-PH",
              }),
          },
          {
            title: "Amount Paid",
            field: "amount_paid",
            render: (row) =>
              currencyFormatter.format(row.amount_paid, {
                locale: "ph-PH",
              }),
          },
          {
            title: "Items",
            field: "transaction_meta",
            render: (row) => row.transaction_meta.length,
          },
        ]}
        options={{
          pageSize: 10,
        }}
      />
    </React.Fragment>
  );
}
