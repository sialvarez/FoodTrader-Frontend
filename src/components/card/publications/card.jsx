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
  constructor(props){
    super(props);
    this.state = {
      title: props.title,
      date: props.date,
      image: props.image,
      content: props.content,
      user: props.user,
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, handleModal } = this.props;
    const subheader = this.state.user + "   " + this.state.date.slice(0,10);

    return (
      <Card className={classes.card} onClick={() => handleModal(true)}>
        <CardHeader
         
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
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
    );
  }
}

PublicationCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicationCard);