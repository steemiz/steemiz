import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormattedRelative } from 'react-intl';
import { formatter } from 'steem';
import Body from 'components/Body';
import { sortCommentsFromSteem } from 'utils/helpers/stateHelpers';
import ContentPayoutAndVotes from 'components/ContentPayoutAndVotes';
import AvatarSteemit from 'components/AvatarSteemit';
import Author from 'components/Author';
import ReplyButton from 'components/ReplyButton';
import CommentReplyForm from './CommentReplyForm';

class CommentItem extends PureComponent {
  constructor() {
    super();
    this.switchReplyForm = this.switchReplyForm.bind(this);
    this.closeReplyForm = this.closeReplyForm.bind(this);
    this.state = {
      showReplyForm: false,
      isEditing: false,
    };
  }

  switchReplyForm() {
    this.setState({ showReplyForm: !this.state.showReplyForm });
  }

  closeReplyForm() {
    this.setState({ showReplyForm: false });
  }

  render() {
    const { comment, commentsChild, commentsData, sortOrder } = this.props;
    const { showReplyForm } = this.state;
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
              <Author name={comment.author}
                      reputation={formatter.reputation(comment.author_reputation)} />
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
              <ReplyButton onClick={this.switchReplyForm} />
            </div>
          </div>
        </div>
        <div className="Comment__child">
          {showReplyForm && (
            <div className="CommentComponent">
              <CommentReplyForm content={comment} closeForm={this.closeReplyForm} />
            </div>
          )}
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
