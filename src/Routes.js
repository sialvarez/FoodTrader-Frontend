import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home.js";
import NotFound from "./containers/NotFound/NotFound.js";
import Dashboard from "./containers/Dashboard/Dashboard.js";

export default () =>
  <Switch>  
    <Route path="/" exact component={Home} />
    <Route path= "/home" exact component = {Dashboard} /> 
    <Route component = {NotFound}/>
  </Switch>;