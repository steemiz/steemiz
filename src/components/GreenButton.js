import React from 'react';
import PropTypes from 'prop-types';

const GreenButton = props => {
  return (
    <button className="btn_default" {...props}>{props.children}</button>
  )
};

GreenButton.propTypes = {
  children: PropTypes.string.isRequired
};

export default GreenButton;
