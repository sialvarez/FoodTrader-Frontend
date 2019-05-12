import React, { Component } from "react";
import "./Dashboard.css";
import Navbar from "../../components/navbar/navbar.js"
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import PublicationCard from '../../components/card/publications/card.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loginUser, handlePublicationModal } from '../../actions';
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
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 10,
  },
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
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
      this.setState({publications: data})})
  }

  componentDidMount() {
    const { user } = this.props;
    if(!(Object.keys(user).length === 0)){
      this.getPublications();
    }
  }

  render() {
    const { classes, user, handlePublicationModal, publicationModal } = this.props;
    if(Object.keys(user).length === 0){
      return <Redirect to='/login' />
    }
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
                  handleModal = {handlePublicationModal}
                  />
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
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
      </div>
    );
    
  }
}

const mapStateToProps = (state) => {
  const { user } = state.login;
  const { publicationModal } = state.modal;
  return { user, publicationModal };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
  handlePublicationModal,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
