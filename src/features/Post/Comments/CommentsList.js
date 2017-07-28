import React from 'react';
import CommentItem from './CommentItem';
import { sortCommentsFromSteem } from '../../../utils/helpers/stateHelpers';
import isEmpty from 'lodash/isEmpty';

const CommentsList = ({
  postId,
  comments,
  likeComment,
  unlikeComment,
  dislikeComment,
  profile,
  openCommentingDraft,
  sortOrder
}) => {
  if (isEmpty(comments.commentsRoots)) {
    return <div />;
  }

  const list = comments.commentsRoots;

  const visibleList = sortCommentsFromSteem(list, comments, sortOrder).slice(0, 5);

  return (
    <div className="CommentsList">
      { visibleList.map(commentId =>
        <CommentItem
          key={commentId}
          comment={comments.commentsData[commentId]}
          allComments={comments}
          likeComment={likeComment}
          unlikeComment={unlikeComment}
          dislikeComment={dislikeComment}
          profile={profile}
          openCommentingDraft={openCommentingDraft}
          sortOrder={sortOrder}
        />
      )}
    </div>
  );
};

export default CommentsList;
