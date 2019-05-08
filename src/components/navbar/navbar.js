import React, { Component } from "react";
import "./navbar.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class navbar extends Component {
  render() {
    return (
      <div>
        <Navbar bg = "primary" variant = "dark">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Food Trader</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        
      </Navbar>
      </div>
    );
  }
}