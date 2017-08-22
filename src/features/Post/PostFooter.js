import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from 'material-ui';
import { FormattedRelative } from 'react-intl';

import ContentPayoutAndVotes from '../../components/ContentPayoutAndVotes';
import Author from '../../components/Author';
import { displayContentNbComments } from '../../utils/helpers/steemitHelpers';

const PostFooter = ({ post }) => {
  return (
    <div className="article__footer">
      <div className="article__footer__left">
        <div className="time_author">
          <i className="time_author__icon material-icons">watch_later</i>
          <span className="timestamp">
            <FormattedRelative value={`${post.created}Z`} />
          </span>
          <span>by</span>
          <Author name={post.author} reputation={post.author_reputation} />
        </div>
        <ContentPayoutAndVotes type="post" content={post} />
      </div>

      <div className="article__footer__right">
        <div className="btn_resteem" title="Resteem">
          <IconButton>
            <i className="fa fa-exchange" />
          </IconButton>
        </div>
        <div>
          <span className="btn_reply" title="Reply" onClick={this.handleReply}>Reply</span>
        </div>
        <div>
          <Link to="" title="Responses">
            <i className="fa fa-comments" />
            {displayContentNbComments(post)}
          </Link>
          {/* No page view method in api */}
          {/*<Link to="" title="Views"><i className="fa fa-eye" />186</Link>*/}
        </div>
        <div>
          <Link to="#" target="_blank" title="Share on Facebook"><i
            className="fa fa-facebook-square" /></Link>
          <Link to="#" target="_blank" title="Share on Twitter"><i
            className="fa fa-twitter-square" /></Link>
          <Link to="#" target="_blank" title="Share on Linkedin"><i
            className="fa fa-linkedin-square" /></Link>
        </div>
      </div>
    </div>
  )
};

PostFooter.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostFooter;
