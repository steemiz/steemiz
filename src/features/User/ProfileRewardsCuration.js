import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectRewardsCuration } from './selectors';
import ProfileTransferHistory from './components/ProfileTransferHistory';

class ProfileRewardsCuration extends Component {
  static propTypes = {
    rewardsCuration: PropTypes.array.isRequired,
  };

  render() {
    const { rewardsCuration } = this.props;
    return (
      <ProfileTransferHistory
        type="curation"
        history={rewardsCuration}
      />
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  rewardsCuration: selectRewardsCuration(props.match.params.accountName),
});

export default connect(mapStateToProps)(ProfileRewardsCuration);
