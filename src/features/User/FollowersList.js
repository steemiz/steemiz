import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectFollowersAccounts } from './selectors';
import { getFollowersBegin } from './actions/getFollowers';

class FollowersList extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    getFollowers: PropTypes.func.isRequired,
    followersAccounts: PropTypes.array,
  };

  static defaultProps = {
    followersAccounts: undefined,
  };

  componentDidMount() {
    if (this.props.followers === undefined) {
      this.props.getFollowers(this.props.accountName);
    }
  }

  render() {
    const { followersAccounts } = this.props;
    return (
      <div>
        <h2>FollowersList</h2>
        {!isEmpty(followersAccounts) && followersAccounts.map(account => <p key={account.name}>{account.name}</p>)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followersAccounts: selectFollowersAccounts(props.accountName),
});

const mapDispatchToProps = dispatch => ({
  getFollowers: accountName => dispatch(getFollowersBegin(accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowersList);
