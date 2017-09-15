import React from 'react';
import PropTypes from 'prop-types';
import IconReply from 'material-ui/svg-icons/content/reply';
import SmallFlatButton from './SmallFlatButton';

const ReplyButton = ({ onClick }) => {
  return (
    <SmallFlatButton
      label="Reply"
      onClick={onClick}
      icon={IconReply}
    />
  )
};

ReplyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ReplyButton;
