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
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
      token: props.token,
      user: props.user,
      actualUser: props.actualUser,
      place: props.place,
      anchorEl: null,
      redirectEditPublication: false,
      open: false,
      redirectHome: false,
    }

    console.log("constructor");
    console.log(props);

		this.handleCloseDelete = this.handleCloseDelete.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
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
    } else if (action === 'delete'){
      this.setState({open: true});
    }
  };

  handleCloseDelete() {
    this.setState({ open: false });
	};
	
	handleDelete() {
    const publication_id = this.state.id;
		const url = 'http://ec2-18-216-51-1.us-east-2.compute.amazonaws.com/publications/' + publication_id ;
		const {token} = this.state;
    const final_token = 'Bearer ' + token;
    console.log(url);
    console.log(final_token);
		fetch(url, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors',
          'Authorization': final_token,
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
			this.setState({open: false, redirectHome: true});
		})
  }

  render() {
    const { classes } = this.props;
    const subheader = this.state.user + "   " + this.state.date.slice(0,10);
    const { anchorEl, redirectEditPublication, redirectHome } = this.state;
    
    if(redirectEditPublication){
      return <Redirect to='/editPublication' />
    } else if(redirectHome) {
      return <Redirect to = '/home' />
    }

    return (
      <div>
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

      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"¿Seguro que desea eliminar la publicación?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Considere que tras la eliminación, la información no será recuperable.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDelete} color="primary">
              Rechazar
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>

      </div>
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
