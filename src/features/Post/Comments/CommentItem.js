import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
//import { FormattedRelative } from 'react-intl';
import numeral from 'numeral';
import isEmpty from 'lodash/isEmpty';
import { getUpvotes, getDownvotes, sortVotes } from '../../../utils/helpers/voteHelpers';
import Body from '../../../components/Body';
import Avatar from 'material-ui/Avatar'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Reply from 'material-ui/svg-icons/content/reply';
import { sortCommentsFromSteem } from '../../../utils/helpers/stateHelpers';
//import CommentFormEmbedded from './CommentFormEmbedded';
//import './CommentItem.scss';

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmbeddedComment: false,
      isEditing: false,
    };
  }

  componentDidMount() {
    this.checkHashLink();
  }

  checkHashLink() {
    const { location } = this.props;
    // eslint-disable-next-line
    if (window && location.hash) {
      this.scrollToAnchoredLink();
    }
  }

  updateCommentPostion = () => {
    // should happen after react-router updated the route
    setTimeout(() => this.checkHashLink());
  }

  scrollToAnchoredLink() {
    const { location } = this.props;
    // eslint-disable-next-line
    const targetElm = window.document.getElementById(location.hash);
    if (!targetElm) return;
    targetElm.scrollIntoView();
  }

  toggleShowReplies = (e) => {
    this.setState({ showReplies: !this.state.showReplies });
  };

  handleReplyClick(e) {
    e.stopPropagation();
    const { comment } = this.props;

    this.props.openCommentingDraft({
      parentAuthor: comment.author,
      parentPermlink: comment.permlink,
      category: comment.category,
      id: comment.id,
      isReplyToComment: true,
    });
  }

  handleEditClick(e) {
    e.stopPropagation();
    const { comment } = this.props;

    this.props.openCommentingDraft({
      parentAuthor: comment.parent_author,
      category: comment.category,
      permlink: comment.permlink,
      parentPermlink: comment.parent_permlink,
      id: comment.id,
      isReplyToComment: true,
      isEditing: true,
      body: comment.body
    });
  }

  render() {
    const { comment, likeComment, unlikeComment, dislikeComment, profile, allComments, sortOrder } = this.props;

    const pendingPayoutValue = parseFloat(comment.pending_payout_value);
    const totalPayoutValue = parseFloat(comment.total_payout_value);
    const payout = totalPayoutValue || pendingPayoutValue;

    const isCommentLiked =
      !isEmpty(profile) &&
      comment.active_votes.some(vote => vote.voter === profile.user && vote.percent > 0);

    const isCommentDisliked =
      !isEmpty(profile) &&
      comment.active_votes.some(vote => vote.voter === profile.user && vote.percent < 0);

    const isEditable = comment.author === profile.user;
    const numberOfLikes = numeral(comment.active_votes.filter(vote => vote.percent > 0).length).format('0,0');
    const numberOfDislikes = numeral(comment.active_votes.filter(vote => vote.percent < 0).length).format('0,0');

    const fiveLastUpvotes =
      sortVotes(getUpvotes(comment.active_votes), 'rshares')
        .reverse()
        .slice(0, 5);
    const likesTooltipMsg = fiveLastUpvotes.map(vote => `${vote.voter}\n`);
    if (likesTooltipMsg.length === 5) likesTooltipMsg.push('...');

    const fiveLastDownvotes =
      sortVotes(getDownvotes(comment.active_votes), 'rshares')
      .reverse()
      .slice(0, 5);
    const dislikesTooltipMsg = fiveLastDownvotes.map(vote => `${vote.voter}\n`);
    if (dislikesTooltipMsg.length === 5) dislikesTooltipMsg.push('...');

    const anchoredLink = `#@${comment.author}/${comment.permlink}`;

    return (
      <div
        className={
          anchoredLink === this.props.location.hash
            ? 'CommentItem CommentItem--highlight'
            : 'CommentItem'
        }
        id={anchoredLink}
      >
        <div className={`CommentItem__content CommentItem__content--level-${comment.depth}`}>
          <div className="CommentUser">
            <Link to={`/@${comment.author}`}>
              <Avatar
                src={comment.author}
              />
            </Link>
          </div>
          <div className="CommentBody">
            <span className="CommentBody__username">
              <Link to={`/@${comment.author}`}>
                {comment.author}
              </Link>
              {' '}
              <Link className="text-info" to={comment.url} onClick={this.updateCommentPostion}>
                {/*<FormattedRelative value={`${comment.created}Z`} />*/}
                {comment.created}
              </Link>
            </span>
            <Body post={comment} />
            <div className="CommentActionButtons">
              <div className="CommentActionButtons__button">
                <a
                  onClick={isCommentLiked
                    ? () => unlikeComment(comment.id)
                    : () => likeComment(comment.id)}
                  className={isCommentLiked ? 'active' : ''}
                >
                  <ThumbUp />
                </a>
              </div>

              <div className="CommentActionButtons__button">
                <a
                  onClick={isCommentDisliked
                    ? () => unlikeComment(comment.id)
                    : () => dislikeComment(comment.id)}
                  className={isCommentDisliked ? 'active' : ''}
                >
                  <ThumbDown />
                </a>
              </div>

              <div className="CommentActionButtons__button">
                {numeral(payout).format('$0,0.000')}
              </div>

              {isEditable && <div className="CommentActionButtons__button">
                <a onClick={e => this.handleEditClick(e)}>
                  <Edit />
                </a>
              </div>}

              <a onClick={e => this.handleReplyClick(e)}>
                <Reply />
              </a>

              {' '}

              {(comment.children > 0) &&
                <a tabIndex="0" onClick={this.toggleShowReplies}>
                  View {comment.children}{' '}
                  {comment.children > 1 ? 'replies' : 'reply'}
                </a>
              }
            </div>

            {/*{this.state.showEmbeddedComment &&
              <CommentFormEmbedded
                parentId={comment.id}
                isReplyToComment
                isEditing={this.state.isEditing}
                onSubmit={() => this.setState({ showEmbeddedComment: false, isEditing: false })}
              />
            }*/}

          </div>
        </div>
        {allComments.commentsChild[comment.id] &&
          sortCommentsFromSteem(
            allComments.commentsChild[comment.id],
            allComments,
            sortOrder
          ).map(commentId =>
            <CommentItem
              {...this.props}
              key={commentId}
              comment={allComments.commentsData[commentId]}
            />
            )
        }
      </div>
    );
  }
}

export default withRouter(CommentItem);
