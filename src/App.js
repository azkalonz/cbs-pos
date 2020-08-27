import { Box, ThemeProvider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import PageNotFound from "./screens/PageNotFound";
import Theme from "./styles";
import "./styles/style.css";
import Api from "./utils/api";
import store from "./utils/store";

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
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/inventory" component={Home} />
              <Route
                exact
                path="/login"
                render={(p) => (
                  <Login setLoading={(l) => setLoading(l)} {...p} />
                )}
              />
              <Route component={PageNotFound} />
            </Switch>
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
              src="/static/logo.png"
              width="100"
              style={{ padding: 5, position: "relative", zIndex: 2 }}
            />
            <Box display="flex" alignItems="center">
              <img
                src="/static/img/cake.gif"
                width="140"
                style={{ margin: "-50px" }}
              />
              <Typography className="title">Loading app...</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
