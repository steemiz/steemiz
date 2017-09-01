import React, { PureComponent } from 'react';
import PostList from 'features/Post/PostList';

export default class TagPostList extends PureComponent {
  render() {
    const { match: { params: { category, tag }} } = this.props;
    return (
      <PostList category={category} query={{ limit: 10, tag: tag }} />
    );
  }
}
