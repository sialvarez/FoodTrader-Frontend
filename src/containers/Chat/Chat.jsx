import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  loginUser,
  handlePublicationModal,
  showedPublicationAction,
} from '../../actions';
import Navbar from '../../components/navbar/navbar.js';
import ChatMessages from '../../components/chat/chatMessages.js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    card: {
      maxWidth: 400,
      margin: 5,
      marginBottom: 50,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
      },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
        margin: 'auto',
        marginBottom: 10,
        height: 80,
        width: 80,
      },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    triple: {
        float: 'right',
    }
    
  });
  
  class Chat extends React.Component {


    componentDidMount() {
      const { user } = this.props;
      if (!(Object.keys(user).length === 0)) {
        //this.getChats();
        console.log('get chats');
      }
    }

    render() {

      const {user, classes} = this.props;

      if (Object.keys(user).length === 0) {
        return <Redirect to="/" />;
      }
      
      return (
        <div>
          <Navbar />
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>Mi zona</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <ChatMessages
                  userChat={{
                    "id": 1,
                    "name": "Jorge",
                    "username": "jabecerra",
                    "password": "$2b$10$J8bgSagwn6.48TAk61qGfOGBVCztWtSZZvU/JaehtP0G.JdRvpiLG",
                    "address": "Backend",
                    "email": "jorge@backend.cl",
                    "isOrganization": false,
                    "isActive": true,
                    "createdAt": "2019-04-14T19:11:36.847Z",
                    "updatedAt": "2019-04-14T19:11:36.847Z"
                  }}
                  messages={
                    [
                      {
                        "id": 3,
                        "content": "Hola Jorge",
                        "isActive": true,
                        "createdAt": "2019-04-14T19:11:36.847Z",
                        "updatedAt": "2019-04-14T19:11:36.847Z",
                        "chatId": 2,
                        "userId": 2
                      },
                      {
                        "id": 4,
                        "content": "Hola Roy",
                        "isActive": true,
                        "createdAt": "2019-04-14T19:11:36.847Z",
                        "updatedAt": "2019-04-14T19:11:36.847Z",
                        "chatId": 2,
                        "userId": 1
                      }
                    ]
                  }
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    }
  }

  
  Chat.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => {
    const { user } = state.login;
    const { publicationModal, showedPublication } = state.modal;
    return { user, publicationModal, showedPublication };
  };
  
  const mapDispatchToProps = {
    loginDispatch: loginUser,
    handlePublicationModal,
    showedPublicationAction,
  };
  
  export default withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Chat)
  );