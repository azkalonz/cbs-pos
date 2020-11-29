import { Box, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Product from "./screens/Product";
import Products from "./screens/Products";
import Home from "./screens/Home";
import Login from "./screens/Login";
import PageNotFound from "./screens/PageNotFound";
import Theme from "./styles";
import "./styles/style.css";
import Api from "./utils/api";
import store from "./utils/store";
import Loader from "./components/Loader";
import LayoutProvider from "./components/LayoutProvider";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Sales from "./screens/Sales";
import Sale from "./screens/Sale";
import Backup from "./screens/Backup";

export function getConfig() {
  return window.Config;
}

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async function () {
      await Api.auth({
        success: ({ user }) => {
          store.dispatch({ type: "SET_USER", user });
        },
        fail: (error) => {},
      });
      setTimeout(() => {
        setLoading(false);
      }, 0);
    })();
  }, []);
  return (
    <ThemeProvider theme={Theme}>
      <Box className="loader-transition" style={{ opacity: loading ? 0 : 1 }}>
        {!loading && (
          <BrowserRouter>
            <LayoutProvider header={Header} navbar={NavBar} ignore={["/login"]}>
              <Switch>
                <Route exact path="/" component={Products} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/sales" component={Sales} />
                <Route
                  exact
                  path="/products/:product_id?"
                  component={Product}
                />
                <Route exact path="/sales/:sales_id?" component={Sale} />
                <Route exact path="/dashboard" component={Home} />
                <Route exact path="/restore" component={Backup} />
                <Route
                  exact
                  path="/login"
                  render={(p) => (
                    <Login setLoading={(l) => setLoading(l)} {...p} />
                  )}
                />
                <Route component={PageNotFound} />
              </Switch>
            </LayoutProvider>
          </BrowserRouter>
        )}
      </Box>
      <Box className="loader-transition" style={{ opacity: loading ? 1 : 0 }}>
        {loading && (
          <Box
            width="100vw"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            <img
              src={getConfig().logo || "/static/logo.png"}
              width="100"
              style={{ padding: 5, position: "relative", zIndex: 2 }}
            />
            <Loader />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
