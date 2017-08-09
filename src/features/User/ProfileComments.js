import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { formatter } from 'steem';
import { selectMyAccount } from './selectors';

import FollowerCount from './FollowerCount';
import PostList from '../Post/PostList';

class ProfileComments extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const nextAccountName = nextProps.account.name;
    const accountName = this.props.account.name;
    if (nextAccountName && accountName !== nextAccountName) {
      //this.props.getBlogPosts({ limit: 10, tag: 'aggroed' });
    }
  }

  render() {
    const { account } = this.props;
    const { reputation, post_count } = account;
    return (
      <div>
        <h1>ProfileComments</h1>
        <p>Steem power: {formatter.reputation(reputation)}</p>
        <p>Post count: {post_count}</p>
        <p>
          Followers: {account.name ? <FollowerCount accountName="me" unit="follower_count" /> : 0}
        </p>
        <p>
          Following: {account.name ? <FollowerCount accountName="me" unit="following_count" /> : 0}
        </p>
        {account.name ? <PostList category="blog" query={{ limit: 5, tag: 'aggroed' }} /> : <div/>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  account: selectMyAccount(),
});

const mapDispatchToProps = dispatch => ({
  getComments: query => dispatch(getCommentsBegin(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComments);
