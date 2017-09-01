import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectFollowersList } from './selectors';
import { getFollowersBegin } from './actions/getFollowers';
import UserContact from './components/UserContact';

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
    return (
      <div>
        {!isEmpty(followers) && followers.map(element => <UserContact key={element.follower} name={element.follower} />)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followers: selectFollowersList(props.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getFollowers: () => dispatch(getFollowersBegin(props.accountName, {}, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowersList);
