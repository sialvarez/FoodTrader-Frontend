import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import avatar from '../../../assets/img/avatar.jpg';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import Paper from '@material-ui/core/Paper';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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
  
  class UserCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: props.user,
            anchorEl: null,
            redirectProfile: false,
            redirectReview: false,

        }
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
        if (action === 'profile') {
          this.setState({ redirectProfile: true });
        } else if (action === 'review'){
          this.setState({ redirectReview: true });
        }
      };
   
  
    render() {
      const { classes } = this.props;
      const { user, anchorEl } = this.state;

      if (this.state.redirectProfile){
        return <Redirect to = {{
          pathname: '/userProfile',
          state: {otherUser: this.state.user}
        }} />
      } else if (this.state.redirectReview) {
        return <Redirect to = {{pathname: '/newReview',
        state: {otherUser: this.state.user}

      }} />
      }

  
      return (
        <Paper className={classes.paper}>
            <div className = {classes.triple}>
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
                        <MenuItem onClick={event => this.handleMenuItemSelection(event, 'profile' )}>Perfil</MenuItem>
                        <MenuItem onClick={event => this.handleMenuItemSelection(event, 'review')}>Nueva review</MenuItem>
                    </Menu>
            </div>  
            <Avatar alt="avatar" src={avatar} className={classes.avatar} />
                
                <Typography className = "title-name" variant="h5">
                    {user.username}
                </Typography>


                <Grid container spacing = {6}>
                    <Grid item sm = {6}>
                      <Typography className = "title-name" variant = "h6">
                        Comuna
                      </Typography>
                      <p>{user.address}</p>
                    
                    </Grid>
                    <Grid item sm = {6}>
                      <Typography className = "title-name" variant = "h6">
                        Correo
                      </Typography>
                      <p style={{fontSize: 13}}>{user.email}</p>
                    
                    </Grid>

                    <Grid item sm = {6}>
                      <Typography className = "title-name" variant = "h6">
                        Organización
                      </Typography>
                      {user.isOrganization ? (
                        <Done />
                      ) : (
                        <Clear />
                      )}
                      
                    </Grid>

                    <Grid item sm = {6}>
                      <Typography className = "title-name" variant = "h6">
                        Nombre
                      </Typography>
                      <p>{user.name}</p>
                    </Grid>
                  </Grid>
                </Paper>
      );
    }
  }

  
  UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

  export default withStyles(styles)(UserCard);
  