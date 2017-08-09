import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

const AvatarSteemit = ({ author, size }) => {
  return (
    <Avatar
      src={`${process.env.REACT_APP_STEEMCONNECT_IMG_HOST}/@${author}?s=${size}`}
    />
  )
};

AvatarSteemit.propTypes = {
  author: PropTypes.string.isRequired,
  size: PropTypes.number,
};

AvatarSteemit.defaultProps = {
  size: 48,
};

export default AvatarSteemit;
