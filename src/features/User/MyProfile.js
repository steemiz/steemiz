import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectMyAccount } from './selectors';
import Profile from './Profile';

class MyProfile extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
  };

  render() {
    const { account } = this.props;
    return (
      <div>
        <h1>My Profile</h1>
        {!isEmpty(account) ? <Profile account={account} /> : <div/>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  account: selectMyAccount(),
});

export default connect(mapStateToProps, null)(MyProfile);
