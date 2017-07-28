import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PostList from './features/Post/PostList';
import { selectPostCreated, selectPostFeed, selectPostVideosFeed } from './features/Post/selectors';
import { getPostsByBegin } from './features/Post/actions/getPostsBy';
import { voteBegin } from './features/Post/actions/vote';
import { selectProfile } from './features/User/selectors';
import isEmpty from 'lodash/isEmpty';

class Home extends Component {
  static propTypes = {
    postsCreated: PropTypes.array.isRequired,
    postsFeed: PropTypes.array.isRequired,
    getPostsBy: PropTypes.func.isRequired,
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
    if (isEmpty(this.props.postsCreated)) {
      this.props.getPostsBy('created', { limit: 5 });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(this.props.postsFeed) && (!isEmpty(nextProps.profile) || !isEmpty(this.props.profile))) {
      this.props.getPostsBy('feed', { tag: 'aggroed', limit: 10 });
    }
  }

  toggleStyleShow() {
    this.setState(state => {
      state.styleShowColumn = !state.styleShowColumn
    })
  };

  render() {
    const { postsCreated, postsFeed, profile } = this.props;
    return (
      <PostList
        posts={isEmpty(profile) ? postsCreated : postsFeed}
        category={isEmpty(profile) ? 'created' : 'feed'}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postsCreated: selectPostCreated(),
  postsFeed: selectPostFeed(),
  profile: selectProfile(),
});

const mapDispatchToProps = (dispatch, props) => ({
  getPostsBy: (category, query) => dispatch(getPostsByBegin(category, query)),
  vote: post => dispatch(voteBegin(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
