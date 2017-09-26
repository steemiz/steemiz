import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedRelative } from 'react-intl';

import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconSms from 'material-ui/svg-icons/notification/sms';

import Author from 'components/Author';
import { COLOR, COLOR_HOVER, SIZE_SMALL } from 'styles/icons';

const Result = ({ content }) => {
  const mainTag = content.tags[0];
  return (
    <div className="post_card">
      <div className={`post_card__block post_card__block--content full`}>
        <Link to={{ pathname: `/${mainTag}/@${content.author}/${content.permlink}` }} className="post_card__block">
          <h3>{content.title}</h3>
        </Link>
        <Link to={{ pathname: `/${mainTag}/@${content.author}/${content.permlink}` }} className="post_card__block">
          <p>{content.summary}</p>
        </Link>
        <div className="post_card__block post_card__block--info">
          <div className="details">
            <Link to="/" title="Favorites" className="social_area social_area--like" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <IconFavorite color={COLOR} hoverColor={COLOR_HOVER} style={{ width: SIZE_SMALL, margin: '0 0.3rem' }} />
              <span>{content.net_votes}</span>
            </Link>
            <Link title="Responses" to={{ pathname: `/${mainTag}/@${content.author}/${content.permlink}` }} className="social_area social_area--comment">
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
