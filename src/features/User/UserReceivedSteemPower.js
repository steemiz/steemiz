import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

function UserReceivedSteemPower({ account }) {
  return (
    <span>
      {'('+numeral(account.steemPowerReceived).format('0,0.00')+')'}
    </span>
  );
}

UserSteemPower.propTypes = {
  account: PropTypes.object.isRequired,
};

export default UserSteemPower;
