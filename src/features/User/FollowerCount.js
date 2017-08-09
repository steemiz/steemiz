import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { selectAccount } from './selectors';

import { getFollowerCountBegin } from './actions/getFollowerCount';

class FollowerCount extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    unit: PropTypes.oneOf(['follower_count', 'following_count']).isRequired,
    getFollowerCount: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.account.follower_count === undefined) {
      this.props.getFollowerCount(this.props.accountName);
    }
  }

  render() {
    const { account, unit } = this.props;
    return (
      <span>
        {!isEmpty(account) ? account[unit] : 0}
      </span>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  account: selectAccount(props.accountName),
});

const mapDispatchToProps = dispatch => ({
  getFollowerCount: accountName => dispatch(getFollowerCountBegin(accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowerCount);
