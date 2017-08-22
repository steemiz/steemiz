import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { getCommentsFromUserBegin } from '../Comment/actions/getCommentsFromUser';
import { selectListCommentsFromUser, selectHasMoreCommentsFromUser, selectIsLoadingCommentsFromUser } from '../Comment/selectors';

import CommentList from '../Comment/CommentList';

class ProfileComments extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    listCommentsFromUser: PropTypes.array.isRequired,
    getCommentsFromUser: PropTypes.func.isRequired,
    hasMoreCommentsFromUser: PropTypes.bool.isRequired,
    commentsIsLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { commentsIsLoading, listCommentsFromUser } = this.props;
    if (commentsIsLoading === false && isEmpty(listCommentsFromUser)) {
      this.props.getCommentsFromUser();
    }
  }

  loadMore() {
    const { commentsIsLoading, hasMoreCommentsFromUser } = this.props;
    if (commentsIsLoading === false && hasMoreCommentsFromUser === true) {
      this.props.getCommentsFromUser({
        addMore: true,
      });
    }
  }

  render() {
    const { listCommentsFromUser, hasMoreCommentsFromUser } = this.props;
    return (
      <div>
        {!isEmpty(listCommentsFromUser) && (
          <CommentList
            commentsList={listCommentsFromUser}
            hasMoreComments={hasMoreCommentsFromUser}
            loadMore={this.loadMore}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  listCommentsFromUser: selectListCommentsFromUser(props.match.params.accountName),
  hasMoreCommentsFromUser: selectHasMoreCommentsFromUser(props.match.params.accountName),
  commentsIsLoading: selectIsLoadingCommentsFromUser(props.match.params.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getCommentsFromUser: query => dispatch(getCommentsFromUserBegin(props.match.params.accountName, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComments);
