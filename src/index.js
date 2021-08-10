import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import "./index.css";

import Routes from "./loginroutes";

import "assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
