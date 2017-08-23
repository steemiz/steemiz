import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import InfiniteScroll from 'react-infinite-scroller';

import {
  selectAllPostsFromCategory,
  selectCategoryTagHasMore,
  selectPostsIsLoading
} from './selectors';
import { getPostsByBegin } from './actions/getPostsBy';
import CircularProgress from 'components/CircularProgress';
import ContentItem from 'components/ContentItem';

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    query: PropTypes.shape({
      tag: PropTypes.string,
    }).isRequired,
    postsIsLoading: PropTypes.bool.isRequired,
    categoryHasMore: PropTypes.bool.isRequired,
    getPostsBy: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.loadPosts = this.loadPosts.bind(this);
  }

  componentDidMount() {
    // POSTS BY CATEGORY
    if (isEmpty(this.props.posts)) {
      this.props.getPostsBy(this.props.query);
    }
  }

  loadPosts() {
    const { query, posts, postsIsLoading, categoryHasMore } = this.props;
    if (postsIsLoading === false && categoryHasMore === true) {
      this.props.getPostsBy({
        ...query,
        limit: query.limit + 1,
        start_author: posts[posts.length - 1].author,
        start_permlink: posts[posts.length - 1].permlink,
      });
    }
  }

  render() {
    const { posts, categoryHasMore, postsIsLoading } = this.props;
    const items = posts.map(post => (
      <ContentItem
        key={post.id}
        content={post}
        type="post"
      />
    ));
    return (
      <div>
        {posts.length > 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadPosts}
            hasMore={categoryHasMore}
            loader={<CircularProgress />}
          >
            {items}
          </InfiniteScroll>
        )}
        {posts.length === 0 && postsIsLoading === false &&(
          <div>
            There is no posts here yet.
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { category, query } = props;
  const tag = query.tag || 'all';
  return createStructuredSelector({
    posts: selectAllPostsFromCategory(category, tag),
    postsIsLoading: selectPostsIsLoading(category, tag),
    categoryHasMore: selectCategoryTagHasMore(category, tag),
  })
};

const mapDispatchToProps = (dispatch, props) => {
  const { category } = props;
  return {
    getPostsBy: query => dispatch(getPostsByBegin(category, query)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
