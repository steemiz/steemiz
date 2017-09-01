import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectFollowingsList } from './selectors';
import { getFollowingsBegin } from './actions/getFollowings';
import UserContact from './components/UserContact';

class FollowingList extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    getFollowings: PropTypes.func.isRequired,
    followings: PropTypes.array,
  };

  static defaultProps = {
    followings: undefined,
  };

  componentDidMount() {
    if (this.props.followings === undefined) {
      this.props.getFollowings();
    }
  }

  render() {
    const { followings } = this.props;
    return (
      <div>
        {!isEmpty(followings) && followings.map(element => <UserContact key={element.following} name={element.following} />)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  followings: selectFollowingsList(props.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getFollowings: () => dispatch(getFollowingsBegin(props.accountName, {}, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);
