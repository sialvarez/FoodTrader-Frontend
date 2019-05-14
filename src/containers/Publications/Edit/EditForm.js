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
  
class EditPublication extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      title: props.publication.title,
      content: props.publication.content,
      place: props.publication.place,
      image: props.publication.image,
      id: props.publication.id,
      user: props.user,
      redirect: false,
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.editPublication = this.editPublication.bind(this);
  }

  async editPublication() {
    const url = 'https://foodtraderbackend.herokuapp.com/publications/' + this.state.id + "/";
    const data = {
      'content': this.state.content,
      'title': this.state.title,
      'place': this.state.place,
      'image': this.state.image,
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
        this.handleEditPublication(data);
    })
  }

  handleEditPublication(data) {
    alert(data.message);
    if (data.publication) {
      this.setState({ redirect: true });
    }
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value})
  }

  handleContentChange(e) {
    this.setState({content: e.target.value})
  }

  handlePlaceChange(e) {
    this.setState({place: e.target.value})
  }

  handleImageChange(e) {
    this.setState({image: e.target.value})
  }

  render() {
    const { redirect } = this.state;
    const { classes } = this.props;
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
            Editar publicación
          </Typography>
          <form className = {this.props.classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="title">Título</InputLabel>
              <Input id="title" value = {this.state.title} name="title" onChange={this.handleTitleChange}  />
            </FormControl>
        
            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="content">Contenido</InputLabel>
              <Input name="content" value = {this.state.content} id="content" onChange={this.handleContentChange}  />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="place">Ubicación</InputLabel>
              <Input name="place"  value = {this.state.place} id="place" onChange={this.handlePlaceChange}  />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel className = 'label-input' htmlFor="image">Url imagen</InputLabel>
              <Input name="image" id="image"  value = {this.state.image} onChange={this.handleImageChange}  />
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              color= "primary"
              className = {[this.props.classes.submit, "button-login"].join(' ')}
              onClick = {this.editPublication}
              disabled = {!this.state.title || !this.state.place}
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

EditPublication.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.login;
  const { publication } = state.publication;
  return { user, publication };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditPublication));