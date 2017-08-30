import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getRepliesToUserBegin } from '../Comment/actions/getRepliesToUser';
import { selectListRepliesToUser, selectHasMoreRepliesToUser, selectIsLoadingRepliesToUser, selectCommentsData } from '../Comment/selectors';

import InfiniteList from 'components/InfiniteList';
import ContentItem from 'components/ContentItem';

class ProfileReplies extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    commentsData: PropTypes.object.isRequired,
    listRepliesToUser: PropTypes.array.isRequired,
    getRepliesToUser: PropTypes.func.isRequired,
    hasMoreRepliesToUser: PropTypes.bool.isRequired,
    repliesIsLoading: PropTypes.bool.isRequired,
  };

  render() {
    const { getRepliesToUser, listRepliesToUser, hasMoreRepliesToUser, repliesIsLoading, commentsData } = this.props;
    return (
      <InfiniteList
        list={listRepliesToUser}
        hasMore={hasMoreRepliesToUser}
        isLoading={repliesIsLoading}
        initLoad={getRepliesToUser}
        loadMoreCb={() => getRepliesToUser({ addMore: true })}
        itemMappingCb={commentId => (
          <ContentItem
            key={commentId}
            content={commentsData[commentId]}
            type="comment"
          />
        )}
      />
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  listRepliesToUser: selectListRepliesToUser(props.match.params.accountName),
  hasMoreRepliesToUser: selectHasMoreRepliesToUser(props.match.params.accountName),
  repliesIsLoading: selectIsLoadingRepliesToUser(props.match.params.accountName),
  commentsData: selectCommentsData(),
});

const mapDispatchToProps = (dispatch, props) => ({
  getRepliesToUser: query => dispatch(getRepliesToUserBegin(props.match.params.accountName, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileReplies);
