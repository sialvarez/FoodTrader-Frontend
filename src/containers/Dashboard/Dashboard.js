import React, { Component } from 'react';
import './Dashboard.css';
import Navbar from '../../components/navbar/navbar.js';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import PublicationCard from '../../components/card/publications/card.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Email from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  loginUser,
  handlePublicationModal,
  showedPublicationAction,
  newMessageAction,
} from '../../actions';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/messaging';

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

const config = {
  apiKey: 'AIzaSyDJMBUYLRQqfC2u3HHFXUvLuXO0GlYhokI',
  authDomain: 'foodtrader-74ab3.firebaseapp.com',
  databaseURL: 'https://foodtrader-74ab3.firebaseio.com',
  projectId: 'foodtrader-74ab3',
  storageBucket: '',
  messagingSenderId: '301000161708',
  appId: '1:301000161708:web:c3302d7cd81d9c76',
};

firebase.initializeApp(config);

const requestPermission = async () => {
  const messaging = firebase.messaging();
  await messaging.requestPermission();
  const token = await messaging.getToken();
  //messaging.onMessage(payload => console.log('Message received. ', payload));
  console.log(token);
  return [messaging, token];
};

function getModalStyle() {
  const top = 30;
  return {
    top: `${top}%`,
    margin: 'auto',
  };
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      publications: [],
    };
    this.getPublications = this.getPublications.bind(this);
  }

  async getPublications() {
    const url =
      'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/publications/';
    const { token } = this.state.user;
    const final_token = 'Bearer ' + token;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        mode: 'no-cors',
        Authorization: final_token,
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ publications: data });
      });
  }

  componentDidMount() {
    const { user } = this.props;
    if (!(Object.keys(user).length === 0)) {
      this.getPublications();
    }
  }

  saveMessaging(messaging) {
    const { newMessageAction } = this.props;
    newMessageAction(messaging);
  }

  sendFirebaseToken(firebaseToken) {
    const { token } = this.props.user;
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/firebaseToken/';
    const final_token = 'Bearer ' + token;
    const data = { 'token': firebaseToken };
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
    .then(data => console.log(data))
  }

  render() {
    const {
      classes,
      user,
      handlePublicationModal,
      publicationModal,
      showedPublication,
      showedPublicationAction,
    } = this.props;
    if (Object.keys(user).length === 0) {
      return <Redirect to="/" />;
    }
    requestPermission().then(arr => {
      const messaging = arr[0];
      const token = arr[1];
      this.saveMessaging(messaging);
      this.sendFirebaseToken(token);
    });
    return (
      <div className={classes.root}>
        <Navbar />
        <CssBaseline />
        <div className={classes.publications}>
          <Typography variant="h3" align="center" gutterBottom>
            Bienvenido a Food Trader
          </Typography>
          <Grid container>
            {this.state.publications.map(function(item, i) {
              return (
                <Grid item sm={3} key={item.publication.id}>
                  <PublicationCard
                    content={item.publication.content}
                    title={item.publication.title}
                    date={item.publication.createdAt}
                    image={item.publication.image}
                    id={item.publication.id}
                    place={item.publication.place}
                    user={item.user.username}
                    handleModal={handlePublicationModal}
                    handleShowedPublication={showedPublicationAction}
                    token={user.token}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={publicationModal}
          onClose={() => handlePublicationModal(false)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
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
              <Email className={classes.leftIcon} />
              Contactar usuario
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.login;
  const { publicationModal, showedPublication } = state.modal;
  return { user, publicationModal, showedPublication };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
  handlePublicationModal,
  showedPublicationAction,
  newMessageAction,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
