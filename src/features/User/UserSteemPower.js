import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { formatter } from 'steem';
import numeral from 'numeral';

import { selectAppProps } from '../App/selectors';

class UserSteemPower extends Component {
  static propTypes = {
    vestingShares: PropTypes.string.isRequired,
  };

  render() {
    const { vestingShares, appProps } = this.props;
    if (!appProps) {
      return null;
    }
    const power = formatter.vestToSteem(
      vestingShares,
      appProps.total_vesting_shares,
      appProps.total_vesting_fund_steem
    );
    return (
      <span>
        {numeral(power).format('0,0.00')}
      </span>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  appProps: selectAppProps(),
});

export default connect(mapStateToProps)(UserSteemPower);
