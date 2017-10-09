import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getCommentsFromUserBegin } from '../Comment/actions/getCommentsFromUser';
import {
  selectCommentsData,
  selectHasMoreCommentsFromUser,
  selectIsLoadingCommentsFromUser,
  selectListCommentsFromUser
} from '../Comment/selectors';

import InfiniteList from 'components/InfiniteList';
import ContentItem from 'components/ContentItem';
import titleWrapper from 'titleWrapper';

function ProfileComments(props) {
  const { getCommentsFromUser, listCommentsFromUser, hasMoreCommentsFromUser, commentsIsLoading, commentsData } = props;
  return (
    <InfiniteList
      list={listCommentsFromUser}
      hasMore={hasMoreCommentsFromUser}
      isLoading={commentsIsLoading}
      initLoad={getCommentsFromUser}
      loadMoreCb={() => getCommentsFromUser({ addMore: true })}
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

ProfileComments.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      accountName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  commentsData: PropTypes.object.isRequired,
  listCommentsFromUser: PropTypes.array.isRequired,
  getCommentsFromUser: PropTypes.func.isRequired,
  hasMoreCommentsFromUser: PropTypes.bool,
  commentsIsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, props) => createStructuredSelector({
  listCommentsFromUser: selectListCommentsFromUser(props.match.params.accountName),
  hasMoreCommentsFromUser: selectHasMoreCommentsFromUser(props.match.params.accountName),
  commentsIsLoading: selectIsLoadingCommentsFromUser(props.match.params.accountName),
  commentsData: selectCommentsData(),
});

const mapDispatchToProps = (dispatch, props) => ({
  getCommentsFromUser: query => dispatch(getCommentsFromUserBegin(props.match.params.accountName, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(titleWrapper(ProfileComments, 'Comments'));
