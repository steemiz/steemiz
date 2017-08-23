import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedRelative } from 'react-intl';
import Body from 'components/Body';
import { sortCommentsFromSteem } from 'utils/helpers/stateHelpers';
import ContentPayoutAndVotes from 'components/ContentPayoutAndVotes';
import AvatarSteemit from 'components/AvatarSteemit';
import Author from 'components/Author';

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

  scrollToAnchoredLink() {
    const { location } = this.props;
    // eslint-disable-next-line
    const targetElm = window.document.getElementById(location.hash);
    if (!targetElm) return;
    targetElm.scrollIntoView();
  }

  render() {
    const { comment, commentsChild, commentsData, sortOrder } = this.props;

    return (
      <div className="CommentComponent">
        <div className="CommentItem">
          <div className="CommentComponent__avatar">
            <Link to={`/@${comment.author}`}>
              <AvatarSteemit name={comment.author} />
            </Link>
          </div>
          <div className="CommentComponent__detail">
            <div className="CommentComponent__head">
              <Author name={comment.author} reputation={comment.author_reputation} />
              <span className="timestamp">
                <FormattedRelative value={`${comment.created}Z`} />
              </span>
            </div>
            <div className="CommentComponent__body">
              <div className="CommentComponent__content">
                <Body post={comment} />
              </div>
            </div>
            <div className="CommentComponent__footer">
              <ContentPayoutAndVotes type="comment" content={comment} />
              <span className="CommentComponent__reply" onClick={this.props.onReply}>Reply</span>
            </div>
            {/*<div className="CommentActionButtons">
              <div className="CommentActionButtons__button">
                <a
                  onClick={!isLiked
                    ? () => vote(comment, account.voting_power)
                    : () => vote(comment, 0)}
                  className={isLiked ? 'active' : ''}
                >
                  <ThumbUp />
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
            </div>*/}

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
        <div className="Comment__child">
          {commentsChild[comment.id] && sortCommentsFromSteem(
            commentsChild[comment.id],
            commentsData,
            sortOrder
          ).map(commentId =>
            <CommentItem
              {...this.props}
              key={commentId}
              comment={commentsData[commentId]}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(CommentItem);
