import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import numeral from 'numeral';

import { selectTransferHistory, selectLastWeekRewardsAuthor, selectLastWeekRewardsCuration } from './selectors';
import { getTransferHistoryBegin } from './actions/getTransferHistory';
import asyncComponent from 'utils/asyncComponent';

const ProfileRewardsCuration = asyncComponent(() => import('./ProfileRewardsCuration'));
const ProfileRewardsAuthor = asyncComponent(() => import('./ProfileRewardsAuthor'));

const RewardStat = (props) => {
  return (
    <div className="tab__title__statistic">
      <p className="text">
        Estimated {props.type} rewards last week
      </p>
      <div className="number">
        <h3>{numeral(props.estimation).format('0,0.000')}</h3>
        <p>Steem Power</p>
      </div>
    </div>
  );
};

class ProfileRewards extends Component {
  static propTypes = {
    getTransferHistory: PropTypes.func.isRequired,
    transferHistory: PropTypes.array.isRequired,
    lastWeekRewardsAuthor: PropTypes.number.isRequired,
    lastWeekRewardsCuration: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const { transferHistory } = this.props;
    if (isEmpty(transferHistory)) {
      this.props.getTransferHistory();
    }
  }

  render() {
    const { lastWeekRewardsCuration, lastWeekRewardsAuthor, match } = this.props;
    const accountName = match.params.accountName;
    return (
      <div className="rewards_container clearfix">
        <div className="tab">
          <div className="tab__title">
            <NavLink className="tab__key" activeClassName="active" to={`/@${accountName}/rewards`} exact>Curation</NavLink>
            <NavLink className="tab__key" activeClassName="active" to={`/@${accountName}/rewards/author`} exact>Author</NavLink>
            <Route path="/@:accountName/rewards" exact render={props => <RewardStat type="curation" estimation={lastWeekRewardsCuration} />} />
            <Route path="/@:accountName/rewards/author" exact render={props => <RewardStat type="author" estimation={lastWeekRewardsAuthor} />} />
          </div>
          <Route path="/@:accountName/rewards" exact component={ProfileRewardsCuration} />
          <Route path="/@:accountName/rewards/author" exact component={ProfileRewardsAuthor} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  transferHistory: selectTransferHistory(props.match.params.accountName),
  lastWeekRewardsAuthor: selectLastWeekRewardsAuthor(props.match.params.accountName),
  lastWeekRewardsCuration: selectLastWeekRewardsCuration(props.match.params.accountName),
});

const mapDispatchToProps = (dispatch, props) => ({
  getTransferHistory: () => dispatch(getTransferHistoryBegin(props.match.params.accountName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRewards);
