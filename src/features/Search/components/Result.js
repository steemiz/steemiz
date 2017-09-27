import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedRelative } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconSms from 'material-ui/svg-icons/notification/sms';

import VoteButton from 'features/Vote/VoteButton';
import Author from 'components/Author';
import CircularProgress from 'components/CircularProgress';
import { COLOR, COLOR_HOVER, SIZE_SMALL } from 'styles/icons';
import {
  formatAmount,
} from 'utils/helpers/steemitHelpers';

const Result = ({ content }) => {
  const mainTag = content.tags[0];
  const contentLink = `/${mainTag}/@${content.author}/${content.permlink}`;
  const pending = content.pending_payout_value || 0;
  const total = (!isEmpty(content.total_payout_value) && content.total_payout_value.amount) ? content.total_payout_value.amount : 0;
  const payout = pending + total;
  return (
    <div className="post_card">
      {content.main_img && (
        <Link
          to={contentLink}
          className="post_card__block post_card__block--img"
          style={{background: `url(${content.main_img}) no-repeat #eee center center / cover`}}
        />
      )}
      <div className={`post_card__block post_card__block--content full`}>
        <Link to={contentLink} className="post_card__block">
          <h3>{content.title}</h3>
        </Link>
        <Link to={contentLink} className="post_card__block">
          <p>{content.summary}</p>
        </Link>
        <div className="post_card__block post_card__block--info">
          <div className="details">
            {/*<VoteButton content={content} type="post" />*/}
            <div className="price">
              {content.isUpdating && <CircularProgress size={20} thickness={3} style={{ marginRight: 10 }} />}
              {formatAmount(payout)}
            </div>
            <Link to="/" title="Favorites" className="social_area social_area--like">
              <IconFavorite color={COLOR} hoverColor={COLOR_HOVER} style={{ width: SIZE_SMALL, margin: '0 0.3rem' }} />
              <span>{content.net_votes}</span>
            </Link>
            <Link title="Responses" to={contentLink} className="social_area social_area--comment">
              <IconSms color={COLOR} hoverColor={COLOR_HOVER} style={{ width: SIZE_SMALL, margin: '0 0.3rem' }} />
              <span>{content.children}</span>
            </Link>
          </div>
          <div className="info">
            <div className="author">
              <span>by </span>
              <Author name={content.author} />
            </div>
            <div className="datetime">
              <FormattedRelative value={`${content.created}Z`} /> in <Link to={`/trending/${mainTag}`}>{mainTag}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Result.propTypes = {
  //prop: PropTypes.array.isRequired
};

export default Result;
