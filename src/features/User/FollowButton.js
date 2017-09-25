import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectMyFollowingsList, selectMyFollowingsLoadStatus, selectMe } from './selectors';

import { followBegin } from './actions/follow';
import { unfollowBegin } from './actions/unfollow';
import CircularProgress from 'components/CircularProgress';
import GreenButton from 'components/GreenButton';

class FollowButton extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    me: PropTypes.string.isRequired,
    followingsList: PropTypes.array.isRequired,
    followingLoadStatus: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired,
  };

  render() {
    const { followingsList, followingLoadStatus, accountName, me, unfollow, follow } = this.props;
    const isFollowing = followingsList.find(following => following.following === accountName);
    const isLoading = followingLoadStatus[accountName];
    const loadingStyle = isLoading ? { paddingLeft: '1rem' } : {};

    return (
      <GreenButton style={loadingStyle} onClick={isFollowing ? unfollow : follow} disabled={accountName === me || isLoading}>
        {isLoading && <CircularProgress size={20} thickness={3} style={{ marginRight: 10 }} color="white" />}
        {isFollowing ? 'Unfollow' : 'Follow'}
      </GreenButton>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followingLoadStatus: selectMyFollowingsLoadStatus(),
  followingsList: selectMyFollowingsList(),
  me: selectMe(),
});

const mapDispatchToProps = (dispatch, props) => ({
  follow: () => dispatch(followBegin(props.accountName)),
  unfollow: () => dispatch(unfollowBegin(props.accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
