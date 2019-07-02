import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import {
  loginUser,
} from '../../actions';
import avatar from '../../assets/img/avatar.jpg';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import './chatMessages.css';

const styles = theme => ({
  container: {
    margin: '20px',
    height: 400,
    maxHeight: 400,
    overflow: 'auto',

  },
  avatar: {
    margin: 'auto',
    height: 30,
    width: 30,
  },
  header: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginBottom: '10px',
  },
  avatarWrapper: {
    width: '10%',
  },
  textField: {
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
  },
  sendButton: {
    width: '10%',
    margin: 'auto',
  },
  input: {
    fontSize: 14,
  },
  progress: {
    margin: 'auto',
  },
});

function ChatBubble(props) {
  const { message, isMine } = props;
  return (
    <div className={[
      'message',
      `${isMine ? 'mine' : ''}`,
    ].join(' ')}>
      <div className="bubble-container">
        <div className="bubble" title={''}>
          {message.content}
        </div>
      </div>
    </div>
  );
}
  
class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      messages: [],
      currentId: 100,
      lastId: '',
      
    };
    this.send = this.send.bind(this);
    this.nextId = this.nextId.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    props.newMessage.onMessage(this.onMessage);
    this.messagesEndRef = React.createRef();
  }

  

  componentDidUpdate(prevProps) {
    if (prevProps.chatId !== this.props.chatId) {
      this.setState({ text: '', messages: [] });
      this.getChatHistory();
    }
  }

  scrollToBottom() {
    this.messagesEndRef.scrollIntoView({ behavior: "smooth" });
  }
  
 

  onMessage(payload) {
    
    const chatId = parseInt(payload.data.chatId, 10);
    if (chatId === parseInt(this.props.chatId, 10) && this.state.lastId !== payload.data.messageId) {
      this.setState({ lastId: payload.data.messageId });
      const text = payload.data.message;
      const id = payload.data.senderId;
      const { messages } = this.state;
      this.setState({ messages: messages.concat([{ content: text, userId: id, id: this.nextId()}]) });
    }
  }

  getChatHistory() {
    const { chatId, user } = this.props;
    const { token } = user;
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/chats/' + chatId;
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
      this.setState({ messages: data.messages });
      this.scrollToBottom();
    })
  }

  nextId() {
    const { currentId } = this.state;
    const newId = currentId + 1;
    this.setState({ currentId: newId });
    return newId;
  }

  send() {
    const { chatId, user } = this.props;
    const { text } = this.state;
    const { token, id } = user;
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/messages/';
    const final_token = 'Bearer ' + token;
    const data = { 'content': text, 'chatId': chatId };
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
      if (data.message) {
        const { messages } = this.state;
        this.setState({
          text: '',
          messages: messages.concat([{ content: text, userId: id, id: this.nextId()}]),
        });
        this.scrollToBottom();
      }
    })
  }

  render() {
    const { classes, user, userChat } = this.props;
    const { messages } = this.state;
    if (messages.length === 0) {
      return(<CircularProgress className={classes.progress} />);
    }
    return (
      <div>
        <div className={classes.header}>
          <div className={classes.avatarWrapper}>
            <Avatar alt="avatar" src={avatar} className={classes.avatar} />
          </div>
          <Typography variant="h4" align="left">
            {userChat.name}
          </Typography>
        </div>
        <Divider />
        <div className={classes.container}>
          {messages.map((item) =>
            <ChatBubble
              key={item.id}
              message={item}
              isMine={parseInt(item.userId) === parseInt(user.id)}
            />
          )}

          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEndRef = el; }}></div>
      
        </div>

        <div className={classes.header}>
          <TextField
            id="outlined-bare"
            className={classes.textField}
            onChange={(event) => { this.setState({ text: event.target.value }) }}
            value={this.state.text}
            margin="normal"
            variant="outlined"
            fullWidth={true}
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
          />
          <div className={classes.sendButton}>
            <IconButton
              color="primary"
              onClick = {this.send} 
            >
              <Send />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

  
Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { user } = state.login;
  const { newMessage } = state.chat;
  return { user, newMessage };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};
  
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Chat)
);