import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from "utils/helpers/steemitHelpers";

export default function VotePayout({ vote, totalRshares, totalPayout }) {
  let value = vote.rshares / totalRshares * totalPayout;

  return (
    <span className="value">
      {value && formatAmount(value)}
    </span>
  );
}

VotePayout.propTypes = {
  vote: PropTypes.object.isRequired,
  totalRshares: PropTypes.number.isRequired,
  totalPayout: PropTypes.number.isRequired,
};
