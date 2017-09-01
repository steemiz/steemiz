import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserCard from './components/UserCard';
import InfiniteList from 'components/InfiniteList';
import { selectFollowingsAccounts, selectFollowingsFromUser } from './selectors';
import { getFollowingsBegin } from './actions/getFollowings';

class ProfileFollowings extends Component {
  static propTypes = {
    getFollowings: PropTypes.func.isRequired,
    followingsAccounts: PropTypes.array.isRequired,
    followingsFromUser: PropTypes.object.isRequired,
  };

  render() {
    const { getFollowings, followingsFromUser, followingsAccounts } = this.props;
    return (
      <div className="usercard_container">
        <InfiniteList
          list={followingsAccounts}
          hasMore={followingsFromUser.hasMore}
          isLoading={followingsFromUser.isLoading}
          initLoad={getFollowings}
          loadMoreCb={() => getFollowings({ addMore: true })}
          itemMappingCb={user => (
            <UserCard
              key={user.id}
              user={user}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followingsAccounts: selectFollowingsAccounts(props.match.params.accountName),
  followingsFromUser: selectFollowingsFromUser(props.match.params.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getFollowings: query => dispatch(getFollowingsBegin(props.match.params.accountName, query, true)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileFollowings));
