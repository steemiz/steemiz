import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom';

import UserCard from './components/UserCard';
import InfiniteList from 'components/InfiniteList';
import { selectFollowersAccounts, selectFollowersFromUser } from './selectors';
import { getFollowersBegin } from './actions/getFollowers';

class ProfileFollowers extends Component {
  static propTypes = {
    getFollowers: PropTypes.func.isRequired,
    followersAccounts: PropTypes.array.isRequired,
    followersFromUser: PropTypes.object.isRequired,
  };

  render() {
    const { getFollowers, followersAccounts, followersFromUser } = this.props;
    return (
      <div className="usercard_container">
        {!isEmpty(followersFromUser) && (
          <InfiniteList
            list={followersAccounts}
            hasMore={followersFromUser.hasMore}
            isLoading={followersFromUser.isLoading}
            initLoad={getFollowers}
            loadMoreCb={() => getFollowers({ addMore: true })}
            itemMappingCb={user => (
              <UserCard
                key={user.id}
                user={user}
              />
            )}
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
