import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';  
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import fetch from 'node-fetch';
import RestaurantOutlined from '@material-ui/icons/RestaurantOutlined';
import "./Form.css";
import Navbar from "../../../components/navbar/navbar.js"
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../../actions';


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
  
class FormPublications extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            content: String,
            title: String,
            place: String,
            image: String,
            user: this.props.user,
            redirect: false,
          

        }
        this.postPublication = this.postPublication.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handlePostPublication = this.handlePostPublication.bind(this);

    }

    async postPublication(){
      const {token} = this.state.user;
      const final_token = 'Bearer ' + token;
      const url = 'https://foodtraderbackend.herokuapp.com/publications/';
      const data = {'content': this.state.content, 'title': this.state.title, 'place': this.state.place, 'image': this.state.image};
      fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'mode': 'no-cors',
              'Authorization': final_token,
          },
          body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => this.handlePostPublication(data))
  
  }

    handleContentChange(e) {
        this.setState({content: e.target.value})
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value})
    }

    handlePlaceChange(e) {
      this.setState({place: e.target.value})
    }

    handleImageChange(e) {
      this.setState({image: e.target.value })
    }

    handlePostPublication(data){
      if (data.publication) {
        this.setState({ redirect: true });
      } else {
        alert(data.message);
      }
    }

  render() {
    if(Object.keys(this.state.user).length === 0){
      return <Redirect to='/login' />
    }
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/profile'/>;
    }
    
  
  return (
    <main >
    <Navbar />
    <main className={this.props.classes.main} >
      <CssBaseline />
      <Paper className = {this.props.classes.paper}>
        <Avatar className = {[this.props.classes.avatar, "avatar-login"].join(' ')}>
        <RestaurantOutlined />
      
        </Avatar>
          <Typography component="h1" variant="h5">
            Crear nueva publicación
          </Typography>
            <form className = {this.props.classes.form}>
         
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Título</InputLabel>
                <Input id="title" name="title" onChange = {this.handleTitleChange}/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="content">Contenido</InputLabel>
                <Input name="content" id="content" onChange={this.handleContentChange}/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="place">Ubicación</InputLabel>
                <Input name="place" id="place" onChange={this.handlePlaceChange}/>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="image">Url imagen</InputLabel>
                <Input name="image" id="image" onChange={this.handleImageChange}/>
            </FormControl>

            

            <Button
                fullWidth
                variant="contained"
                color= "primary"
                className = {[this.props.classes.submit, "button-login"].join(' ')}
                onClick = {this.postPublication}
                disabled = {!this.state.title || !this.state.place}
                
            >
                Publicar
            </Button>
  
    
            </form>
      
      </Paper>
    </main>
    </main>
  );
}
}

FormPublications.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.login;
  return { user };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FormPublications));