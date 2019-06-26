import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { logoutAction, changeSearch, redirectSearch } from '../../actions';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import avatar from '../../assets/img/avatar.jpg'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
      text: {
        marginTop: theme.spacing.unit, 
        fontSize: 100,
      }
});


class ChatItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.userName,
            msg: props.lastMessage,
            index: props.index,
        }
    }

    render() {
        const { classes} = this.props;
        const {msg, name, index} = this.state;
        return (
            <ListItem button onClick={(e) => this.props.customClick(index, e)} alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={avatar} />
                </ListItemAvatar>
                <ListItemText className={classes.text}
                primary= {name}
                secondary={
                    <React.Fragment>
                    {msg}
                    </React.Fragment>
                }
                />
            </ListItem>
          )
    }


}




ChatItem.propTypes = {
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
  
  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChatItem));