import React, { Component } from "react";
import "./SearchResults.css";
import Navbar from "../../components/navbar/navbar.js"
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import PublicationCard from '../../components/card/publications/card.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Email from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loginUser, handlePublicationModal, showedPublicationAction, redirectSearch } from '../../actions';
import { Redirect } from 'react-router-dom';
import UserCard from '../../components/card/users/card.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  publications: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 4,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 10,
  },
});

function getModalStyle() {
  const top = 30;
  return {
    top: `${top}%`,
    margin:'auto',
  };
}

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: props.user,
      publications: [],
      users: [],
    }
    this.getPublications = this.getPublications.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    if(!(Object.keys(user).length === 0)){
      this.getPublications();
      this.getUsers();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchInput !== prevProps.searchInput) {
      this.getPublications();
      this.getUsers();
    }
  }

  componentWillUnmount() {
    const { dispatchRedirectSearch } = this.props;
    dispatchRedirectSearch(false);
  }

  async getPublications() {
    const { searchInput } = this.props;
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/search/';
    const { token } = this.state.user;
    const final_token = 'Bearer ' + token;
    const data = { 'like' : searchInput, 'type': 'publications' };
    fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors',
          'Authorization': final_token,
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({publications: data});
    })
  }

  async getUsers() {
    const { searchInput } = this.props;
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/search/';
    const { token } = this.state.user;
    const final_token = 'Bearer ' + token;
    const data = { 'like' : searchInput, 'type': 'users' };
    fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors',
          'Authorization': final_token,
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({users: data});
    })
  }

  render() {
    const { classes, user, handlePublicationModal, publicationModal, showedPublication, showedPublicationAction, searchInput } = this.props;
    if(Object.keys(user).length === 0){
      return <Redirect to='/' />
    }
    const { publications, users } = this.state;
    return (
      <div className={classes.root}>
        <Navbar />
        <CssBaseline />
        <div className={classes.publications}>
          <Typography variant="h3" align="center" gutterBottom>
            Resultados para "{searchInput}"
          </Typography>
          {publications.length !== 0 && (
            <Typography variant="h4" align="center" gutterBottom>
              Publicaciones
            </Typography>
          )}
          <Grid container>
            {publications.map(function(item, i){
              return(
                <Grid item sm = {3} key = {item.publication.id}>
                  <PublicationCard content = {item.publication.content} title = {item.publication.title} 
                  date = {item.publication.createdAt} 
                  image = {item.publication.image}
                  id = {item.publication.id}
                  place = {item.publication.place}
                  user = {item.user.username}
                  handleModal = {handlePublicationModal}
                  handleShowedPublication = {showedPublicationAction}
                  token = {user.token}
                  />
                </Grid>
              )
            })}
          </Grid>
          {users.length !== 0 && (
            <Typography variant="h4" align="center" gutterBottom>
              Usuarios
            </Typography>
          )}
          <Grid container>
            {users.map(function(item, i){
              return(
                <Grid item sm = {3} key = {item.id}>
                  <UserCard user = {item}/>
                </Grid>
              )
            })}
          </Grid>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={publicationModal}
          onClose={() => handlePublicationModal(false)}
          style={{alignItems:'center',justifyContent:'center', display: 'flex'}}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              {showedPublication.title}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {showedPublication.content}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {showedPublication.place}
            </Typography>
            <Button variant="contained" color="primary">
              <Email className={classes.leftIcon}/>
              Contactar usuario
            </Button>

          </div>
        </Modal>
      </div>
    );
    
  }
}

const mapStateToProps = (state) => {
  const { user } = state.login;
  const { publicationModal, showedPublication } = state.modal;
  const { searchInput } = state.search;
  return { user, publicationModal, showedPublication, searchInput };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
  handlePublicationModal,
  showedPublicationAction,
  dispatchRedirectSearch: redirectSearch,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
