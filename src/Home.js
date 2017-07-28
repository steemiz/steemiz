import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PostList from './features/Post/PostList';
import { selectPostCreated, selectPostFeed, selectPostVideosFeed } from './features/Post/selectors';
import { getPostsByBegin } from './features/Post/actions/getPostsBy';
import { voteBegin } from './features/Post/actions/vote';
import { selectIsConnected, selectUsername } from './features/User/selectors';
import isEmpty from 'lodash/isEmpty';

class Home extends Component {
  static propTypes = {
    postsCreated: PropTypes.array.isRequired,
    postsFeed: PropTypes.array.isRequired,
    getPostsBy: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    vote: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleStyleShow = this.toggleStyleShow.bind(this);
    this.state = {
      styleShowColumn: true,
    };
  }

  componentDidMount() {
    // POSTS BY CREATED
    this.props.getPostsBy('created', { limit: 5 });
  }

  componentWillReceiveProps(nextProps) {
    // POSTS BY CREATED IF CONNECTED
    if (isEmpty(this.props.postsFeed) && (nextProps.isConnected && this.props.isConnected !== true)) {
      this.props.getPostsBy('feed', { tag: 'aggroed', limit: 5 });
    }
  }

  toggleStyleShow() {
    this.setState(state => {
      state.styleShowColumn = !state.styleShowColumn
    })
  };

  render() {
    const { postsCreated, postsFeed, isConnected, username, vote } = this.props;
    return (
      <PostList
        posts={!isConnected ? postsCreated : postsFeed}
        category={!isConnected ? 'created' : 'feed'}
        isConnected={isConnected}
        username={username}
        vote={vote}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postsCreated: selectPostCreated(),
  postsFeed: selectPostFeed(),
  isConnected: selectIsConnected(),
  username: selectUsername(),
});

const mapDispatchToProps = (dispatch, props) => ({
  getPostsBy: (category, query) => dispatch(getPostsByBegin(category, query)),
  vote: (post, category, index) => dispatch(voteBegin(post, category, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
