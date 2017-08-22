import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedRelative } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import numeral from 'numeral';

export default class ProfileTransferHistory extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['curation', 'author']).isRequired,
    history: PropTypes.array.isRequired,
  };

  render() {
    const { type, history } = this.props;
    return (
      <div>
        <div className="tab__filter">
          <h3 className="tab__filter__text">
            {type} Rewards History
          </h3>
        </div>
        <div className="tab__result">
          {!isEmpty(history) && history.map((reward, index) => (
            <div key={index} className="history">
              <div className="timestamp">
                <FormattedRelative value={`${reward.timestamp}Z`} />
              </div>
              {type === 'curation' && (
                <Link className="history__text"
                      to={`/@${reward.comment_author}/${reward.comment_permlink}`}>
                  <span>{numeral(reward.steemPower).format('0,0.000')} STEEM POWER for</span>
                  {`${reward.comment_author}/${reward.comment_permlink}`}
                </Link>
              )}
              {type === 'author' && (
                <Link className="history__text" to={`/@${reward.author}/${reward.permlink}`}>
                  <span>
                    {reward.sbd_payout}, and {numeral(reward.steemPower).format('0,0.000')}
                    STEEM POWER for
                  </span>
                  {`${reward.author}/${reward.permlink}`}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
