import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import UsersList from './components/UsersList';
import { selectFollowersList } from './selectors';
import { getFollowersBegin } from './actions/getFollowers';

class FollowersList extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    getFollowers: PropTypes.func.isRequired,
    followers: PropTypes.array,
  };

  static defaultProps = {
    followers: undefined,
  };

  componentDidMount() {
    if (this.props.followers === undefined) {
      this.props.getFollowers();
    }
  }

  render() {
    const { followers } = this.props;
    const followersDataSource = followers ? followers.map(follower => follower.follower) : [];
    return (
      <UsersList dataSource={followersDataSource} />
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followers: selectFollowersList(props.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getFollowers: () => dispatch(getFollowersBegin(props.accountName, {}, false, 0)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowersList);
