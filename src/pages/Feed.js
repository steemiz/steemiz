import React, { PureComponent } from 'react';
import PostList from 'features/Post/PostList';

export default class Feed extends PureComponent {
  render() {
    return (
      <PostList category="feed" query={{ limit: 10, tag: this.props.match.params.accountName }} />
    );
  }
}
