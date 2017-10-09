import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getRepliesToUserBegin } from '../Comment/actions/getRepliesToUser';
import {
  selectCommentsData,
  selectHasMoreRepliesToUser,
  selectIsLoadingRepliesToUser,
  selectListRepliesToUser
} from '../Comment/selectors';
import titleWrapper from 'titleWrapper';
import InfiniteList from 'components/InfiniteList';
import ContentItem from 'components/ContentItem';

function ProfileReplies(props) {
  const { getRepliesToUser, listRepliesToUser, hasMoreRepliesToUser, repliesIsLoading, commentsData } = props;
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

ProfileReplies.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      accountName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  commentsData: PropTypes.object.isRequired,
  listRepliesToUser: PropTypes.array.isRequired,
  getRepliesToUser: PropTypes.func.isRequired,
  hasMoreRepliesToUser: PropTypes.bool,
  repliesIsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, props) => createStructuredSelector({
  listRepliesToUser: selectListRepliesToUser(props.match.params.accountName),
  hasMoreRepliesToUser: selectHasMoreRepliesToUser(props.match.params.accountName),
  repliesIsLoading: selectIsLoadingRepliesToUser(props.match.params.accountName),
  commentsData: selectCommentsData(),
});

const mapDispatchToProps = (dispatch, props) => ({
  getRepliesToUser: query => dispatch(getRepliesToUserBegin(props.match.params.accountName, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(titleWrapper(ProfileReplies, 'Replies'));
