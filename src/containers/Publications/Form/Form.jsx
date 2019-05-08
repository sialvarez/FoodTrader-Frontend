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
import RestaurantOutlined from '@material-ui/icons/RestaurantOutlined';
import "./Form.css";
import Grid from '@material-ui/core/Grid';



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
            isActive: Boolean,
            date: String,
            place: String,
            userId: Number,
            userName: String,
            image: String,

        }
        this.postUser = this.postUser.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);

    }

    async postUser(){
      const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/auth/';
      const data = {'username': this.state.username, 'password': this.state.password};

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
          .then(data => console.log(data))
  
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

    handleUrlChange(e) {
      this.setState({url: e.target.value })
    }

  render() {
  return (
    <main className={this.props.classes.main} >
      <CssBaseline />
      <Paper className = {this.props.classes.paper}>
        <Avatar className = {[this.props.classes.avatar, "avatar-login"].join(' ')}>
        <RestaurantOutlined />
      
        </Avatar>
 
            <form className = {this.props.classes.form}>
         
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Título</InputLabel>
                <Input id="title" name="title" onCh
                ange={this.handleTitleChange} autoComplete="title" />
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
                <Input name="image" id="image" onChange={this.handleUrlChange}/>
            </FormControl>

            

            <Button
                fullWidth
                variant="contained"
                color= "primary"
                className = {[this.props.classes.submit, "button-login"].join(' ')}
                onClick = {this.postUser}
                
                
            >
                Publicar
            </Button>
  
    
            </form>
      
      </Paper>
    </main>
  );
}
}

FormPublications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormPublications);