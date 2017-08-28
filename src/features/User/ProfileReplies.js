import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { getRepliesToUserBegin } from '../Comment/actions/getRepliesToUser';
import { selectListRepliesToUser, selectHasMoreRepliesToUser, selectIsLoadingRepliesToUser, selectCommentsData } from '../Comment/selectors';

import CommentList from '../Comment/CommentList';

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

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { listRepliesToUser } = this.props;
    if (isEmpty(listRepliesToUser)) {
      this.props.getRepliesToUser();
    }
  }

  loadMore() {
    const { repliesIsLoading, hasMoreRepliesToUser } = this.props;
    if (repliesIsLoading === false && hasMoreRepliesToUser === true) {
      this.props.getRepliesToUser({
        addMore: true,
      });
    }
  }

  render() {
    const { listRepliesToUser, hasMoreRepliesToUser, commentsData } = this.props;
    return (
      <div>
        {!isEmpty(listRepliesToUser) ? (
          <CommentList
            commentsData={commentsData}
            commentsList={listRepliesToUser}
            hasMoreComments={hasMoreRepliesToUser}
            loadMore={this.loadMore}
          />
        ) : <div />}
      </div>
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
