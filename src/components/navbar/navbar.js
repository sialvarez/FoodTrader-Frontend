import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import RecentActors from '@material-ui/icons/RecentActors';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Home from '@material-ui/icons/Home';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    fontSize: 15,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  
});

class navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirectToProfile: false,
      redirectToNewPublication: false,
      redirectToNotification: false,
      redirectToHome: false,
      redirectToUsers: false,
    }
  }  


  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
  
    const { classes } = this.props;
    const { redirectToProfile, redirectToHome, redirectToNewPublication, redirectToUsers } = this.state;
    if (redirectToProfile) {
      return <Redirect to='/profile'/>;
    } else if (redirectToNewPublication) {
      return <Redirect to = '/publications/new'/>;
    } else if (redirectToHome) {
      return <Redirect to = '/home'/>;
    } else if (redirectToUsers) {
      return <Redirect to ='/users' />;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              onClick = {() => this.setState({redirectToHome: true})} 
            >
              <Home />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" onClick = {() => this.setState({redirectToNewPublication: true})} >
              
                    <AddCircleOutline />
              
                </IconButton>
              
              <IconButton color="inherit" onClick = {() => this.setState({redirectToUsers: true})}>
                <Badge badgeContent={0} color="secondary">
                  <RecentActors />
                </Badge>
              </IconButton>
              <IconButton
                color="inherit"
                onClick = {() => this.setState({redirectToProfile: true})} 
              >
                <AccountCircle />
              </IconButton>
            </div>
          
          </Toolbar>
        </AppBar>
 
      </div>
    );
  }
}

navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(navbar);