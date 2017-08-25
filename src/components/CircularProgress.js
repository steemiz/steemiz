import React from 'react';
import CircularProgressMUI from 'material-ui/CircularProgress';

const CircularProgress = props => {
  return (
    <CircularProgressMUI size={60} thickness={7} {...props} />
  )
};

export default CircularProgress;
