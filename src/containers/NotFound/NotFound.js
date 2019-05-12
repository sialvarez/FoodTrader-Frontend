import React, { Component } from "react";
import "./NotFound.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class NotFound extends Component {

  constructor(props){
    super(props);
    this.state = {
      redirect: false,
    }

    this.redirectHome = this.redirectHome.bind(this);
  }

  redirectHome() {
    this.setState({redirect: true});
  }

  render() {

  if(this.state.redirect){
    return <Redirect to='/home' />
  }
  return (
  <div className="NotFound"> 
    <CssBaseline />
    <h3>¡Página no encontrada!</h3>
    <Button onClick = {this.redirectHome}  >Volver al menú principal</Button>
  </div>
  );
}
}

export default NotFound;