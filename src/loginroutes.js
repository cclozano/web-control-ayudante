import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./views/Login/Login";
import Menu from "./views/Login/Menu";

import Dashboard from "./views/Dashboard/Dashboard";

import Admin from "layouts/Admin.js";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/admin" component={Admin} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
