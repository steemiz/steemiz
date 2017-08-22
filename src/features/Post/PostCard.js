import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import truncate from 'lodash/truncate';
import striptags from 'striptags';
import { FormattedRelative } from 'react-intl';
import ReactMarkdown from 'react-markdown';

import Author from '../../components/Author';
import VoteButton from '../Vote/VoteButton';
import {
  calculateContentPayout,
  displayContentNbComments,
  formatAmount,
  hasVoted
} from '../../utils/helpers/steemitHelpers';

const PostCard = ({ me, post, styleShow = '' }) => {
  const payout = calculateContentPayout(post);
  return (
    <div className="post_card" data-style={styleShow}>
      <Link to={{ pathname: post.url, state: { postId: post.id } }} className="post_card__block post_card__block--img" style={{background: `url(${post.main_img}) no-repeat #999 center center / cover`}}/>
      <div className="post_card__block post_card__block--content">
        <Link to={{ pathname: post.url, state: { postId: post.id } }} className="post_card__block">
          <h3>{post.title}</h3>
          <ReactMarkdown source={truncate(striptags(post.body), { length: 250, separator: ' ' })}
                         disallowedTypes={['Image', 'Link', 'Heading', 'BlockQuote', 'ThematicBreak', 'List', 'Item']} />
        </Link>
        <div className="post_card__block post_card__block--info">
          <div className="details">
            <VoteButton contentId={post.id} type="post" />
            <div className="price">
              {formatAmount(payout)}
            </div>
            <Link to="/" title="Favorites" className="social_area social_area--like">
              <i className="material-icons">favorite</i>
              <span>{post.net_votes}</span>
            </Link>
            <Link title="Responses" to={{ pathname: post.url, state: { postId: post.id } }} className="social_area social_area--comment">
              <i className="material-icons">sms</i>
              <span>{displayContentNbComments(post)}</span>
            </Link>
          </div>
          <div className="info">
            <div className="author">
              <span>by </span>
              <Author name={post.author} reputation={post.author_reputation} />
            </div>
            <div className="datetime">
              <FormattedRelative value={`${post.created}Z`} /> in <Link to={`/trending/${post.category}`}>{post.category}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PostCard;

PostCard.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object, // post
  styleShow: PropTypes.string, // view all postcard with grid column of grid row
  vote: PropTypes.func, // function to handle button go ahead
};
