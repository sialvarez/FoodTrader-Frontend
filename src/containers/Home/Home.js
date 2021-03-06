import React, { Component } from "react";
import "./Home.css";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logo from '../../assets/img/logo.jpg'

class Home extends Component {

  render() {
    return (
      <div className="Home">
        <div className="lander">

          <h1>Food Trader</h1>
          <img src = {logo} className = "logoImg"  alt = "logo"/>
          <p>¡Más de 5.350 kg reciclados!</p>
          
        </div>

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"> 
            <Button variant="contained" className = "button-home" href = "/register">Registrarse</Button>
            <Button variant="contained" className = "button-home" href = "/login">Iniciar sesión</Button>
        </Grid>
      </div>
    );
  }
}



export default Home;
