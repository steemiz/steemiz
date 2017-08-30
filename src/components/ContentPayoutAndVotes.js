import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover';

import { getUpvotes, sortVotes } from 'utils/helpers/voteHelpers';
import Payout from 'features/Comment/Payout';
import VoteButton from 'features/Vote/VoteButton';
import { calculateContentPayout, formatAmount } from 'utils/helpers/steemitHelpers';

export default class ContentPayoutAndVotes extends Component {
  static propTypes = {
    content: PropTypes.object.isRequired, // Post or comment
    type: PropTypes.oneOf(['post', 'comment']).isRequired, // post or comment
  };

  constructor(props) {
    super(props);

    this.state = {
      payoutCard: {
        open: false
      },
      voteCard: {
        open: false
      },
    };
  }

  handleViewMoneyCard = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      payoutCard: {
        open: true,
        anchorEl: event.currentTarget,
      }
    })
  };

  handleCloseMoneyCard = () => {
    this.setState({
      payoutCard: {
        open: false,
      }
    })
  };


  handleViewVoteCard = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    if (this.props.content.net_votes <= 0) {
      return;
    }

    this.setState({
      voteCard: {
        open: true,
        anchorEl: event.currentTarget,
      }
    })
  };

  handleCloseVoteCard = () => {
    this.setState({
      voteCard: {
        open: false,
      }
    })
  };

  render() {
    const { content, type } = this.props;
    const { payoutCard, voteCard } = this.state;

    const payout = calculateContentPayout(content);

    const fiveLastVotes =
      sortVotes(getUpvotes(content.active_votes), 'rshares')
        .reverse()
        .slice(0, 5);
    const lastVotesTooltipMsg = fiveLastVotes.map(vote => <li key={vote.voter}><Link
      to={`/@${vote.voter}`}>{vote.voter}</Link></li>);
    if (lastVotesTooltipMsg.length === 5) lastVotesTooltipMsg.push(<li key="...">...</li>);

    return (
      <div className="Voting">
        <div className="Voting__button">
          <VoteButton content={content} type={type} />
        </div>
        <div className="Voting__money">
          <span onClick={this.handleViewMoneyCard}>{formatAmount(payout)}</span>
          <Popover
            open={payoutCard.open}
            anchorEl={payoutCard.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleCloseMoneyCard}
          >
            <div className="MoneyCard">
              <Payout content={content} />
            </div>
          </Popover>
        </div>
        <div className="Voting__voters_list">
          <span onClick={this.handleViewVoteCard}>{content.net_votes} votes</span>
          <Popover
            open={voteCard.open}
            anchorEl={voteCard.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleCloseVoteCard}
          >
            <div className="VoteCard">
              <ul>
                {lastVotesTooltipMsg}
              </ul>
            </div>
          </Popover>
        </div>
      </div>
    )
  }
}
