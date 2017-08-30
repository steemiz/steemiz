import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedRelative } from 'react-intl';

const UserVote = ({ vote, type }) => {
  return (
    <li>
      <div className="timestamp">
        <FormattedRelative value={`${vote.timestamp}Z`} />
      </div>
      <div className="author">{type === 'received' ? vote.voter : vote.author}</div>
      <div className="source">
        <Link to={`/trending/@${vote.author}/${vote.permlink}`}>{`${vote.author}/${vote.permlink}`}</Link>
      </div>
    </li>
  )
};

UserVote.propTypes = {
  vote: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['given', 'received']).isRequired,
};

export default UserVote;
