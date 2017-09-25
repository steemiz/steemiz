import React, { PureComponent } from 'react';
import PostList from 'features/Post/PostList';

export default class Home extends PureComponent {
  render() {
    return (
      <PostList category="trending" subCategory="all" query={{ limit: 10 }} />
    );
  }
}
