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
  });
  

class UserProfile extends Component {

  render()
  {
    
	const { classes } = this.props;
	return(
    <div className={classes.root}>
			<Navbar />
			<CssBaseline />
				<Grid container spacing={6}>
					
					<Grid item sm={3}>
							<Paper className={classes.paper}>
								<Avatar alt="avatar" src={avatar} className={classes.avatar} />
								<Typography className = "title-name" variant="h5">
									Sebibi
								</Typography>

								<Typography className = "title-profile" variant="h3">
									¡53kg salvados!
								</Typography>

								<Grid container spacing = {6}>
									<Grid item sm = {6}>
										<Typography className = "title-name" variant = "h6">
											Comuna
										</Typography>
										<p>Puente Alto</p>
									
									</Grid>
									<Grid item sm = {6}>
										<Typography className = "title-name" variant = "h6">
											Correo
										</Typography>
										<p>sialvarez@uc.cl</p>
									
									</Grid>

									<Grid item sm = {6}>
										<Typography className = "title-name" variant = "h6">
											Tipo de cuenta
										</Typography>
										<p>Personal</p>
									
									</Grid>

									<Grid item sm = {6}>
										<Typography className = "title-name" variant = "h6">
											Nombre
										</Typography>
										<p>Sebastián Álvarez</p>
									</Grid>
								</Grid>
							</Paper>

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

export default withStyles(styles)(UserProfile);