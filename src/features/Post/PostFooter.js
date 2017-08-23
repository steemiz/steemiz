import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedRelative } from 'react-intl';
import IconWatch from 'material-ui/svg-icons/action/watch-later';
import IconExchange from 'react-icons/lib/fa/exchange';
import IconFb from 'react-icons/lib/fa/facebook-square';
import IconTwitter from 'react-icons/lib/fa/twitter-square';
import IconLinked from 'react-icons/lib/fa/linkedin-square';
import IconComments from 'react-icons/lib/fa/comments';

import ContentPayoutAndVotes from 'components/ContentPayoutAndVotes';
import Author from 'components/Author';
import { displayContentNbComments } from 'utils/helpers/steemitHelpers';
import { COLOR, SIZE_SMALL } from 'styles/icons';

const PostFooter = ({ post }) => {
  return (
    <div className="article__footer">
      <div className="article__footer__left">
        <div className="time_author">
          <IconWatch color={COLOR} style={{ width: SIZE_SMALL }} />
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
          <IconExchange size={SIZE_SMALL} />
        </div>
        <div>
          <span className="btn_reply" title="Reply" onClick={this.handleReply}>Reply</span>
        </div>
        <div className="responses">
          <Link to="#">
            <IconComments size={SIZE_SMALL} />
            {displayContentNbComments(post)}
          </Link>
          {/* No page view method in api */}
          {/*<Link to="" title="Views"><i className="fa fa-eye" />186</Link>*/}
        </div>
        <div>
          <Link to="#" target="_blank" title="Share on Facebook">
            <IconFb size={SIZE_SMALL} />
          </Link>
          <Link to="#" target="_blank" title="Share on Twitter">
            <IconTwitter size={SIZE_SMALL} />
          </Link>
          <Link to="#" target="_blank" title="Share on Linkedin">
            <IconLinked size={SIZE_SMALL} />
          </Link>
        </div>
      </div>
    </div>
  )
};

PostFooter.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostFooter;
