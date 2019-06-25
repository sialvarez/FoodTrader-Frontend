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
        this.getChats();
      }
    }

    render() {

      const {user, classes} = this.props;
      
      return (
        <div>
          <Navbar />
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>Mi zona</Paper>
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