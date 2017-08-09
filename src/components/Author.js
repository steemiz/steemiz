import React from 'react';
import PropTypes from 'prop-types';
import { formatter } from 'steem';
import { Link } from 'react-router-dom';

const Author = ({ name, reputation }) => {
  return (
    <div className="Author">
      <Link to={`/@${name}`}>
        <span className="Author__name">{name}</span>
      </Link>
      <span className="Author__reputation" title="Reputation">{formatter.reputation(reputation)}</span>
    </div>
  )
};

Author.propTypes = {
  name: PropTypes.string.isRequired,
  reputation: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default Author;
