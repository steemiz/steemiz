import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectFollowingsAccounts } from './selectors';
import { getFollowingBegin } from './actions/getFollowing';

class FollowingList extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    getFollowing: PropTypes.func.isRequired,
    followingAccounts: PropTypes.array,
  };

  static defaultProps = {
    followingAccounts: undefined,
  };

  componentDidMount() {
    if (this.props.followers === undefined) {
      this.props.getFollowing(this.props.accountName);
    }
  }

  render() {
    const { followingAccounts } = this.props;
    return (
      <div>
        <h2>FollowingList</h2>
        {!isEmpty(followingAccounts) && followingAccounts.map(account => <p key={account.name}>{account.name}</p>)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followingAccounts: selectFollowingsAccounts(props.accountName),
});

const mapDispatchToProps = dispatch => ({
  getFollowing: accountName => dispatch(getFollowingBegin(accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);
