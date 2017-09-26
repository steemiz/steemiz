import React from 'react';
import PostList from 'features/Post/PostList';
import { Helmet } from 'react-helmet';

export default function Feed(props) {
  const { match: { params: { accountName }} } = props;
  return (
    <div>
      <Helmet>
        <title>{`Feed | @${accountName}`}</title>
      </Helmet>
      <PostList category="feed" subCategory={accountName} query={{ limit: 10, tag: accountName }} />
    </div>
  );
}
