import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function Test() {
  return <div>test</div>;
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/test" component={Test} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
