import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import numeral from 'numeral';

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import IconForward from 'material-ui/svg-icons/content/forward';
import { grey400, white } from 'material-ui/styles/colors';

import { selectIsConnected, selectMyAccount } from 'features/User/selectors';
import { selectAppRewardFund, selectAppProps, selectAppRate } from 'features/App/selectors';
import { voteBegin } from './actions/vote';
import { hasVoted } from 'utils/helpers/steemitHelpers';

class VoteButton extends Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
    myAccount: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    vote: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.vote = this.vote.bind(this);
    this.state = {
      voteWeight: 100,
      sliderIsOpen: false,
      over: false,
    }
  }

  vote(weight) {
    const { isConnected, content, vote, type } = this.props;
    if (isConnected) {
      this.setState({ sliderIsOpen: false });
      vote(content, weight, { type });
    } else {
      console.log('Not logged');
    }
  }

  openSlider = () => {
    this.setState({ sliderIsOpen: true });
  };

  closeSlider = () => {
    this.setState({ sliderIsOpen: false, over: false });
  };

  handleVoteWeight = (event, value) => {
    this.setState({ voteWeight: value });
  };

  overIn = () => {
    this.setState({ over: true });
  };

  overOut = () => {
    this.setState({ over: false });
  };

  votingValueCalculator = voteWeight => {
    const { appProps, rewardFund, myAccount } = this.props;
    const { steemPower, voting_power } = myAccount;
    const { total_vesting_fund_steem, total_vesting_shares } = appProps;
    const { reward_balance, recent_claims } = rewardFund;

    const totalVestingFundSteem = parseFloat(total_vesting_fund_steem);
    const totalVestingShares = parseFloat(total_vesting_shares);
    const a = totalVestingFundSteem / totalVestingShares;

    const rewardBalance = parseFloat(reward_balance);
    const recentClaims = parseFloat(recent_claims);
    const rate = parseFloat(this.props.rate);
    const r = steemPower / a;
    let p = voting_power * voteWeight * 100 / 10000;
    p = (p + 49) / 50;
    const result = r * p * 100 * (rewardBalance / recentClaims * rate);
    return result;
  };

  render() {
    const { myAccount, isConnected, content } = this.props;
    const { voteWeight, sliderIsOpen, over } = this.state;
    const contentUpvoted = hasVoted(content, myAccount.name);

    return (
      <div>
        {isConnected && (
          <div className={`Vote ${contentUpvoted ? 'active' : ''}`} onMouseEnter={this.overIn}
               onMouseLeave={this.overOut}>
            <IconButton
              onClick={!contentUpvoted ? this.openSlider : () => this.vote(0)}
              disabled={!isConnected}
              iconStyle={{
                width: 18,
                height: 18,
                transform: 'rotate(-90deg)',
              }}
              style={{
                width: 36,
                height: 36,
                padding: 0,
              }}
            >
              <IconForward
                color={contentUpvoted || over ? white : grey400}
                hoverColor={white}
              />
            </IconButton>
            {sliderIsOpen && (
              <div className="CardBox">
                <div className="Slider">
                  <Slider
                    style={{ width: '100%' }}
                    sliderStyle={{ marginBottom: 24 }}
                    min={0}
                    max={100}
                    step={1}
                    value={voteWeight}
                    onChange={this.handleVoteWeight}
                  />
                  <div className="Weight">{voteWeight}%
                    ({numeral(this.votingValueCalculator(voteWeight)).format('$0,0.00')})
                  </div>
                </div>
                <RaisedButton
                  label="Vote"
                  primary
                  onTouchTap={() => this.vote(voteWeight * 100)}
                  disabled={voteWeight === 0}
                />
                <FlatButton label="Close" primary onTouchTap={this.closeSlider} />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  myAccount: selectMyAccount(),
  isConnected: selectIsConnected(),
  appProps: selectAppProps(),
  rate: selectAppRate(),
  rewardFund: selectAppRewardFund(),
});

const mapDispatchToProps = (dispatch, props) => ({
  vote: (content, weight, params) => dispatch(voteBegin(content, weight, props.type, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteButton);
