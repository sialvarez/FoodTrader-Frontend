import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import RecentActors from '@material-ui/icons/RecentActors';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import Home from '@material-ui/icons/Home';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import { logoutAction, changeSearch, redirectSearch } from '../../actions';

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
    paddingLeft: theme.spacing.unit,
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
      redirectToLogout: false,
      redirectToSearchResultState: false,
      redirectToChat: false,
      logout: false,
      input: '',
    }
    this.handleCloseLogout = this.handleCloseLogout.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearchResult = this.handleSearchResult.bind(this);
    this.handleSearching = this.handleSearching.bind(this);
  }

  handleCloseLogout() {
    this.setState({ logout: false });
  };
  
  handleLogout() {
    const { dispatchLogout } = this.props;
    this.setState({ redirectToLogout: true });
    dispatchLogout();
  }

  handleSearching(e) {
    const input = e.target.value;
    this.setState({ input });
  }

  handleSearchResult() {
    const { input } = this.state;
    const { dispatchChangeSearch, redirectToSearchResult, dispatchRedirectSearch } = this.props;
    dispatchChangeSearch(input);
    if (!redirectToSearchResult) {
      this.setState({ redirectToSearchResultState: true });
      dispatchRedirectSearch(true);
    }
  }

  render() {
  
    const { classes } = this.props;
    const { redirectToChat, redirectToProfile, redirectToHome, redirectToNewPublication, redirectToUsers, redirectToLogout, redirectToSearchResultState } = this.state;
    if (redirectToProfile) {
      return <Redirect to='/profile'/>;
    } else if (redirectToNewPublication) {
      return <Redirect to = '/publications/new'/>;
    } else if (redirectToHome) {
      return <Redirect to = '/home'/>;
    } else if (redirectToUsers) {
      return <Redirect to ='/users' />;
    } else if (redirectToLogout) {
      return <Redirect to ='/' />;
    } else if (redirectToSearchResultState) {
      return <Redirect to ='/search' />;
    } else if (redirectToChat) {
      return <Redirect to ='/chat' />;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Tooltip title="Home">
              <IconButton
                color="inherit"
                onClick = {() => this.setState({redirectToHome: true})}
              >
                <Home />
              </IconButton>
            </Tooltip>
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                onChange={this.handleSearching}
                value={this.state.input}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <IconButton color="inherit" onClick = {this.handleSearchResult} >
              <SearchIcon />
            </IconButton>
            <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
              <Tooltip title="Nueva publicación">
                <IconButton color="inherit" onClick = {() => this.setState({redirectToNewPublication: true})} >
                  <AddCircleOutline />
                </IconButton>
              </Tooltip>
              <Tooltip title="Todos los usuarios">
              <IconButton color="inherit" onClick = {() => this.setState({redirectToUsers: true})}>
                <Badge badgeContent={0} color="secondary">
                  <RecentActors />
                </Badge>
              </IconButton>
              </Tooltip>
              <Tooltip title="Chat">
              <IconButton color="inherit" onClick = {() => this.setState({redirectToChat: true})}>
                <ChatBubbleOutline />
              </IconButton>
              </Tooltip>
              <Tooltip title="Perfil">
              <IconButton
                color="inherit"
                onClick = {() => this.setState({redirectToProfile: true})} 
              >
                <AccountCircle />
              </IconButton>
              </Tooltip>
              <Tooltip title="Cerrar sesión">
              <IconButton
                color="inherit"
                onClick = {() => this.setState({logout: true})} 
              >
                <ExitToApp />
              </IconButton>
              </Tooltip>
            </div>
          
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.logout}
          onClose={this.handleCloseLogout}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"¿Quieres cerrar tu sesión en Food Trader?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseLogout} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleLogout} color="primary" autoFocus>
              Cerrar sesión
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.login;
  const { searchInput, redirectToSearchResult } = state.search;
  return { user, searchInput, redirectToSearchResult };
};

const mapDispatchToProps = {
  dispatchLogout: logoutAction,
  dispatchChangeSearch: changeSearch,
  dispatchRedirectSearch: redirectSearch,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(navbar));
