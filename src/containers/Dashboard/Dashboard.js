import React, { Component } from "react";
import "./Dashboard.css";
import Navbar from "../../components/navbar/navbar.js"
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import { Redirect } from 'react-router-dom';


class Dashboard extends Component {
  render() {
    const { user } = this.props;    
    if(Object.keys(user).length === 0){
      return <Redirect to='/login' />
    }
    
    return (
       
      <div className="Home">
        <Navbar />
        <h1 className = "title">Bienvenido a Food Trader</h1>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.login;
  return { user };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);