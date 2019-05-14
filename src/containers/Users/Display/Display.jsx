import React, {Component} from 'react';
import "./Display.css";
import Navbar from "../../../components/navbar/navbar";
import Grid from '@material-ui/core/Grid';


import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loginUser, handlePublicationModal, showedPublicationAction } from '../../../actions';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    publications: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
    },
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
    button: {
      margin: theme.spacing.unit,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 10,
    },
  });


class DisplayUsers extends Component {
  constructor(props){
      super(props);
      this.state = {
					user: props.user,
					users: [],
      }

  this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    const url = 'https://foodtraderbackned.herokuapp.com/users/';
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
      console.log(data);
      this.setState({users: data})})
  }

  componentDidMount() {
  if(!(Object.keys(this.state.user).length === 0)){
    this.getUsers();
      }

  }

	render() {
		const { classes } = this.props;
		if(Object.keys(this.state.user).length === 0){
      return <Redirect to='/login' />
		}
		return (
			<div className={classes.root}>
        <Navbar />
        <CssBaseline />
				<div className={classes.publications}>
          <h2 className = "title">Bienvenido a Food Trader</h2>
					<Grid container>
						{this.state.users.map(function(item, i){
								return(
									<Grid item sm = {3} key = {i}>
										<div>
											<p> {item.name} </p>
											<p> {item.address} </p>
										</div>

									</Grid>
								)
							})}
					
					</Grid>

				</div>
			</div>

		)
	}


}
	



const mapStateToProps = (state) => {
  const { user } = state.login;
  const { publicationModal, showedPublication } = state.modal;
  return { user, publicationModal, showedPublication };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
  handlePublicationModal,
  showedPublicationAction,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DisplayUsers));