import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {
  loginUser,
} from '../../actions';
import avatar from '../../assets/img/avatar.jpg';
import Avatar from '@material-ui/core/Avatar';
import './chatMessages.css';

const styles = theme => ({
  container: {
    margin: '20px',
  },
  avatar: {
    margin: 'auto',
    height: 26,
    width: 26,
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
  render() {
    const { classes, user, messages, userChat } = this.props;
    return (
      <div>
        <div className={classes.header}>
          <div className={classes.avatarWrapper}>
            <Avatar alt="avatar" src={avatar} className={classes.avatar} />
          </div>
          <Typography gutterBottom variant="h4" align="left">
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
  return { user };
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