import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home.js";
import NotFound from "./containers/NotFound/NotFound.js";
import Dashboard from "./containers/Dashboard/Dashboard.js";
import Login from "./containers/Auth/Login/Login.js";
import Register from "./containers/Auth/Register/Register.jsx"
import FormPublications from "./containers/Publications/Form/Form.jsx"
import UserProfile from "./containers/Users/Profile/Profile.jsx";
import UserEdit from "./containers/Users/Edit/EditForm.jsx";
import DisplayUsers from "./containers/Users/Display/Display.jsx";
import PublicationEdit from "./containers/Publications/Edit/EditForm.js";
import otherProfile from "./containers/Users/otherUserProfile/Profile.jsx";
import FormReviews from "./containers/Reviews/Form/Form.jsx";

export default () =>
  <Switch>  
    <Route path="/" exact component={Home} />
    <Route path = "/profile" component = {UserProfile} />
    <Route path= "/editUser" component = {UserEdit} /> 
    <Route path = "/users" component = {DisplayUsers} />
    <Route path= "/editUser" exact component = {UserEdit} /> 
    <Route path= "/editPublication" exact component = {PublicationEdit} /> 
    <Route path = "/userProfile" exact component = {otherProfile} />
    <Route path = "/newReview" exact component = {FormReviews} />
    <Route path = "/login" component = {Login} />
    <Route path = "/publications/new" component = {FormPublications} />
    <Route path = "/register" component = {Register} />
    <Route path= "/home" exact component = {Dashboard} /> 
    <Route component = {NotFound}/>
  </Switch>;