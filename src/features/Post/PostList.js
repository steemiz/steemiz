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
import { selectMe } from '../User/selectors';
import { getPostsByBegin } from './actions/getPostsBy';
import PostCard from './PostCard';

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    query: PropTypes.shape({
      tag: PropTypes.string,
    }).isRequired,
    postsIsLoading: PropTypes.bool.isRequired,
    categoryHasMore: PropTypes.bool.isRequired,
    me: PropTypes.string.isRequired,
    getPostsBy: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleChangeTypeShow = this.handleChangeTypeShow.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.state = {
      typeShowPostCard: '',
    };
  }

  componentDidMount() {
    // POSTS BY CATEGORY
    if (isEmpty(this.props.posts)) {
      this.props.getPostsBy(this.props.query);
    }
  }

  handleChangeTypeShow = (event, value) => {
    this.setState({
      typeShowPostCard: value,
    });
  };

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
    const { posts, me, categoryHasMore, postsIsLoading } = this.props;
    const items = posts.map(post => (
      <PostCard
        key={post.id}
        post={post}
        me={me}
        styleShow={this.state.typeShowPostCard}
      />
    ));
    return (
      <div>
        {/*<div>
          <RadioButtonGroup
            name="typeShow"
            defaultSelected={this.state.typeShowPostCard}
            onChange={this.handleChangeTypeShow}
            className="clearfix"
            style={{margin: "0 0 1.5rem 0"}}
          >
            <RadioButton
              value="column"
              label="Type Column"
              style={{float: "left", width: "auto", "minWidth": "12rem"}}
              labelStyle={{color: "#999"}}
            />
            <RadioButton
              value="row"
              label="Type Row"
              style={{float: "left", width: "auto", "minWidth": "10rem"}}
              labelStyle={{color: "#999"}}
            />
            <RadioButton
              value=""
              label="Type Default"
              style={{float: "left", width: "auto", "minWidth": "12rem"}}
              labelStyle={{color: "#999"}}
            />
          </RadioButtonGroup>
        </div>*/}
        {posts.length > 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadPosts}
            hasMore={categoryHasMore}
            loader={<div className="loader">Loading ...</div>}
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
    me: selectMe(),
  })
};

const mapDispatchToProps = (dispatch, props) => {
  const { category } = props;
  return {
    getPostsBy: query => dispatch(getPostsByBegin(category, query)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
