import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import "./loading.css";

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#f2f2f2',
  },
  barColorPrimary: {
    backgroundColor: 'var(--primary)',
  },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

let LoadingComponent = props => { 
  const classes = useStyles();

  return (
    <div className="loading-bar">
      <h1 className="logo">Workout Manager</h1>
      <ColorLinearProgress className={classes.margin} id="loader" />
      <h3 className="logo-message">{props.message}</h3>
    </div>
  );
  
}   

class Loading extends Component {
  render() {
    return <LoadingComponent message={this.props.message} />
  }

}

export default Loading;