import React, { Component } from "react";
import "./Profile.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Navbar from "../../components/navbar/navbar.js"
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../assets/img/avatar.jpg'
import Typography from '@material-ui/core/Typography';
import MyCard from '../../components/card/reviews/card.jsx';
import PublicationCard from '../../components/card/publications/card.jsx';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { loginUser } from '../../actions';
import Edit from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';


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
		avatar: {
			margin: 'auto',
			marginBottom: 10,
			height: 80,
			width: 80,
		},
		button: {
			margin: theme.spacing.unit,
		},
		rightIcon: {
			marginLeft: theme.spacing.unit,
		},
		iconSmall: {
			fontSize: 10,
		},
  });
  

class UserProfile extends Component {


  render()
  {
	const { user } = this.props;
	const { classes } = this.props;

	if(Object.keys(user).length === 0){
		return <Redirect to='/login' />
	}


	return(
    <div className={classes.root}>
			<Navbar />
			<CssBaseline />
				<Grid container spacing={8}>
					
					<Grid item sm={3}>
							<Paper className={classes.paper}>
								<Avatar alt="avatar" src={avatar} className={classes.avatar} />
								<Typography className = "title-name" variant="h5">
									{user.username}
								</Typography>

								<Typography className = "title-profile" variant="h3">
									¡53kg salvados!
								</Typography>

								<Grid container spacing = {8}>
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
										<p>{user.email}</p>
									
									</Grid>

									<Grid item sm = {6}>
										<Typography className = "title-name" variant = "h6">
											Tipo de cuenta
										</Typography>
										<p>{user.isOrganization}</p>
									
									</Grid>

									<Grid item sm = {6}>
										<Typography className = "title-name" variant = "h6">
											Nombre
										</Typography>
										<p>{user.name}</p>
									</Grid>
								</Grid>
							</Paper>

							<Grid item sm = {6}>

							<Button variant="contained" color="primary" className={classes.button}>
								Editar perfil
								<Edit className={classes.rightIcon} />
							</Button>
							</Grid>
							<Grid item sm = {6}>

							<Button variant="contained" color="secondary" className={classes.button}>
								Eliminar cuenta
								
								<DeleteIcon className={classes.rightIcon} />
							</Button>
							</Grid>

					</Grid>
					<Grid item sm={9}>
						<Paper className={classes.paper}>
							<Typography className = "title-name" variant = "h3">
								Reviews
							</Typography>

							<Grid container>
								<Grid item sm = {2}>

									<MyCard />
								</Grid>

								<Grid item sm = {2}>
								<MyCard />
								</Grid>

								<Grid item sm = {2}>
								<MyCard />
								</Grid>

								<Grid item sm = {2}>
								<MyCard />
								</Grid>

								<Grid item sm = {2}>
								<MyCard />
								</Grid>

								<Grid item sm = {2}>
									<MyCard />
								</Grid>
								

							</Grid>

							<Typography className = "title-name" variant = "h3">
								Publicaciones
							</Typography>

							<Grid container>
								<Grid item sm = {2}>
									<PublicationCard />
								</Grid>

								<Grid item sm = {2}>
								<PublicationCard />
								</Grid>

								<Grid item sm = {2}>
								<PublicationCard />
								</Grid>

								<Grid item sm = {2}>
								<PublicationCard />
								</Grid>

								<Grid item sm = {2}>
								<PublicationCard />
								</Grid>

								<Grid item sm = {2}>
								<PublicationCard />	
								</Grid>
								

							</Grid>
						
						</Paper>
					</Grid>
				
  			</Grid>
	
	</div>
	);
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.login;
  return { user };
};

const mapDispatchToProps = {
  loginDispatch: loginUser,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserProfile));