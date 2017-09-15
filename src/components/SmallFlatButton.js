import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { COLOR_BUTTONS, SIZE_SMALL } from 'styles/icons';

const SmallFlatButton = ({ label, icon, color, ...rest }) => {
  const Icon = icon;
  return (
    <FlatButton
      style={{ height: 32, lineHeight: '32px', minWidth: 60 }}
      labelStyle={{ color: color }}
      label={label}
      icon={Icon && <Icon style={{ height: 32 }} color={color} size={SIZE_SMALL} />}
      {...rest}
    />
  )
};

SmallFlatButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.func,
  color: PropTypes.string,
};

SmallFlatButton.defaultProps = {
  color: COLOR_BUTTONS,
};

export default SmallFlatButton;
