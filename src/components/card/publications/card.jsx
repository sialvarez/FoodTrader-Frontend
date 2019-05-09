import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
      maxWidth: 400,
      margin: 5,
      marginBottom: 50,
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
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
         
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Lechuga"
          subheader="Octubre 25, 2018"
        />
        <CardMedia
          className={classes.media}
          image="https://comefruta.es/wp-content/uploads/lechugaromana.jpg"
        />
        <CardContent>
          <Typography component="p">
            Se comparte una lechuga que está de color medio chistoso. Por favor contactar para coordinar donación.
          </Typography>
        </CardContent>
       
      
      </Card>
    );
  }
}

PublicationCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicationCard);