import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { formatter } from 'steem';
import numeral from 'numeral';

import { selectAppProps, selectAppRate } from '../App/selectors';

class UserEstimatedValue extends Component {
  static propTypes = {
    appProps: PropTypes.object.isRequired,
    appRate: PropTypes.number.isRequired,
    account: PropTypes.object.isRequired,
  };

  render() {
    const { appProps, appRate, account } = this.props;
    if (!appProps) {
      return null;
    }
    const power = formatter.vestToSteem(
      account.vesting_shares,
      appProps.total_vesting_shares,
      appProps.total_vesting_fund_steem
    );
    const value = (parseFloat(appRate) *
      (parseFloat(account.balance) + parseFloat(power)))
      + parseFloat(account.sbd_balance);
    return (
      <span>
        {numeral(value).format('0,0.00')}
      </span>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  appProps: selectAppProps(),
  appRate: selectAppRate(),
});

export default connect(mapStateToProps)(UserEstimatedValue);
