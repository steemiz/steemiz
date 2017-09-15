import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { COLOR_BUTTONS } from 'styles/icons';

const SmallIconButton = ({ icon, ...rest }) => {
  const Icon = icon;
  return (
    <IconButton style={{ width: 32, height: 32, padding: 6 }} {...rest}>
      <Icon color={COLOR_BUTTONS} size={17} />
    </IconButton>
  )
};

SmallIconButton.propTypes = {
  icon: PropTypes.func.isRequired,
};

export default SmallIconButton;
