import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import numeral from 'numeral';

import UserSteemPower from './UserSteemPower';
import UserEstimatedValue from './UserEstimatedValue';
import { selectCurrentAccount } from './selectors';


class ProfileRewards extends Component {
  static propTypes = {
    currentAccount: PropTypes.object.isRequired,
  };

  render() {
    const { currentAccount } = this.props;
    const steem = parseFloat(currentAccount.balance);
    const savingBalance = parseFloat(currentAccount.savings_balance);
    const savingSbdBalance = parseFloat(currentAccount.savings_sbd_balance);
    return (
      <div className="wallet_container clearfix">
        <div className="wallet">
          <div className="wallet__head">
            <h3>Balances</h3>
            <div className="wallet__head__total">
              <p className="text">
                The estimated value is based on an average value of Steem in US
                dollars.
              </p>
              <div className="number">
                <h4 className="total">
                  <span className="label">$</span><UserEstimatedValue account={currentAccount} />
                </h4>
              </div>
            </div>
          </div>
          <div className="wallet__body">
            <div className="wallet__body__row">
              <div className="text">
                <h3>STEEM</h3>
                <p>
                  Tradeable tokens that may be transferred anywhere at anytime.<br/>
                  Steem can be converted to STEEM POWER in a process called powering up.
                </p>
              </div>
              <div className="number">
                <h3>{numeral(steem).format('0,0.000')}</h3>
                <span className="label">Steem</span>
              </div>
            </div>
            <div className="wallet__body__row">
              <div className="text">
                <h3>STEEM POWER</h3>
                <p>
                  Influence tokens which give you more control over post payouts and allow you to earn on curation rewards.
                </p>
              </div>
              <div className="number">
                <h3>{currentAccount.vesting_shares && <UserSteemPower vestingShares={currentAccount.vesting_shares} />}</h3>
                <span className="label">Steem</span>
              </div>
            </div>
            <div className="wallet__body__row">
              <div className="text">
                <h3>STEEM DOLLARS</h3>
                <p>
                  Tokens worth about $1.00 of STEEM, currently collecting 0% APR.
                </p>
              </div>
              <div className="number">
                <h3>
                  <span className="label">$</span>
                  {numeral(currentAccount.sbd_balance).format('0,0.00')}
                  </h3>
              </div>
            </div>
            <div className="wallet__body__row">
              <div className="text">
                <h3>SAVINGS</h3>
                <p>
                  Balance subject to 3 day withdraw waiting period, STEEM DOLLARS currently collecting 0% APR.
                </p>
              </div>
              <div className="number">
                <h3>{numeral(savingBalance).format('0,0.00')}</h3>
                <span className="label">steem</span>
                <h3>
                  <span className="label">$</span>
                  {numeral(savingSbdBalance).format('0,0.00')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  currentAccount: selectCurrentAccount(),
});

/*
const mapDispatchToProps = (dispatch, props) => ({
  getTransferHistory: () => dispatch(getTransferHistoryBegin(props.match.params.accountName)),
});
*/

export default connect(mapStateToProps)(ProfileRewards);
