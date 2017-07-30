import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import truncate from 'lodash/truncate';
import striptags from 'striptags';
import ReactMarkdown from 'react-markdown';

const PostCard = ({ className = "", account, post, styleShowColumn = null, vote, category, index }) => {
  return (
    <div className={`post_card ${className}`} data-style={styleShowColumn ? "column" : ""}>
      <Link to={'/test'} className="post_card__block post_card__block--img">
        {post.main_img && <img src={`https://steemitimages.com/256x512/${post.main_img}`} alt="" />}
      </Link>
      <div className="post_card__block post_card__block--content">
        <Link to={{ pathname: post.url, state: { category: category, index: index } }}
              className="post_card__block">
          <h3>{post.title}</h3>
          <ReactMarkdown source={truncate(striptags(post.body), { length: 250, separator: ' ' })}
                         disallowedTypes={['Image', 'Link', 'Heading', 'BlockQuote', 'ThematicBreak', 'List', 'Item']} />
        </Link>
        <div className="post_card__block post_card__block--info">
          <div className="float_right">
            <div className="author float_left">
              <p><span>by </span> {post.author} <i>{post.author_reputation}</i></p>
            </div>
            <div className="datetime float_left">
              <p>{post.created} in <Link to={post.category}>{post.category}</Link></p>
            </div>
          </div>
          <div className="details float_right">
            {!post.active_votes.find(vote => vote.voter === account.name) ? (
              <button className="btn_go_ahead">
                <i className="material-icons" onClick={() => vote(post, account.voting_power)}>arrow_upward</i>
              </button>
            ) : (
              <button className="btn_go_ahead active">
                <i className="material-icons" onClick={() => vote(post, 0)}>arrow_upward</i>
              </button>
            )}
            <div className="price"><span>$</span>{post.price}</div>
            <div className="social_area social_area--like">
              <i className="material-icons">favorite</i>
              <span>{post.like}</span>
            </div>
            <div className="social_area social_area--comment">
              <i className="material-icons">sms</i>
              <span>{post.comment}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PostCard

PostCard.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object, // post
  styleShowColumn: PropTypes.bool, // view all postcard with grid column of grid row
  vote: PropTypes.func, // function to handle button go ahead
};
