import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectRewardsAuthor } from './selectors';
import ProfileTransferHistory from './components/ProfileTransferHistory';

class ProfileRewardsAuthor extends Component {
  static propTypes = {
    rewardsAuthor: PropTypes.array.isRequired,
  };

  render() {
    const { rewardsAuthor } = this.props;
    return (
      <ProfileTransferHistory
        type="author"
        history={rewardsAuthor}
      />
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  rewardsAuthor: selectRewardsAuthor(props.match.params.accountName),
});

export default connect(mapStateToProps)(ProfileRewardsAuthor);
