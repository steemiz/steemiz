import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover';
import numeral from 'numeral';

import { getUpvotes, sortVotes } from '../utils/helpers/voteHelpers';
import Payout from '../features/Comment/Payout';
import VoteButton from '../features/Vote/VoteButton';

export default class ContentPayoutAndVotes extends PureComponent {
  static propTypes = {
    content: PropTypes.object.isRequired, // Post or comment
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
    const { content } = this.props;
    const { payoutCard, voteCard } = this.state;

    const pendingPayoutValue = parseFloat(content.pending_payout_value);
    const totalPayoutValue = parseFloat(content.total_payout_value);
    const payout = totalPayoutValue || pendingPayoutValue;

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
          <VoteButton content={content} type="comment" />
        </div>
        <div className="Voting__money">
          <span onClick={this.handleViewMoneyCard}>{numeral(payout).format('$0,0.000')}</span>
          <Popover
            open={payoutCard.open}
            anchorEl={payoutCard.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleCloseMoneyCard}
          >
            <div className="MoneyCard">
              <Payout post={content} />
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
