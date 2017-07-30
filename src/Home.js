import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PostList from './features/Post/PostList';
import { selectPostCreated, selectPostFeed, selectPostVideosFeed } from './features/Post/selectors';
import { getPostsByBegin } from './features/Post/actions/getPostsBy';
import { voteBegin } from './features/Vote/actions/vote';
import { selectIsConnected, selectAccount } from './features/User/selectors';
import isEmpty from 'lodash/isEmpty';

class Home extends Component {
  static propTypes = {
    postsCreated: PropTypes.array.isRequired,
    postsFeed: PropTypes.array.isRequired,
    getPostsBy: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    account: PropTypes.object.isRequired,
    vote: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // POSTS BY CREATED
    this.props.getPostsBy('created', { limit: 5 });
  }

  componentWillReceiveProps(nextProps) {
    // POSTS BY CREATED IF CONNECTED
    /*if (isEmpty(this.props.postsFeed) && (nextProps.isConnected && this.props.isConnected !== true)) {
      this.props.getPostsBy('feed', { tag: 'aggroed', limit: 5 });
    }*/
  }

  render() {
    const { postsCreated, postsFeed, isConnected, account, vote } = this.props;
    return (
      <PostList
        posts={postsCreated}
        category={'created'}
        isConnected={isConnected}
        account={account}
        vote={vote}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postsCreated: selectPostCreated(),
  postsFeed: selectPostFeed(),
  isConnected: selectIsConnected(),
  account: selectAccount(),
});

const mapDispatchToProps = (dispatch, props) => ({
  getPostsBy: (category, query) => dispatch(getPostsByBegin(category, query)),
  vote: (post, weight, params) => dispatch(voteBegin(post, weight, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
