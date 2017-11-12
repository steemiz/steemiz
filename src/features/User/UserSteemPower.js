import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

function UserSteemPower({ account }) {
  return (
    <span>
      {numeral(account.steemPower).format('0,0.00')+' (+'+numeral(account.steemPowerReceived).format('0,0.00')+')'}
    </span>
  );
}

UserSteemPower.propTypes = {
  account: PropTypes.object.isRequired,
};

export default UserSteemPower;
