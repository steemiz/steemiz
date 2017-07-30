import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from '../Comments';

class PostComments extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  render() {
    const commentsNbr = this.props.post.children;
    const { post } = this.props;
    return (
      <div>
        <h2>Comments ({commentsNbr})</h2>
        <Comments
          post={post}
        />
      </div>
    )
  }
}

export default PostComments;
