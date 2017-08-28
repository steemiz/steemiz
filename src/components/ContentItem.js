import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import extractDesc from 'utils/helpers/extractDesc';
import { FormattedRelative } from 'react-intl';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconSms from 'material-ui/svg-icons/notification/sms';

import Author from './Author';
import VoteButton from 'features/Vote/VoteButton';
import {
  calculateContentPayout,
  displayContentNbComments,
  formatAmount,
} from 'utils/helpers/steemitHelpers';
import { COLOR, COLOR_HOVER, SIZE_SMALL } from 'styles/icons';

export default class ContentItem extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf([
      'post', 'comment',
    ]).isRequired,
    content: PropTypes.object.isRequired,
  };

  render() {
    const { content, type } = this.props;
    const payout = calculateContentPayout(content);
    return (
      <div className="post_card">
        {type === 'post' && content.main_img && (
          <Link
            to={{ pathname: content.url, state: { postId: content.id } }}
            className="post_card__block post_card__block--img"
            style={{background: `url(${content.main_img}) no-repeat #eee center center / cover`}}
          />
        )}
        <div className="post_card__block post_card__block--content">
          <Link to={{ pathname: content.url, state: { postId: content.id } }} className="post_card__block">
            <h3>{content.title || content.root_title} ({content.id})</h3>
            <p>
              {extractDesc(content)}
            </p>
          </Link>
          <div className="post_card__block post_card__block--info">
            <div className="details">
              <VoteButton contentId={content.id} type={type} />
              <div className="price">
                {formatAmount(payout)}
              </div>
              <Link to="/" title="Favorites" className="social_area social_area--like">
                <IconFavorite color={COLOR} hoverColor={COLOR_HOVER} style={{ width: SIZE_SMALL, margin: '0 0.3rem' }} />
                <span>{content.net_votes}</span>
              </Link>
              <Link title="Responses" to={{ pathname: content.url, state: { postId: content.id } }} className="social_area social_area--comment">
                <IconSms color={COLOR} hoverColor={COLOR_HOVER} style={{ width: SIZE_SMALL, margin: '0 0.3rem' }} />
                <span>{displayContentNbComments(content)}</span>
              </Link>
            </div>
            <div className="info">
              <div className="author">
                <span>by </span>
                <Author name={content.author} reputation={content.author_reputation} />
              </div>
              <div className="datetime">
                <FormattedRelative value={`${content.created}Z`} /> in <Link to={`/trending/${content.category}`}>{content.category}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
