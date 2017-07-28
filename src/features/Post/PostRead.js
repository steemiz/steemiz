import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Body from '../../components/Body';
import { selectPostFromCategory, selectRead } from './selectors';
import { getOnePostBegin } from './actions/getOnePost';
import PostTags from './PostTags';
import PostFooter from './PostFooter';
import PostComments from './PostComments';
import './PostRead.css';

class PostRead extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        category: PropTypes.string,
        index: PropTypes.number,
      }),
    }).isRequired,
    getOnePost: PropTypes.func.isRequired,
  };

  static defaultProps = {
    location: {
      state: undefined,
    }
  };

  componentDidMount() {
    if (isEmpty(this.props.postFromList)) {
      const { author, permlink } = this.props.match.params;
      this.props.getOnePost(author, permlink);
    }
  }

  render() {
    const { postFromList, read } = this.props;
    let post = !isEmpty(postFromList) ? postFromList : read;

    return (
      <div>
        {!isEmpty(post) && (
          <div className="postBody">
            <h1>{post.title}</h1>
            <Body post={post} jsonMetadata={post.json_metadata} />
            <PostTags post={post} />
            <PostFooter post={post} />
            <PostComments post={post} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { location } = props;
  const category = location.state && location.state.category ? location.state.category : '';
  const index = location.state && location.state.index !== undefined ? location.state.index : '';
  return createStructuredSelector({
    postFromList: selectPostFromCategory(category, index),
    read: selectRead(),
  });
};

const mapDispatchToProps = dispatch => ({
  getOnePost: (author, permlink) => dispatch(getOnePostBegin(author, permlink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostRead);
