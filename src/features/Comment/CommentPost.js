import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

export default class CommentPost extends PureComponent {
  static propTypes = {
    currentComments: PropTypes.object.isRequired,
    commentsData: PropTypes.object.isRequired,
    commentsChild: PropTypes.object.isRequired,
    openCommentingDraft: PropTypes.string,
    sortOrder: PropTypes.string,
  };

  render() {
    const { commentsChild, currentComments, commentsData, openCommentingDraft, sortOrder } = this.props;
    const list = currentComments.list;

    return (
      <div>
        { list.map(commentId =>
          <CommentItem
            key={commentId}
            comment={commentsData[commentId]}
            commentsData={commentsData}
            commentsChild={commentsChild}
            openCommentingDraft={openCommentingDraft}
            sortOrder={sortOrder}
          />
        )}
      </div>
    );
  }
}
