import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import numeral from 'numeral';
import { FormattedRelative } from 'react-intl';

import { calculatePayout } from "../../utils/helpers/steemitHelpers";

const AmountWithLabel = ({ label, amount }) => (
  isNumber(amount)
    ? <div>{label}: {numeral(amount).format('$0,0.00')}</div>
    : null
);

export default class Payout extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired
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
    } = calculatePayout(this.props.post);

    return (
      <div>
        {payoutLimitHit && <div>Payout limit reached on this post</div>}
        <AmountWithLabel label="Potential Payout" amount={potentialPayout} />
        <AmountWithLabel label="Promoted" amount={promotionCost} />
        {!isPayoutDeclined && cashoutInTime &&
        <div>Will release <FormattedRelative value={cashoutInTime} /></div>}
        {isPayoutDeclined && <div>Declined Payout</div>}
        <AmountWithLabel label="Max Accepted Payout" amount={maxAcceptedPayout} />
        <AmountWithLabel label="Total Past Payouts" amount={pastPayouts} />
        <AmountWithLabel label="Authors Payout" amount={authorPayouts} />
        <AmountWithLabel label="Curators Payout" amount={curatorPayouts} />
      </div>
    );
  }
}
