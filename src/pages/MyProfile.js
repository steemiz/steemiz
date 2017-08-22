import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { selectMe } from '../features/User/selectors';
import Profile from '../features/User/Profile';

class MyProfile extends Component {
  static propTypes = {
    me: PropTypes.string.isRequired,
  };

  render() {
    const { me } = this.props;
    return (
      <div>
        {!isEmpty(me) ? <Profile accountName={me} /> : <div/>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  me: selectMe(),
});

export default connect(mapStateToProps, null)(MyProfile);
