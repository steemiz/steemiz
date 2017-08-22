import React from 'react';
import PropTypes from 'prop-types';
import PostList from '../Post/PostList';

const ProfileBlog = ({ match: { params: { accountName }} }) => {
  return (
    <PostList category="blog" query={{ limit: 5, tag: accountName }} />
  )
};

ProfileBlog.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      accountName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProfileBlog;
