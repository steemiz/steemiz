import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectFollowingsAccounts } from './selectors';
import { getFollowingsBegin } from './actions/getFollowings';
import UserContact from './components/UserContact';

class FollowingList extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    getFollowings: PropTypes.func.isRequired,
    followingsAccounts: PropTypes.array,
  };

  static defaultProps = {
    followingsAccounts: undefined,
  };

  componentDidMount() {
    if (this.props.followers === undefined) {
      this.props.getFollowings(this.props.accountName);
    }
  }

  render() {
    const { followingsAccounts } = this.props;
    return (
      <div>
        {!isEmpty(followingsAccounts) && followingsAccounts.map(account => <UserContact key={account.name} account={account} />)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followingsAccounts: selectFollowingsAccounts(props.accountName),
});

const mapDispatchToProps = dispatch => ({
  getFollowings: accountName => dispatch(getFollowingsBegin(accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);
