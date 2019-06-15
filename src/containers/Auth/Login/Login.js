import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import fetch from 'node-fetch';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../../actions';
import './Login.css';
require('dotenv').config();
const jwt = require('jsonwebtoken');

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
    this.postUser = this.postUser.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePostUser = this.handlePostUser.bind(this);
  }

  async postUser() {
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/auth/';
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        mode: 'no-cors',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => this.handlePostUser(data));
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePostUser(data) {
    if (data.token) {
      this.saveUser(data.token);
      this.setState({ redirect: true });
    } else {
      alert(data.message);
    }
  }

  saveUser(token) {
    const { loginDispatch } = this.props;
    const currentUser = jwt.verify(token, 'FoodTraderSecret');
    const {
      id,
      name,
      email,
      isActive,
      isOrganization,
      username,
      password,
      address,
    } = currentUser;
    loginDispatch({
      token,
      id,
      name,
      email,
      isActive,
      isOrganization,
      username,
      password,
      address,
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/home" />;
    }

    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <Avatar
            className={[this.props.classes.avatar, 'avatar-login'].join(' ')}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión en FoodTrader
          </Typography>
          <form className={this.props.classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel className="label-input" htmlFor="username">
                Username
              </InputLabel>
              <Input
                id="username"
                name="username"
                onChange={this.handleUsernameChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel className="label-input" htmlFor="password">
                Password
              </InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={this.handlePasswordChange}
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={[this.props.classes.submit, 'button-login'].join(' ')}
              onClick={this.postUser}
              disabled={!this.state.username || !this.state.password}
            >
              Iniciar sesión
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { user } = state.login;
  return { user };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
