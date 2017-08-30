import React from 'react';
import PropTypes from 'prop-types';
import { FormattedRelative } from 'react-intl';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

const Reward = ({ reward, type }) => {
  return (
    <div className="history">
      <div className="timestamp">
        <FormattedRelative value={`${reward.timestamp}Z`} />
      </div>
      {type === 'curation' && (
        <Link className="history__text"
              to={`/trending/@${reward.comment_author}/${reward.comment_permlink}`}>
          <span>{numeral(reward.steemPower).format('0,0.000')} STEEM POWER for</span>
          {`${reward.comment_author}/${reward.comment_permlink}`}
        </Link>
      )}
      {type === 'author' && (
        <Link className="history__text" to={`/trending/@${reward.author}/${reward.permlink}`}>
          <span>
            {reward.sbd_payout}, and {numeral(reward.steemPower).format('0,0.000')} STEEM POWER for
          </span>
          {`${reward.author}/${reward.permlink}`}
        </Link>
      )}
    </div>
  )
};

Reward.propTypes = {
  reward: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default Reward;
