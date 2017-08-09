import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectRewardsCuration } from './selectors';
import { getRewardsBegin } from './actions/getRewards';

class RewardsCuration extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    getRewards: PropTypes.func.isRequired,
    rewardsCuration: PropTypes.array,
  };

  static defaultProps = {
    rewardsCuration: undefined,
  };

  componentDidMount() {
    if (this.props.rewardsCuration === undefined) {
      this.props.getRewards(this.props.accountName);
    }
  }

  render() {
    const { followingAccounts } = this.props;
    return (
      <div>
        <h2>Rewards</h2>
        {!isEmpty(followingAccounts) && followingAccounts.map(account => <p key={account.name}>{account.name}</p>)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  rewardsCuration: selectRewardsCuration(props.accountName),
});

const mapDispatchToProps = dispatch => ({
  getRewards: accountName => dispatch(getRewardsBegin(accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RewardsCuration);
