import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import {
  selectPosts,
  selectCategories,
} from './selectors';
import { selectCurrentCategory } from 'features/App/selectors';
import { getPostsByBegin } from './actions/getPostsBy';
import { setCategoryTag } from 'features/App/actions/setCategoryTag';
import InfiniteList from 'components/InfiniteList';
import ContentItem from 'components/ContentItem';

class PostList extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    subCategory: PropTypes.string.isRequired,
    currentCategory: PropTypes.string.isRequired,
    query: PropTypes.shape({
      tag: PropTypes.string,
    }).isRequired,
    getPostsBy: PropTypes.func.isRequired,
  };

  constructor(props) {
    super();
    const { categories, category, subCategory, allPosts } = props;
    let posts = [];
    let hasMore;
    let isLoading;
    const subCategoryObj = categories[category][subCategory];
    if (subCategoryObj) {
      posts = subCategoryObj.list.map(id => allPosts[id]);
      hasMore = subCategoryObj.hasMore;
      isLoading = subCategoryObj.isLoading;
    }
    this.state = {
      posts: posts,
      hasMore: hasMore,
      isLoading: isLoading,
    };
  }

  componentDidMount() {
    const { posts } = this.state;
    if (isEmpty(posts)) {
      this.props.getPostsBy(this.props.category, this.props.query);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { category, subCategory } = this.props;
    if (nextProps.category !== category || nextProps.subCategory !== subCategory) {
      this.props.getPostsBy(nextProps.category, nextProps.query);
    }

    const nextSubCategoryObj = nextProps.categories[nextProps.category][nextProps.subCategory];
    if (nextSubCategoryObj) {
      this.setState({
        posts: nextSubCategoryObj.list.map(id => nextProps.allPosts[id]),
        hasMore: nextSubCategoryObj.hasMore,
        isLoading: nextSubCategoryObj.isLoading,
      });
    }
  }

  loadPosts = () => {
    const { query, category } = this.props;
    const { posts } = this.state;
    this.props.getPostsBy(category, {
      ...query,
      limit: query.limit + 1,
      start_author: posts[posts.length - 1].author,
      start_permlink: posts[posts.length - 1].permlink,
    });
  };

  render() {
    const { currentCategory } = this.props;
    const { posts, hasMore, isLoading } = this.state;
    return (
      <div>
        <InfiniteList
          list={posts}
          hasMore={hasMore}
          isLoading={isLoading}
          loadMoreCb={this.loadPosts}
          itemMappingCb={post => (
            <ContentItem
              key={post.id}
              currentCategory={currentCategory}
              content={post}
              type="post"
            />
          )}
        />
        {posts.length === 0 && isLoading === false && (
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
    allPosts: selectPosts(),
    categories: selectCategories(),
    currentCategory: selectCurrentCategory(),
  });
};

const mapDispatchToProps = dispatch => {
  return {
    getPostsBy: (category, query) => dispatch(getPostsByBegin(category, query)),
    setCategoryTag: (tag) => dispatch(setCategoryTag(tag)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
