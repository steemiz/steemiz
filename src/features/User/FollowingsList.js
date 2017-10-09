import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import UsersList from './components/UsersList';
import { selectFollowingsList } from './selectors';
import { getFollowingsBegin } from './actions/getFollowings';

class FollowingList extends Component {
  static defaultProps = {
    followings: undefined,
  };

  static propTypes = {
    accountName: PropTypes.string.isRequired,
    getFollowings: PropTypes.func.isRequired,
    followings: PropTypes.array,
  };

  componentDidMount() {
    if (this.props.followings === undefined) {
      this.props.getFollowings();
    }
  }

  render() {
    const { followings } = this.props;
    const followingsDataSource = followings ? followings.map(following => following.following) : [];
    return (
      <UsersList dataSource={followingsDataSource} />
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followings: selectFollowingsList(props.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getFollowings: () => dispatch(getFollowingsBegin(props.accountName, {}, false, 0)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);
