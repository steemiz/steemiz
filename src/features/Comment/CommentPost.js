import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import InfiniteList from 'components/InfiniteList';

export default class CommentPost extends PureComponent {
  static propTypes = {
    currentComments: PropTypes.object.isRequired,
    commentsData: PropTypes.object.isRequired,
    commentsChild: PropTypes.object.isRequired,
    openCommentingDraft: PropTypes.string,
    sortOrder: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      nbCommentsDisplayed: 10,
    }
  }

  addMore = () => {
    this.setState({
      nbCommentsDisplayed: this.state.nbCommentsDisplayed + 10,
    });
  };

  render() {
    const { commentsChild, currentComments, commentsData, openCommentingDraft, sortOrder } = this.props;
    const { nbCommentsDisplayed } = this.state;
    const list = currentComments.list;
    const listDisplayed = list.slice(0, nbCommentsDisplayed);

    return (
      <div>
        <InfiniteList
          list={listDisplayed}
          hasMore={list.length > nbCommentsDisplayed}
          isLoading={false}
          loadMoreCb={this.addMore}
          itemMappingCb={commentId =>
            <CommentItem
              key={commentId}
              comment={commentsData[commentId]}
              commentsData={commentsData}
              commentsChild={commentsChild}
              openCommentingDraft={openCommentingDraft}
              sortOrder={sortOrder}
            />}
        />
      </div>
    );
  }
}
