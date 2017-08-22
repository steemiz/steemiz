import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom';

import UsersList from './components/UsersList';
import { selectFollowingsAccounts, selectFollowingsFromUser } from './selectors';
import { getFollowingsBegin } from './actions/getFollowings';

class ProfileFollowings extends Component {
  static propTypes = {
    getFollowings: PropTypes.func.isRequired,
    followingsAccounts: PropTypes.array.isRequired,
    followingsFromUser: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    if (isEmpty(this.props.followingsAccounts)) {
      this.props.getFollowings();
    }
  }

  loadMore() {
    const { followingsFromUser } = this.props;
    if (followingsFromUser.isLoading === false && followingsFromUser.hasMore === true) {
      this.props.getFollowings({
        addMore: true,
      });
    }
  }

  render() {
    const { followingsFromUser, followingsAccounts } = this.props;
    return (
      <div>
        {!isEmpty(followingsAccounts) && (
          <UsersList
            usersList={followingsAccounts}
            loadMore={this.loadMore}
            hasMore={followingsFromUser.hasMore}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followingsAccounts: selectFollowingsAccounts(props.match.params.accountName),
  followingsFromUser: selectFollowingsFromUser(props.match.params.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getFollowings: query => dispatch(getFollowingsBegin(props.match.params.accountName, query)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileFollowings));
