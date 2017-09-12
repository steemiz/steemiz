import React from 'react';
import PostList from 'features/Post/PostList';

export default function Feed(props) {
  const { match: { params: { accountName }} } = props;
  return (
    <PostList category="feed" query={{ limit: 10, tag: accountName }} />
  );
}
