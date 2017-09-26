import React from 'react';
import PropTypes from 'prop-types';
import PostList from 'features/Post/PostList';
import titleWrapper from 'titleWrapper';

const ProfileBlog = ({ match: { params: { accountName }} }) => {
  return (
    <PostList category="blog" subCategory={accountName} query={{ limit: 10, tag: accountName }} />
  )
};

ProfileBlog.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      accountName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default titleWrapper(ProfileBlog, 'Blog');
