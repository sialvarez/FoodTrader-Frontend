import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarRounded from '@material-ui/icons/StarRounded';


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

class MyCard extends React.Component {
 

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title = "Juanito"
          subheader="Septiembre 14, 2016"
        />
        <CardContent>
        
          <Typography component="p">
            ¡Este tipo se robó mi fruta!
          </Typography>
        </CardContent>
          <IconButton  className = "icon-star" >
            <StarRounded/>
          </IconButton>
      </Card>
    );
  }
}

MyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyCard);