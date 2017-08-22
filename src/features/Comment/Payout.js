import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import { FormattedRelative } from 'react-intl';

import { calculatePayout, formatAmount } from "../../utils/helpers/steemitHelpers";

const AmountWithLabel = ({ label, amount }) => (
  isNumber(amount)
    ? <div>{label}: {formatAmount(amount)}</div>
    : null
);

export default class Payout extends PureComponent {
  static propTypes = {
    content: PropTypes.object.isRequired
  };

  render() {
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
    } = calculatePayout(this.props.content);

    return (
      <div>
        {payoutLimitHit && <div>Payout limit reached on this post</div>}
        <AmountWithLabel label="Potential Payout" amount={potentialPayout} />
        <AmountWithLabel label="Promoted" amount={promotionCost} />
        {!isPayoutDeclined && cashoutInTime &&
        <div>Will release <FormattedRelative value={`${cashoutInTime}Z`} /></div>}
        {isPayoutDeclined && <div>Declined Payout</div>}
        <AmountWithLabel label="Max Accepted Payout" amount={maxAcceptedPayout} />
        <AmountWithLabel label="Total Past Payouts" amount={pastPayouts} />
        <AmountWithLabel label="Authors Payout" amount={authorPayouts} />
        <AmountWithLabel label="Curators Payout" amount={curatorPayouts} />
      </div>
    );
  }
}
