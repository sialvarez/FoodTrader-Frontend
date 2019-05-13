import React, {Component} from 'react';
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
import Add from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../../actions';
import "./Register.css";
import Checkbox from '@material-ui/core/Checkbox';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  root: {
    color: red[700],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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
  
class Register extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      username: '',
      password: '',
      name: '',
      address: '',
      email: '',
      isOrganization: false,
      redirect: false,
    }
    this.postUser = this.postUser.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePostUser = this.handlePostUser.bind(this);
  }

  async postUser() {
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/users/';
    const data = {
      'username': this.state.username,
      'password': this.state.password,
      'name': this.state.name,
      'address': this.state.address,
      'email':this.state.email,
      'isOrganization': false
    };
    fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => this.handlePostUser(data))
  }

  handlePostUser(data) {
    alert(data.message);
    if (data.user) {
      const { loginDispatch } = this.props;
      const { token } = data;
      const { id, name, email, isActive, isOrganization, username, password, address } = data.user;
      loginDispatch({ token, id, email, name, isActive, isOrganization, username, password, address });
      this.setState({ redirect: true });
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handleAddressChange(e) {
    this.setState({address: e.target.value})
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { redirect } = this.state;
    const { classes } = this.props;
    if (redirect) {
      return <Redirect to='/home'/>;
    }
    return (
      <main className={this.props.classes.main} >
        <CssBaseline />
        <Paper className = {this.props.classes.paper}>
          <Avatar className = {[this.props.classes.avatar, "avatar-login"].join(' ')}>
          <Add />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse en FoodTrader
          </Typography>
          <form className = {this.props.classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="username">Nombre de usuario</InputLabel>
              <Input id="username" name="username" onChange={this.handleUsernameChange}  />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="password">Contraseña</InputLabel>
              <Input name="password" type="password" id="password" onChange={this.handlePasswordChange}  />
            </FormControl>
        
            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="name">Nombre completo</InputLabel>
              <Input name="name" id="name" onChange={this.handleNameChange}  />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="address">Comuna</InputLabel>
              <Input name="address" id="address" onChange={this.handleAddressChange}  />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="email">Correo</InputLabel>
              <Input name="email" id="email" onChange={this.handleEmailChange}  />
            </FormControl>

            <Checkbox
              checked={this.state.isOrganization}
              onChange={this.handleChange('isOrganization')}
              value="isOrganization"
              color="secondary"
             
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
            <InputLabel className = 'label-input'> Es organización </InputLabel>
            <Button
              fullWidth
              variant="contained"
              color= "primary"
              className = {[this.props.classes.submit, "button-login"].join(' ')}
              onClick = {this.postUser}
              disabled = {!this.state.username || !this.state.email || !this.state.password || !this.state.name}
            >
              Registrarse
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.login;
  return { user };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Register));