import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import numeral from 'numeral';
import titleWrapper from 'titleWrapper';

import { selectLastWeekRewardsAuthor, selectLastWeekRewardsCuration } from './selectors';
import asyncComponent from 'asyncComponent';

const ProfileRewardsCuration = asyncComponent(() => import('./ProfileRewardsCuration'), 'features/User/ProfileRewardsCuration');
const ProfileRewardsAuthor = asyncComponent(() => import('./ProfileRewardsAuthor'), 'features/User/ProfileRewardsAuthor');

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
    lastWeekRewardsAuthor: PropTypes.number.isRequired,
    lastWeekRewardsCuration: PropTypes.number.isRequired,
  };

  render() {
    const { lastWeekRewardsCuration, lastWeekRewardsAuthor, match } = this.props;
    const accountName = match.params.accountName;
    return (
      <div className="rewards_container clearfix">
        <div className="tab">
          <div className="tab__title">
            <NavLink className="tab__key" activeClassName="active" to={`/@${accountName}/rewards`} exact>Curation</NavLink>
            <NavLink className="tab__key" activeClassName="active" to={`/@${accountName}/rewards/author`} exact>Author</NavLink>
            <Route path={`${match.path}`} exact render={props => <RewardStat type="curation" estimation={lastWeekRewardsCuration} />} />
            <Route path={`${match.path}/author`} exact render={props => <RewardStat type="author" estimation={lastWeekRewardsAuthor} />} />
          </div>
          <Route path={`${match.path}`} exact component={ProfileRewardsCuration} />
          <Route path={`${match.path}/author`} exact component={ProfileRewardsAuthor} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  lastWeekRewardsAuthor: selectLastWeekRewardsAuthor(props.match.params.accountName),
  lastWeekRewardsCuration: selectLastWeekRewardsCuration(props.match.params.accountName),
});

export default connect(mapStateToProps)(titleWrapper(ProfileRewards, 'Rewards'));
