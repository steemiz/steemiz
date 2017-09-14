import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover';

import { getUpvotes, sortVotes } from 'utils/helpers/voteHelpers';
import CircularProgress from 'components/CircularProgress';
import Payout from 'features/Comment/Payout';
import VoteButton from 'features/Vote/VoteButton';
import { calculateContentPayout, formatAmount } from 'utils/helpers/steemitHelpers';

export default class ContentPayoutAndVotes extends PureComponent {
  static propTypes = {
    content: PropTypes.object.isRequired, // Post or comment
    type: PropTypes.oneOf(['post', 'comment']).isRequired, // post or comment
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpenMoneyCard: false,
      isOpenVoteCard: false,
      moneyAnchor: {},
      voteAnchor: {},
    };
  }

  openMoneyCard = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      isOpenMoneyCard: !this.state.isOpenMoneyCard,
      moneyAnchor: event.currentTarget,
    })
  };

  openVoteCard = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      isOpenVoteCard: !this.state.isOpenVoteCard,
      voteAnchor: event.currentTarget,
    })
  };

  closeCards = () => {
    this.setState({
      isOpenMoneyCard: false,
      isOpenVoteCard: false,
    })
  };

  render() {
    const { content, type } = this.props;
    const { isOpenMoneyCard, isOpenVoteCard } = this.state;

    const payout = calculateContentPayout(content);

    const fiveLastVotes =
      sortVotes(getUpvotes(content.active_votes), 'rshares')
        .reverse()
        .slice(0, 5);
    const lastVotesTooltipMsg = fiveLastVotes.map(vote => (
      <Link to={`/@${vote.voter}`} key={vote.voter}>{vote.voter}</Link>
    ));
    if (lastVotesTooltipMsg.length === 5) lastVotesTooltipMsg.push(
      <div key="...">
        ... and {content.active_votes.length - 5} more votes.
      </div>
    );

    return (
      <div className="Voting">
        <div className="Voting__button">
          <VoteButton content={content} type={type} />
        </div>
        <div className="Voting__money">
          {content.isUpdating && <CircularProgress size={20} thickness={3} style={{ marginRight: 10 }} />}
          {payout === 0 ? <span>{formatAmount(payout)}</span> : <span onClick={this.openMoneyCard}>{formatAmount(payout)}</span>}
          {payout !== 0 && (
            <Popover
              className="card"
              open={isOpenMoneyCard}
              anchorEl={this.state.moneyAnchor}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.closeCards}
            >
              <Payout content={content} />
            </Popover>
          )}
        </div>
        <div className="Voting__voters_list">
          {content.net_votes === 0 ? <span>{content.net_votes} votes</span> : <span onClick={this.openVoteCard}>{content.net_votes} votes</span>}
          {content.net_votes !== 0 && (
            <Popover
              className="card"
              open={isOpenVoteCard}
              anchorEl={this.state.voteAnchor}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.closeCards}
            >
              {lastVotesTooltipMsg}
            </Popover>
          )}
        </div>
      </div>
    )
  }
}
