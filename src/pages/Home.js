import React from 'react';
import PostList from 'features/Post/PostList';

export default function Home(props) {
  return (
    <PostList category="trending" subCategory="all" query={{ limit: 10 }} />
  );
}
