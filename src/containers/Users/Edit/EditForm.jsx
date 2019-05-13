import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Navbar from "../../../components/navbar/navbar.js";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';  
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import fetch from 'node-fetch';
import Edit from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../../actions';
import "./EditForm.css";
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
  
class EditUser extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      'user': props.user,
      'username': props.user.username,
      'name': props.user.name,
      'address': props.user.address,
      'email': props.user.email,
      'isOrganization': props.user.isOrganization,
      'redirect': false,
    }
    this.editUser = this.editUser.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleChangeIsOrganization = this.handleChangeIsOrganization.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  async editUser() {
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/users/' + this.state.user.id + "/";
    const data = {
      'username': this.state.username,
      'password': this.state.password,
      'name': this.state.name,
      'address': this.state.address,
      'email':this.state.email,
      'isOrganization': this.state.isOrganization
    };
  
    const {token} = this.state.user;
    const final_token = 'Bearer ' + token;
   
    fetch(url, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors',
          'Authorization': final_token,
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
  
        this.handlePostUser(data);
    })
  }

  handlePostUser(data) {
    alert(data.message);
    const {token} = this.state.user;
    if (data.user) {
      const { loginDispatch } = this.props;
      const { id, name, email, isActive, isOrganization, username, password, address } = data.user;
      loginDispatch({ token, id, email, name, isActive, isOrganization, username, password, address });
      this.setState({ redirect: true });
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
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

  handleChangeIsOrganization(e) {
    this.setState({isOrganization: e.target.checked});
  };

  render() {
    const { redirect } = this.state;
    const { user, classes } = this.props;
    if(Object.keys(user).length === 0){
      return <Redirect to='/login' />
    }
    if (redirect) {
      return <Redirect to='/profile'/>;
    }
    return (
      <main>
      <Navbar />
      <main className={this.props.classes.main} >
        <CssBaseline />
        <Paper className = {this.props.classes.paper}>
          <Avatar className = {[this.props.classes.avatar, "avatar-login"].join(' ')}>
          <Edit />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar perfil
          </Typography>
          <form className = {this.props.classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="username">Nombre de usuario</InputLabel>
              <Input id="username" value = {this.state.username} name="username" onChange={this.handleUsernameChange}  />
            </FormControl>
        
            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="name">Nombre completo</InputLabel>
              <Input name="name" value = {this.state.name} id="name" onChange={this.handleNameChange}  />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="address">Comuna</InputLabel>
              <Input name="address"  value = {this.state.address} id="address" onChange={this.handleAddressChange}  />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="email">Correo</InputLabel>
              <Input name="email" id="email"  value = {this.state.email} onChange={this.handleEmailChange}  />
            </FormControl>

            <Checkbox
              checked={this.state.isOrganization}
              onChange={this.handleChangeIsOrganization}
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
              onClick = {this.editUser}
              disabled = {!this.state.username || !this.state.email || !this.state.name}
            >
              Guardar cambios
            </Button>
          </form>
        </Paper>
      </main>
      </main>
    );
  }
}

EditUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.login;
  return { user };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditUser));