import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import {
  selectAllPostsFromCategory,
  selectCategoryTagHasMore,
  selectPostsIsLoading,
  selectCurrentTag,
  selectCurrentCategory,
} from './selectors';
import { getPostsByBegin } from './actions/getPostsBy';
import { setCategoryTag } from './actions/setCategoryTag';
import InfiniteList from 'components/InfiniteList';
import ContentItem from 'components/ContentItem';

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    query: PropTypes.shape({
      tag: PropTypes.string,
    }).isRequired,
    postsIsLoading: PropTypes.bool.isRequired,
    categoryHasMore: PropTypes.bool,
    getPostsBy: PropTypes.func.isRequired,
    setCategoryTag: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.loadPosts = this.loadPosts.bind(this);
  }

  componentDidMount() {
    // POSTS BY CATEGORY
    const { category, query, currentTag, currentCategory, posts } = this.props;
    if (currentCategory !== category || currentTag !== query.tag) {
      this.props.setCategoryTag(category, query.tag);
    }
    if (isEmpty(posts) && (currentCategory !== category || currentTag !== query.tag)) {
      this.props.getPostsBy(this.props.query);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTag !== nextProps.query.tag) {
      this.props.setCategoryTag(nextProps.category, nextProps.query.tag);
    }
    if (
      isEmpty(nextProps.posts) &&
      !nextProps.postsIsLoading &&
      (nextProps.query.tag !== this.props.currentTag || nextProps.category !== this.props.currentCategory)
    ) {
      this.props.getPostsBy(nextProps.query);
    }
  }

  loadPosts() {
    const { query, posts } = this.props;
    this.props.getPostsBy({
      ...query,
      limit: query.limit + 1,
      start_author: posts[posts.length - 1].author,
      start_permlink: posts[posts.length - 1].permlink,
    });
  }

  render() {
    const { posts, categoryHasMore, postsIsLoading } = this.props;
    return (
      <div>
        <InfiniteList
          list={posts}
          hasMore={categoryHasMore}
          isLoading={postsIsLoading}
          loadMoreCb={this.loadPosts}
          itemMappingCb={post => (
            <ContentItem
              key={post.id}
              content={post}
              type="post"
            />
          )}
        />
        {posts.length === 0 && postsIsLoading === false && (
          <div>
            There is no posts here yet.
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = () => {
  return createStructuredSelector({
    posts: selectAllPostsFromCategory(),
    postsIsLoading: selectPostsIsLoading(),
    categoryHasMore: selectCategoryTagHasMore(),
    currentTag: selectCurrentTag(),
    currentCategory: selectCurrentCategory(),
  });
};

const mapDispatchToProps = (dispatch, props) => {
  const { category } = props;
  return {
    getPostsBy: query => dispatch(getPostsByBegin(category, query)),
    setCategoryTag: (category, tag) => dispatch(setCategoryTag(category, tag)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
