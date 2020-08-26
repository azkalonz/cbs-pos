import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import PageNotFound from "./screens/PageNotFound";
import Theme from "./styles";
import "./styles/style.css";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/inventory" component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
