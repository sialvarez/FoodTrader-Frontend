import React, { Component } from "react";
import "./Dashboard.css";
import Navbar from "../../components/navbar/navbar.js"
import Grid from '@material-ui/core/Grid';

import PublicationCard from '../../components/card/publications/card.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  publications: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 10,
  },
});

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      data : ["item 1", "item 2","item 3","item 4","item 5","item 6", "item 7"],
      user: props.user,
      publications: [],
    }
    this.getPublications = this.getPublications.bind(this);
  }

  async getPublications() {
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/publications/';
    const {token} = this.state.user;
    const final_token = 'Bearer ' + token;
    fetch(url, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors',
          'Authorization': final_token,
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({publications: data})})
  }

  componentDidMount() {
    this.getPublications();
  }

  render() {
   
    const { classes } = this.props;
    
    /*if(Object.keys(user).length === 0){
      return <Redirect to='/login' />
    } */

   
    return (
      <div className={classes.root}>
        <Navbar />
        <CssBaseline />
        <div className={classes.publications}>
          <h2 className = "title">Bienvenido a Food Trader</h2>
          <Grid container>
            {this.state.publications.map(function(item, i){
              return(
                <Grid item sm = {3} key = {i}>
                  <PublicationCard content = {item.publication.content} title = {item.publication.title} 
                  date = {item.publication.createdAt} 
                  image = {item.publication.image}
                  user = {item.user.username}
                  />
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    );
    
  }
}

const mapStateToProps = (state) => {
  const { user } = state.login;
  return { user };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));