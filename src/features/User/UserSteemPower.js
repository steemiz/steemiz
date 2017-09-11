import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

export default class UserSteemPower extends PureComponent {
  static propTypes = {
    account: PropTypes.object.isRequired,
  };

  render() {
    const { account } = this.props;
    return (
      <span>
        {numeral(account.steemPower).format('0,0.00')}
      </span>
    );
  }
}
