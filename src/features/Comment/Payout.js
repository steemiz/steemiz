import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import { FormattedRelative } from 'react-intl';

import { calculatePayout, formatAmount } from "utils/helpers/steemitHelpers";

const AmountWithLabel = ({ label, amount }) => (
  isNumber(amount)
    ? <div>{label}: <strong>{formatAmount(amount)}</strong></div>
    : null
);

function Payout(props) {
  const {
    payoutLimitHit,
    potentialPayout,
    promotionCost,
    cashoutInTime,
    isPayoutDeclined,
    maxAcceptedPayout,
    pastPayouts,
    authorPayouts,
    curatorPayouts,
  } = calculatePayout(props.content);

  return (
    <div>
      {payoutLimitHit && <div>Payout limit reached on this post</div>}
      <AmountWithLabel label="Potential Payout" amount={potentialPayout} />
      <AmountWithLabel label="Promoted" amount={promotionCost} />
      {!isPayoutDeclined && cashoutInTime &&
      <div>Will release <strong><FormattedRelative value={`${cashoutInTime}Z`} /></strong></div>}
      {isPayoutDeclined && <div>Declined Payout</div>}
      <AmountWithLabel label="Max Accepted Payout" amount={maxAcceptedPayout} />
      <AmountWithLabel label="Total Past Payouts" amount={pastPayouts} />
      <AmountWithLabel label="Authors Payout" amount={authorPayouts} />
      <AmountWithLabel label="Curators Payout" amount={curatorPayouts} />
    </div>
  );
}

Payout.propTypes = {
  content: PropTypes.object.isRequired
};

export default Payout;