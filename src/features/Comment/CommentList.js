import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import InfiniteScroll from 'react-infinite-scroller';

import { selectCommentsData } from './selectors';
import ContentItem from '../../components/ContentItem';
import { sortCommentsFromSteem } from '../../utils/helpers/stateHelpers';

class CommentList extends Component {
  static propTypes = {
    commentsList: PropTypes.array.isRequired,
    commentsData: PropTypes.object.isRequired,
    hasMoreComments: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
  };

  render() {
    const { commentsList, commentsData, hasMoreComments, loadMore } = this.props;
    if (isEmpty(commentsList)) {
      return <div />;
    }
    //const sortedComments = sortCommentsFromSteem(commentsList, commentsData, 'new');
    const items = commentsList.map(commentId => (
      <ContentItem
        key={commentId}
        content={commentsData[commentId]}
        type="comment"
      />
    ));
    return (
      <div className="Comment">
        {commentsList.length > 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMoreComments}
            loader={<div className="loader">Loading ...</div>}
          >
            {items}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  commentsData: selectCommentsData(),
});

export default connect(mapStateToProps)(CommentList);
