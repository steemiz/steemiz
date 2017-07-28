import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { getDownvotes, getUpvotes, sortVotes } from '../../utils/helpers/voteHelpers';
import isEmpty from 'lodash/isEmpty';

const PostFooter = ({ post }) => {
  let numberOfComments, numberOfLikes, numberOfDislikes, payout, pendingPayoutValue, totalPayoutValue;
  if (!isEmpty(post)) {
    pendingPayoutValue = parseFloat(post.pending_payout_value);
    totalPayoutValue = parseFloat(post.total_payout_value);
    payout = totalPayoutValue || pendingPayoutValue;
    payout = numeral(payout).format('$0,0.00');
    numberOfComments = numeral(post.children).format('0,0');
    numberOfLikes = numeral(post.active_votes.filter(vote => vote.percent > 0).length).format('0,0');
    numberOfDislikes = numeral(post.active_votes.filter(vote => vote.percent < 0).length).format('0,0');

    const fiveLastUpvotes =
      sortVotes(getUpvotes(post.active_votes), 'rshares')
        .reverse()
        .slice(0, 5);
    const likesTooltipMsg = fiveLastUpvotes.map(vote => `${vote.voter}\n`);
    if (likesTooltipMsg.length === 5) likesTooltipMsg.push('...');

    const fiveLastDownvotes =
      sortVotes(getDownvotes(post.active_votes), 'rshares')
        .reverse()
        .slice(0, 5);
    const dislikesTooltipMsg = fiveLastDownvotes.map(vote => `${vote.voter}\n`);
    if (dislikesTooltipMsg.length === 5) dislikesTooltipMsg.push('...');
  }
  return (
    <div>
      {post.json_metadata.tags &&
        <ul>
          <li>{payout}</li>
          <li>{numberOfLikes}</li>
          <li>{numberOfDislikes}</li>
          <li>{numberOfComments}</li>
        </ul>
      }
    </div>
  )
};

PostFooter.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostFooter;
