import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import titleWrapper from 'titleWrapper';

import InfiniteList from 'components/InfiniteList';
import UserVote from './components/UserVote';
import { selectReceivedVotes, selectGivenVotes, selectHistoryTransfer } from './selectors';
import { getTransferHistoryBegin } from './actions/getTransferHistory';

class ProfileVotes extends Component {
  static defaultProps = {
    givenVotes: undefined,
    receivedVotes: undefined,
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        accountName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    getTransferHistory: PropTypes.func.isRequired,
    historyTransfer: PropTypes.object.isRequired,
    givenVotes: PropTypes.array,
    receivedVotes: PropTypes.array,
  };

  componentDidMount() {
    const { historyTransfer } = this.props;
    if (isEmpty(historyTransfer)) {
      this.props.getTransferHistory();
    }
  }

  loadMore() {
    const { historyTransfer } = this.props;
    if (historyTransfer.isLoading === false && historyTransfer.hasMore === true) {
      this.props.getTransferHistory();
    }
  }

  render() {
    const { getTransferHistory, historyTransfer, givenVotes, receivedVotes } = this.props;
    return (
      <div>
        <div className="votes_container clearfix">
          <div className="votes__body">
            {!isEmpty(receivedVotes) && (
              <div className="votes__result votes__result--received">
                <div className="votes__result__number">
                  <h2>{receivedVotes.length}</h2>
                  <p>Received Upvotes</p>
                </div>
                <ul className="votes__result__list">
                  <InfiniteList
                    list={receivedVotes}
                    hasMore={historyTransfer.hasMore}
                    isLoading={historyTransfer.isLoading}
                    loadMoreCb={getTransferHistory}
                    itemMappingCb={(vote, index) => (
                      <UserVote
                        key={`${vote.author}-${index}`}
                        vote={vote}
                        type="received"
                      />
                    )}
                  />
                </ul>
              </div>
            )}
            {!isEmpty(givenVotes) && (
              <div className="votes__result votes__result--given">
                <div className="votes__result__number">
                  <h2>{givenVotes.length}</h2>
                  <p>Givens Upvotes</p>
                </div>
                <ul className="votes__result__list">
                  <InfiniteList
                    list={givenVotes}
                    hasMore={historyTransfer.hasMore}
                    isLoading={historyTransfer.isLoading}
                    loadMoreCb={getTransferHistory}
                    itemMappingCb={(vote, index) => (
                      <UserVote
                        key={`${vote.author}-${index}`}
                        vote={vote}
                        type="given"
                      />
                    )}
                  />
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  givenVotes: selectGivenVotes(props.match.params.accountName),
  receivedVotes: selectReceivedVotes(props.match.params.accountName),
  historyTransfer: selectHistoryTransfer(props.match.params.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getTransferHistory: () => dispatch(getTransferHistoryBegin(props.match.params.accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(titleWrapper(ProfileVotes, 'Votes'));
