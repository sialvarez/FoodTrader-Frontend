import React, { Component } from "react";
import "./Dashboard.css";
import Navbar from "../../components/navbar/navbar.js"


export default class Dashboard extends Component {
  render() {
    return (
       
      <div className="Home">
        <Navbar />
        <h1 className = "title">Bienvenido a Food Trader</h1>
        
      </div>
    );
  }
}