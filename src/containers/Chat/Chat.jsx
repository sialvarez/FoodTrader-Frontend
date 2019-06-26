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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChatItem from '../../components/chatItem/chatItem.jsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { CssBaseline } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    borderColor: theme.palette.text.secondary,
    marginRight: theme.spacing.unit * 4,
  },
  inline: {
    display: 'inline',
  },
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

    constructor(props){
      super(props);
      this.state = {
        chats: [],
        currentChat: {},
      }
      this.getUserChats = this.getUserChats.bind(this);
      this.changeChat = this.changeChat.bind(this);
      
    }

    componentDidMount() {
      this.getUserChats();
    }

    changeChat(index){
      var chat = this.state.chats[index];
      this.setState({currentChat: chat});
    }
  

    getUserChats() {
      var chat = {};
      var chats = [];
      const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/chats/';
      const final_token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyb3kzNTAiLCJwYXNzd29yZCI6IiQyYiQxMCR4VHdyWjVjeS9ELnlKRWYveDZzbkR1OUVHLk52RW1jREdGMTY5ZHdqUGdrb0NZSWt4aFZndSIsIm5hbWUiOiJSb2RyaWdvIiwiYWRkcmVzcyI6IkJhY2tlbmQiLCJlbWFpbCI6InJvZHJpZ29AYmFja2VuZC5jbCIsImlzT3JnYW5pemF0aW9uIjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsImlhdCI6MTU2MTU3MDU5MywiZXhwIjoxNTYxNjEzNzkzfQ.1gtzxAfWvCfN3ndPXhVuaZJ2DbMqJXWh7PFbwCDdcQw';
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
        data.forEach(function (item, index) {
          chat = item.chat;
          chat.user = item.user;
          chat.messages = item.messages;
          chats.push(chat);
        })
        this.setState({chats: chats, currentChat: chats[0]})
        
        })
    }

    render() {

      const {classes} = this.props;

      
      return (
        <div>
          <Navbar />
          <CssBaseline/>
          
          <Grid container spacing={8}>
            <Grid item xs={4}>
              <List className={classes.root}>
               {this.state.chats.map(function(item, i){
                    return(
                      <div key = {i}>
                        <ChatItem customClick = {this.changeChat} index = {i} userName = {item.user.name} lastMessage = {item.messages[0].content}/>
                        <Divider variant="inset" component="li" />
               
                      </div>
                    )
                  }, this)}
                  
                
              </List>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>Zona de la Javi</Paper>
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