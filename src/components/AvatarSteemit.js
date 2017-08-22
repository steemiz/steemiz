import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

const AvatarSteemit = ({ name, size }) => {
  return (
    <Avatar
      src={`${process.env.REACT_APP_STEEMCONNECT_IMG_HOST}/@${name}?s=${size}`}
      backgroundColor="#999"
      size={size}
    />
  )
};

AvatarSteemit.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
};

AvatarSteemit.defaultProps = {
  size: 48,
};

export default AvatarSteemit;
