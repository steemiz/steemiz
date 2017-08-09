import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectCommentsDomain } from './selectors';
import { getCommentsFromPostBegin } from './actions/getCommentsFromPost';
import CommentItem from './CommentItem';

class CommentPost extends Component {
  static propTypes = {
    getCommentsFromPost: PropTypes.func.isRequired,
    comments: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    allComments: PropTypes.string,
    openCommentingDraft: PropTypes.string,
    sortOrder: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCommentsFromPost(this.props.post);
  }

  render() {
    const { comments, post, openCommentingDraft, sortOrder } = this.props;
    if (isEmpty(comments.commentsByPost[post.id])) {
      return <div />;
    }
    const list = comments.commentsByPost[post.id].list;
    const commentsData = comments.commentsData;

    return (
      <div>
        { list.map(commentId =>
          <CommentItem
            key={commentId}
            comment={commentsData[commentId]}
            allComments={comments}
            openCommentingDraft={openCommentingDraft}
            sortOrder={sortOrder}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  comments: selectCommentsDomain(),
});

const mapDispatchToProps = dispatch => ({
  getCommentsFromPost: post => dispatch(getCommentsFromPostBegin(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentPost);
