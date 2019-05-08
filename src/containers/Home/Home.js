import React, { Component } from "react";
import "./Home.css";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logo from '../../assets/img/logo.jpg'
import { connect } from 'react-redux';
import { addWord } from '../../actions';

class Home extends Component {
  handleChange = (event) => {
    const text = event.target.value;
    const { testDispatch } = this.props;
    testDispatch(text);
  }

  handleSubmit = () => {
    const { text, testDispatch } = this.props;
    alert(text);
    testDispatch('');
  }

  render() {
    const { text } = this.props;
    return (
      <div className="Home">
        <div className="lander">

          <h1>Food Trader</h1>
          <img src = {logo} className = "logoImg"  alt = "logo"/>
          <p>¡Más de 5.350 kg reciclados!</p>
          
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Probando redux:
              <input type="text" name="name" value={text} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
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

const mapStateToProps = (state) => {
  const { text } = state.tests;
  return { text };
};

const mapDispatchToProps = {
  testDispatch: addWord,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
