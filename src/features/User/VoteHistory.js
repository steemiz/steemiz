import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectVoteHistory } from './selectors';
import { getVoteHistoryBegin } from './actions/getVoteHistory';

class VoteHistory extends Component {
  static propTypes = {
    accountName: PropTypes.string.isRequired,
    getVoteHistory: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.voteHistory.length === 0) {
      this.props.getVoteHistory(this.props.accountName);
    }
  }

  render() {
    const { voteHistory } = this.props;
    return (
      <div>
        <h2>Vote History</h2>
        {voteHistory.length > 0 && voteHistory.map(vote => <div key={vote.authorperm}>{vote.authorperm}</div>)}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  voteHistory: selectVoteHistory(props.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getVoteHistory: accountName => dispatch(getVoteHistoryBegin(accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteHistory);

