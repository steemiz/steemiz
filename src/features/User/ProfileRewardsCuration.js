import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import titleWrapper from 'titleWrapper';

import InfiniteList from 'components/InfiniteList';
import Reward from './components/Reward';
import { selectHistoryTransfer, selectRewardsCuration } from './selectors';
import { getTransferHistoryBegin } from './actions/getTransferHistory';

function ProfileRewardsCuration(props) {
  const { getTransferHistory, historyTransfer: { hasMore, isLoading }, rewardsCuration } = props;
  return (
    <div>
      <div className="tab__filter">
        <h3 className="tab__filter__text">
          Curation Rewards History
        </h3>
      </div>
      <div className="tab__result">
        <InfiniteList
          list={rewardsCuration}
          hasMore={hasMore}
          isLoading={isLoading}
          initLoad={getTransferHistory}
          loadMoreCb={getTransferHistory}
          itemMappingCb={(reward, index) => (
            <Reward key={index} reward={reward} type="curation" />
          )}
        />
      </div>
    </div>
  );
}

ProfileRewardsCuration.propTypes = {
  historyTransfer: PropTypes.object.isRequired,
  rewardsCuration: PropTypes.array.isRequired,
  getTransferHistory: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => createStructuredSelector({
  historyTransfer: selectHistoryTransfer(props.match.params.accountName),
  rewardsCuration: selectRewardsCuration(props.match.params.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getTransferHistory: () => dispatch(getTransferHistoryBegin(props.match.params.accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(titleWrapper(ProfileRewardsCuration, 'Rewards Curation'));
