import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom';

import UsersList from './components/UsersList';
import { selectFollowersAccounts, selectFollowersFromUser } from './selectors';
import { getFollowersBegin } from './actions/getFollowers';

class ProfileFollowers extends Component {
  static propTypes = {
    getFollowers: PropTypes.func.isRequired,
    followersAccounts: PropTypes.array.isRequired,
    followersFromUser: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    if (isEmpty(this.props.followersAccounts)) {
      this.props.getFollowers();
    }
  }

  loadMore() {
    const { followersFromUser } = this.props;
    if (followersFromUser.isLoading === false && followersFromUser.hasMore === true) {
      this.props.getFollowers({
        addMore: true,
      });
    }
  }

  render() {
    const { followersAccounts, followersFromUser } = this.props;
    return (
      <div>
        {!isEmpty(followersAccounts) && (
          <UsersList
            usersList={followersAccounts}
            loadMore={this.loadMore}
            hasMore={followersFromUser.hasMore}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followersAccounts: selectFollowersAccounts(props.match.params.accountName),
  followersFromUser: selectFollowersFromUser(props.match.params.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getFollowers: query => dispatch(getFollowersBegin(props.match.params.accountName, query)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileFollowers));
