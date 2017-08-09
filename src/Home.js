import React, { PureComponent } from 'react';
import PostList from './features/Post/PostList';

export default class Home extends PureComponent {
  componentWillReceiveProps(nextProps) {
    // POSTS BY CREATED IF CONNECTED
    /*if (isEmpty(this.props.postsFeed) && (nextProps.isConnected && this.props.isConnected !== true)) {
      this.props.getPostsBy('feed', { tag: 'aggroed', limit: 5 });
    }*/
  }

  render() {
    return (
      <PostList
        category="created"
        query={{ limit: 5 }}
      />
    );
  }
}
