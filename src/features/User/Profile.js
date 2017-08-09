import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { formatter } from 'steem';
import isEmpty from 'lodash/isEmpty';

import FollowerCount from './FollowerCount';
import PostList from '../Post/PostList';
import CommentList from '../Comment/CommentList';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import { selectCommentsFromUser, selectRepliesToUser } from '../Comment/selectors';
import { getCommentsFromUserBegin } from '../Comment/actions/getCommentsFromUser';
import { getRepliesToUserBegin } from '../Comment/actions/getRepliesToUser';
import VoteHistory from './VoteHistory';
import RewardsCuration from './RewardsCuration';

class Profile extends Component {
  static propTypes = {
    account: PropTypes.shape({
      name: PropTypes.string,
      reputation: PropTypes.number,
      post_count: PropTypes.number,
      follower_count: PropTypes.number,
      following_count: PropTypes.number,
    }).isRequired,
    commentsFromUser: PropTypes.object.isRequired,
    repliesToUser: PropTypes.object.isRequired,
    getRepliesToUser: PropTypes.func.isRequired,
    getCommentsFromUser: PropTypes.func.isRequired,
  };

  static defaultProps = {
    account: {
      name: undefined,
      reputation: 0,
      post_count: 0,
      follower_count: 0,
      following_count: 0,
    }
  };

  componentDidMount() {
    const { account: { name }} = this.props;
    if (isEmpty(this.props.commentsFromUser)) {
      this.props.getCommentsFromUser(name);
    }
    if (isEmpty(this.props.repliesToUser)) {
      this.props.getRepliesToUser(name);
    }
  }

  render() {
    const { account, commentsFromUser, repliesToUser } = this.props;
    const { reputation, post_count } = account;
    return (
      <div>
        <p>Steem power: {formatter.reputation(reputation)}</p>
        <p>Post count: {post_count}</p>
        <p>
          Followers: {account.name ? <FollowerCount accountName={account.name} unit="follower_count" /> : 0}
        </p>
        <p>
          Following: {account.name ? <FollowerCount accountName={account.name} unit="following_count" /> : 0}
        </p>
        {account.name ? <PostList category="blog" query={{ limit: 5, tag: account.name }} /> : <div/>}
        {account.name ? <CommentList comments={commentsFromUser} account={account} /> : <div/>}
        {account.name ? <CommentList comments={repliesToUser} account={account} /> : <div/>}
        {account.name ? <VoteHistory accountName={account.name} /> : <div/>}
        {account.name ? <FollowersList accountName={account.name} /> : <div/>}
        {account.name ? <FollowingList accountName={account.name} /> : <div/>}
        {account.name ? <RewardsCuration accountName={account.name} /> : <div/>}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  commentsFromUser: selectCommentsFromUser(props.account.name),
  repliesToUser: selectRepliesToUser(props.account.name),
});

const mapDispatchToProps = (dispatch, props) => ({
  getCommentsFromUser: accountName => dispatch(getCommentsFromUserBegin(accountName)),
  getRepliesToUser: accountName => dispatch(getRepliesToUserBegin(accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
