import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import InfiniteScroll from 'react-infinite-scroller';

import UserCard from './UserCard';
import CircularProgress from 'components/CircularProgress';

class UsersList extends Component {
  static propTypes = {
    usersList: PropTypes.array.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
  };

  render() {
    const { usersList, hasMore, loadMore } = this.props;
    if (isEmpty(usersList)) {
      return <div />;
    }
    const items = usersList.map(user => (
      <UserCard
        key={user.id}
        user={user}
      />
    ));
    return (
      <div className="usercard_container">
        {usersList.length > 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={<CircularProgress />}
          >
            {items}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default UsersList;
