import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import { selectCommentsDomain, selectCommentsData } from './selectors';
import CommentItem from './CommentItem';
import { sortCommentsFromSteem } from '../../utils/helpers/stateHelpers';

class CommentList extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    commentsDomain: PropTypes.object.isRequired,
    commentsData: PropTypes.object.isRequired,
  };

  render() {
    const { comments, commentsDomain, commentsData, account } = this.props;
    if (isEmpty(comments)) {
      return <div />;
    }
    const visibleList = sortCommentsFromSteem(comments.list, commentsData).slice(0, 5);
    return (
      <div className="Comment">
        { visibleList.map(commentId =>
          <CommentItem
            key={commentId}
            comment={commentsData[commentId]}
            allComments={commentsDomain}
            vote={this.vote}
            account={account}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  commentsDomain: selectCommentsDomain(),
  commentsData: selectCommentsData(),
});

export default connect(mapStateToProps, null)(CommentList);
