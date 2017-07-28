import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

const PostTags = ({ post }) => {
  return (
    <div>
      {post.json_metadata.tags &&
        <div>
          {post.json_metadata.tags.map(tag => <Chip key={tag}>{tag}</Chip>)}
        </div>
      }
    </div>
  )
};

PostTags.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostTags;
