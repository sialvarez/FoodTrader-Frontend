import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home.js";
import NotFound from "./containers/NotFound/NotFound.js";
import Dashboard from "./containers/Dashboard/Dashboard.js";
import Login from "./containers/Auth/Login/Login.js";
import Register from "./containers/Auth/Register/Register.jsx"

export default () =>
  <Switch>  
    <Route path="/" exact component={Home} />
    <Route path = "/login" component = {Login} />
    <Route path = "/register" component = {Register} />
    <Route path= "/home" exact component = {Dashboard} /> 
    <Route component = {NotFound}/>
  </Switch>;