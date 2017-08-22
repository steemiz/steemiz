import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import truncate from 'lodash/truncate';
import striptags from 'striptags';
import { FormattedRelative } from 'react-intl';
import ReactMarkdown from 'react-markdown';

import Author from './Author';
import VoteButton from '../features/Vote/VoteButton';
import {
  calculateContentPayout,
  displayContentNbComments,
  formatAmount,
} from '../utils/helpers/steemitHelpers';

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
        <div className="post_card__block post_card__block--content">
          <Link to={{ pathname: content.url, state: { postId: content.id } }} className="post_card__block">
            <h3>{content.title || content.root_title} ({content.id})</h3>
            <ReactMarkdown source={truncate(striptags(content.body), { length: 250, separator: ' ' })}
                           disallowedTypes={['Image', 'Link', 'Heading', 'BlockQuote', 'ThematicBreak', 'List', 'Item']} />
          </Link>
          <div className="post_card__block post_card__block--info">
            <div className="details">
              <VoteButton contentId={content.id} type={type} />
              <div className="price">
                {formatAmount(payout)}
              </div>
              <Link to="/" title="Favorites" className="social_area social_area--like">
                <i className="material-icons">favorite</i>
                <span>{content.net_votes}</span>
              </Link>
              <Link title="Responses" to={{ pathname: content.url, state: { postId: content.id } }} className="social_area social_area--comment">
                <i className="material-icons">sms</i>
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
