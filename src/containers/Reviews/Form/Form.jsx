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

import Ratings from 'react-ratings-declarative';



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
  stars: {
    float: 'right',
  }
});
  
class FormReviews extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            content: String,
            value: 1,
            otherUser: props.location.state.otherUser,
            user: this.props.user,
            redirect: false,
          

        }
        this.postReview = this.postReview.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.changeRating = this.changeRating.bind(this);
       

    }

    async postReview(){
      console.log(this.state);
      const {token} = this.state.user;
      
      const final_token = 'Bearer ' + token;
      const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/reviews';
      const data = {'content': this.state.content, 'value': this.state.value,
       'userId': this.state.otherUser.id, 'userCreatorId': this.state.user.id};
      console.log(data);
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
        .then(data => console.log(data))
  }

    handleContentChange(e) {
        this.setState({content: e.target.value})
    }

    changeRating( newRating ) {
      console.log(newRating);
      this.setState({
        value: newRating
      })
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
              Realizar una nueva reseña
              
            </Typography>
              <form className = {this.props.classes.form}>

              <FormControl margin="normal" required fullWidth>
              <Ratings
                  rating={this.state.value}
                  widgetRatedColors="green"
                  widgetHoverColors = "lightgreen"
                  changeRating={this.changeRating}
                >
                  <Ratings.Widget/>
                  <Ratings.Widget/>
                  <Ratings.Widget/>
                  <Ratings.Widget/>
                  <Ratings.Widget />
                </Ratings>
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="content">Contenido</InputLabel>
                  <Input name="content" id="content" onChange={this.handleContentChange}/>
              </FormControl>
              

              <Button
                  fullWidth
                  variant="contained"
                  color= "primary"
                  className = {[this.props.classes.submit, "button-login"].join(' ')}
                  onClick = {this.postReview}
                  disabled = {!this.state.value || !this.state.content}
                  
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

FormReviews.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.login;
  return { user };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FormReviews));