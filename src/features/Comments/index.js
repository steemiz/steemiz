import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectCommentsDomain } from './selectors';
import { selectAccount, selectIsConnected } from '../User/selectors';
import { getCommentsBegin, clearComments } from './actions/getComments';
import CommentItem from './CommentItem';
import { voteBegin } from '../Vote/actions/vote';
import { sortCommentsFromSteem } from '../../utils/helpers/stateHelpers';

class Comments extends Component {
  static propTypes = {
    getComments: PropTypes.func.isRequired,
    clearComments: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    vote: PropTypes.func.isRequired,
    comment: PropTypes.string,
    allComments: PropTypes.string,
    likeComment: PropTypes.string,
    unlikeComment: PropTypes.string,
    dislikeComment: PropTypes.string,
    openCommentingDraft: PropTypes.string,
    sortOrder: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
    this.props.getComments(this.props.post);
  }

  componentWillUnmount() {
    this.props.clearComments();
  }

  vote(post, weight) {
    const { isConnected, vote } = this.props;
    if (isConnected) {
      vote(post, weight, { type: 'comment' });
    } else {
      console.log('Not logged');
    }
  }

  render() {
    const { comments, likeComment, unlikeComment, dislikeComment, account, openCommentingDraft, sortOrder } = this.props;
    if (isEmpty(comments.commentsRoots)) {
      return <div />;
    }
    const list = comments.commentsRoots;
    const commentsData = comments.commentsData;
    const visibleList = sortCommentsFromSteem(list, comments, sortOrder).slice(0, 5);

    return (
      <div className="CommentsList">
        { visibleList.map(commentId =>
          <CommentItem
            key={commentId}
            comment={commentsData[commentId]}
            isLiked={!!commentsData[commentId].active_votes.find(vote => vote.voter === account.name)}
            allComments={comments}
            vote={this.vote}
            likeComment={likeComment}
            unlikeComment={unlikeComment}
            dislikeComment={dislikeComment}
            account={account}
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
  account: selectAccount(),
  isConnected: selectIsConnected(),
});

const mapDispatchToProps = dispatch => ({
  getComments: post => dispatch(getCommentsBegin(post)),
  clearComments: () => dispatch(clearComments()),
  vote: (post, weight, params) => dispatch(voteBegin(post, weight, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
