import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostTags = ({ post }) => {
  return (
    <div className="TagList">
      {post.json_metadata.tags.map(tag => <Link key={tag} to={`/trending/${tag}`} className="TagList__tag">{tag}</Link>)}
    </div>
  )
};

PostTags.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostTags;
