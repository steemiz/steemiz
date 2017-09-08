import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressMUI from 'material-ui/CircularProgress';

const CircularProgress = props => {
  return (
    <CircularProgressMUI size={60} thickness={7} {...props} />
  )
};

CircularProgress.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
};

export default CircularProgress;
