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

class ReviewCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      creatorName: props.creatorName,
      userId: props.userId,
      value: props.value,
      content: props.content,
      date: props.date,
      stars: [],
    }

    for (var i = 0; i < props.value; i++){
      this.state.stars.push(" ");
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title = {this.state.creatorName}
          subheader= {this.state.date}
        />
        <CardContent>
        
          <Typography component="p">
            {this.state.content}
          </Typography>
        </CardContent>
          <IconButton  className = "icon-star" >
            {this.state.stars.map(function(item, i){
                    return(
                      <StarRounded key = {i}/>
                    )
                  })}
            
          </IconButton>
      </Card>
    );
  }
}

ReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewCard);