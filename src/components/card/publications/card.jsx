import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { editPublication } from '../../../actions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
      maxWidth: 400,
      margin: 5,
      marginBottom: 50,
      '&:hover': {
        boxShadow: '4px 4px 6px 2px rgba(0, 0, 0, 0.2)',
      }
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
    
  });
  

class PublicationCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: props.title,
      date: props.date,
      image: props.image,
      content: props.content,
      id: props.id,
      user: props.user,
      actualUser: props.actualUser,
      place: props.place,
      anchorEl: null,
      redirectEditPublication: false,
    }
  }

  handleOnClick = () => {
    const { handleModal, handleShowedPublication } = this.props;
    const { title, date, image, content, user, place } = this.state;
    handleModal(true);
    handleShowedPublication({
      title,
      date,
      image,
      content,
      user,
      place,
    });
  }

  handleChildClick = (e) => {
    e.stopPropagation();
    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose = (e) => {
    e.stopPropagation();
    this.setState({ anchorEl: null });
  };

  handleMenuItemSelection = (e, action) => {
    e.stopPropagation();
    this.setState({ anchorEl: null });
    if (action === 'edit') {
      const { dispatchEditPublication } = this.props;
      const { title, content, place, image, id } = this.state;
      dispatchEditPublication({
        title,
        content,
        place,
        image,
        id,
      });
      this.setState({ redirectEditPublication: true });
    }
  };

  render() {
    const { classes } = this.props;
    const subheader = this.state.user + "   " + this.state.date.slice(0,10);
    const { anchorEl, redirectEditPublication } = this.state;
    
    if(redirectEditPublication){
      return <Redirect to='/editPublication' />
    }

    return (
      <Card className={classes.card} onClick={this.handleOnClick}>
        <CardHeader
          action={ (this.state.user === this.state.actualUser) && 
            <div>
              <IconButton
                onClick = {this.handleChildClick}
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={event => this.handleMenuItemSelection(event, 'edit')}>Edit</MenuItem>
                <MenuItem onClick={event => this.handleMenuItemSelection(event, 'delete')}>Delete</MenuItem>
              </Menu>
            </div>
          }
          title = {this.state.title}
          subheader = {subheader}
        />
        <CardMedia
          className={classes.media}
          image={this.state.image}
        />

        
        <CardContent>
          <Typography component="p">
            {this.state.content}
          </Typography>
        </CardContent>
       
      
      </Card>
    );
  }
}

PublicationCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.login;
  return { actualUser: user.username };
};

const mapDispatchToProps = {
  dispatchEditPublication: editPublication,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PublicationCard));
