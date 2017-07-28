import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import CommentsList from './Comments/CommentsList';

import { selectComments } from './selectors';
import { selectProfile } from '../User/selectors';
import { getCommentsBegin } from './actions/getComments';

class PostComments extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getComments: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getComments(this.props.post);
  }

  render() {
    const commentsNbr = this.props.post.children;
    const { postId, comments, profile } = this.props;
    return (
      <div>
        <h2>Comments</h2>
        <CommentsList
          postId={postId}
          comments={comments}
          profile={profile}
          /*likeComment={this.props.likeComment}
          unlikeComment={this.props.unlikeComment}
          dislikeComment={this.props.dislikeComment}
          openCommentingDraft={this.props.openCommentingDraft}
          isSinglePage={this.props.isSinglePage}*/
        />
      </div>
    )
  }
}

const mapStateToProps = () => createStructuredSelector({
  comments: selectComments(),
  profile: selectProfile(),
});

const mapDispatchToProps = dispatch => ({
  getComments: post => dispatch(getCommentsBegin(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);
