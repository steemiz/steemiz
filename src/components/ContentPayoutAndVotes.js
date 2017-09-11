import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      payoutCard: false,
      voteCard: false,
    };
  }

  handleViewMoneyCard = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      payoutCard: !this.state.payoutCard,
    })
  };

  handleViewVoteCard = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    if (this.props.content.net_votes <= 0) {
      return;
    }

    this.setState({
      voteCard: !this.state.voteCard,
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
    const lastVotesTooltipMsg = fiveLastVotes.map(vote => (
      <li key={vote.voter}>
        <Link to={`/@${vote.voter}`}>{vote.voter}</Link>
      </li>
    ));
    if (lastVotesTooltipMsg.length === 5) lastVotesTooltipMsg.push(<li key="...">...</li>);

    return (
      <div className="Voting">
        <div className="Voting__button">
          <VoteButton content={content} type={type} />
        </div>
        <div className="Voting__money">
          {content.isUpdating && <CircularProgress size={20} thickness={3} style={{ marginRight: 10 }} />}
          <span onClick={this.handleViewMoneyCard}>{formatAmount(payout)}</span>
          {payoutCard && (
            <div className="CardBox MoneyCard">
              <Payout content={content} />
            </div>
          )}
        </div>
        <div className="Voting__voters_list">
          <span onClick={this.handleViewVoteCard}>{content.net_votes} votes</span>
          {voteCard && (
            <div className="CardBox VoteCard">
              <ul>
                {lastVotesTooltipMsg}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}
