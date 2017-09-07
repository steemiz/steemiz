import React, { PureComponent } from 'react';
import PostList from 'features/Post/PostList';

export default class Category extends PureComponent {
  render() {
    const { match: { params: { category }} } = this.props;
    return (
      <PostList category={category} query={{ limit: 10 }} />
    );
  }
}
