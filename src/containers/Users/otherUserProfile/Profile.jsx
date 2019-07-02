import React, { Component } from "react";
import "./Profile.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ReviewCard from '../../../components/card/reviews/card.jsx'; 
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Navbar from "../../../components/navbar/navbar.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../../assets/img/avatar.jpg'
import Typography from '@material-ui/core/Typography';
import PublicationCard from '../../../components/card/publications/card.jsx';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { handlePublicationModal, showedPublicationAction } from '../../../actions';
import { Redirect } from 'react-router-dom';
import Email from '@material-ui/icons/Email';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginTop: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
    },
    paperModal: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
    avatar: {
      margin: 'auto',
      marginBottom: 10,
      height: 80,
      width: 80,
    },
    button: {
      margin: theme.spacing.unit,
      display: 'inline-block',
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 10,
    },
  });

function getModalStyle() {
  const top = 30;
  return {
    top: `${top}%`,
    margin:'auto',
  };
}

class otherProfile extends Component {

  constructor(props){
    super(props);

    this.state = {
      publications : [],
      reviews: [],
      data: ['item 1', 'item 1', 'item 1', 'item 1'],
      otherUser: props.location.state.otherUser,
      user: props.user,
      redirectReview: false,
      redirectChat: false,
      redirectHome: false,
      open: false,
    }
    this.getUserPublications = this.getUserPublications.bind(this);
    this.getUserReviews = this.getUserReviews.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleReview = this.handleReview.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.createChat = this.createChat.bind(this);
  }

  componentDidMount() {
    if(!(Object.keys(this.state.user).length === 0)){
      this.getUserPublications();
      this.getUserReviews();
    }
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleReview() {
    
    this.setState({redirectReview: true});
  };

  handleChat() {
    this.createChat();
    this.setState({redirectChat: true});
  };

  createChat() {
    const { otherUser } = this.state;
    const { token} = this.props.user;
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/chats/';
    const final_token = 'Bearer ' + token;
    const data = {'userId': otherUser.id};
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors',
        'Authorization': final_token,
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(data => {})
  }
  

  getUserPublications() {
    const user_id = this.state.otherUser.id;
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/users/' + user_id + '/publications';
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
      this.setState({publications: data.publications})})
  }

  getUserReviews() {
    const user_id = this.state.otherUser.id;
    const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/users/' + user_id + '/reviews';
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
     
      this.setState({reviews: data.reviews})})
  }


  render() {
    const { user } = this.props;
    const { otherUser } = this.state;


    if(Object.keys(user).length === 0){
      return <Redirect to='/login' />
    } else if (Object.keys(otherUser).length === 0 ){
        return <Redirect to='/home' />
    } else if (this.state.redirectChat) {
      return <Redirect to = '/chat' />    
    } else if (this.state.redirectReview) {
      return <Redirect to = {{pathname: '/newReview',
      state: {user: this.state.user, otherUser : otherUser}

    }} />
    }

    const { publicationModal, showedPublication } = this.props;
    const { classes, handlePublicationModal, showedPublicationAction } = this.props;
    

    return(
      <div className={classes.root}>
        <Navbar />
        <CssBaseline />
          <Grid container spacing={8}>
            
            <Grid item sm={3}>
                <Paper className={classes.paper}>
                  <Avatar alt="avatar" src={avatar} className={classes.avatar} />
                  <Typography className = "title-name" variant="h5">
                    {otherUser.username}
                  </Typography>

                  <Typography className = "title-profile" variant="h3">
                    ¡53kg salvados!
                  </Typography>

                  <Grid container spacing = {8}>
                    <Grid item sm = {6}>
                      <Typography className = "title-name" variant = "h6">
                        Comuna
                      </Typography>
                      <p>{otherUser.address}</p>
                    
                    </Grid>
                    <Grid item sm = {6}>
                      <Typography className = "title-name" variant = "h6">
                        Correo
                      </Typography>
                      <p>{otherUser.email}</p>
                    
                    </Grid>

                    <Grid item sm = {6}>
                      <Typography className = "title-name" variant = "h6">
                        Organización
                      </Typography>
                      {otherUser.isOrganization ? (
                        <Done />
                      ) : (
                        <Clear />
                      )}
                      
                      
                    
                    </Grid>

                    <Grid item sm = {6}>
                      <Typography className = "title-name" variant = "h6">
                        Nombre
                      </Typography>
                      <p>{otherUser.name}</p>
                    </Grid>
                  </Grid>
                </Paper>

                <Grid item sm = {6}>

                    <Button onClick = {this.handleReview} variant="contained" color="primary" className={classes.button}>
                      Nueva review  
                      <Edit className={classes.rightIcon} />
                    </Button>
                </Grid>

                <Grid item sm = {6}>

                    <Button onClick = {this.handleChat} variant="contained" color="primary" className={classes.button}>
                      Contactar vendedor
                      <Email className={classes.rightIcon} />
                    </Button>
                </Grid>

            </Grid>
            <Grid item sm={9}>
              <Paper className={classes.paper}>
                <Typography className = "title-name" variant = "h3">
                  Reviews
                </Typography>

                <Grid container>


                  {this.state.reviews.map(function(item, i){
                      return(
                        <Grid item sm = {3} key = {i}>
                          <ReviewCard 
                          creatorName = {item.userCreatorId}
                          userId= {item.userId}
                          value= {item.value}
                          content= {item.content}
                          date= {item.createdAt}
                          />
                        </Grid>
                      )
                    })}
                    

                  </Grid>

                <Typography className = "title-name" variant = "h3">
                  Publicaciones
                </Typography>

                <Grid container>

                  {this.state.publications.map(function(item, i){
                    return(
                      <Grid item sm = {3} key = {i}>
                        <PublicationCard
                          content = {item.content} title = {item.title} 
                          date = {item.createdAt} 
                          image = {item.image}
                          id = {item.id}
                          place = {item.place}
                          user = {otherUser.username}
                          handleModal = {handlePublicationModal}
                          handleShowedPublication = {showedPublicationAction}
                          token = {user.token}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
              
              </Paper>
            </Grid>
          
          </Grid>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={publicationModal}
        onClose={() => handlePublicationModal(false)}
        style={{alignItems:'center',justifyContent:'center', display: 'flex'}}
      >
        <div style={getModalStyle()} className={classes.paperModal}>
          <Typography variant="h6" id="modal-title">
            {showedPublication.title}
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            {showedPublication.content}
          </Typography>
        </div>
      </Modal>
    </div>
    );
    }
  }


  otherProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.login;
  const { publicationModal, showedPublication } = state.modal;
  return { user, publicationModal, showedPublication };
};

const mapDispatchToProps = {
  handlePublicationModal,
  showedPublicationAction,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(otherProfile));