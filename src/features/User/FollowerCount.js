import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectFollowersCount, selectFollowingsCount } from './selectors';

import { getFollowerCountBegin } from './actions/getFollowerCount';

class FollowerCount extends Component {
  static defaultProps = {
    count: undefined,
  };

  static propTypes = {
    accountName: PropTypes.string.isRequired,
    unit: PropTypes.oneOf(['followers', 'followings']).isRequired,
    getFollowerCount: PropTypes.func.isRequired,
    count: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([undefined]),
    ]),
  };

  componentDidMount() {
    const { count, accountName } = this.props;
    if (count === undefined) {
      this.props.getFollowerCount(accountName);
    }
  }

  render() {
    const { count } = this.props;
    return (
      <span>
        {count || 0}
      </span>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  count: props.unit === 'followers' ? selectFollowersCount(props.accountName) : selectFollowingsCount(props.accountName),
});

const mapDispatchToProps = dispatch => ({
  getFollowerCount: accountName => dispatch(getFollowerCountBegin(accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowerCount);
