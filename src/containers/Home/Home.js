import React, { Component } from 'react';
import './Home.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logo from '../../assets/img/logo.jpg';
import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyDJMBUYLRQqfC2u3HHFXUvLuXO0GlYhokI',
  authDomain: 'foodtrader-74ab3.firebaseapp.com',
  databaseURL: 'https://foodtrader-74ab3.firebaseio.com',
  projectId: 'foodtrader-74ab3',
  storageBucket: '',
  messagingSenderId: '301000161708',
  appId: '1:301000161708:web:c3302d7cd81d9c76',
};

firebase.initializeApp(config);

const requestPermission = async () => {
  const messaging = firebase.messaging();
  console.log(messaging);
  await messaging.requestPermission();
  console.log('yapo k wea');
  const token = await messaging.getToken();
  console.log(token);

  return token;
};

class Home extends Component {
  render() {
    console.log('asdasdasd');
    requestPermission().then(token => {
      console.log(token);
    });
    return (
      <div className="Home">
        <div className="lander">
          <h1>Food Trader</h1>
          <img src={logo} className="logoImg" alt="logo" />
          <p>¡Más de 5.350 kg reciclados!</p>
        </div>

        <Grid container direction="column" justify="center" alignItems="center">
          <Button variant="contained" className="button-home" href="/register">
            Registrarse
          </Button>
          <Button variant="contained" className="button-home" href="/login">
            Iniciar sesión
          </Button>
        </Grid>
      </div>
    );
  }
}

export default Home;
