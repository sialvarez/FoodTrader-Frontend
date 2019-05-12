import React, { Component } from "react";
import "./Dashboard.css";
import Navbar from "../../components/navbar/navbar.js"
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
      data : ["item 1", "item 2","item 3","item 4","item 5","item 6", "item 7"]
    }
  }

  render() {
    const { user } = this.props; 
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
            {this.state.data.map(function(item, i){
              return(
                <Grid item sm = {3}>
                  <PublicationCard content = "Test" title = "Test" date = "hoy" image = "https://comefruta.es/wp-content/uploads/lechugaromana.jpg"/>
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