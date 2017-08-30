import React, { PureComponent } from 'react';
import PostList from 'features/Post/PostList';

export default class TagPostList extends PureComponent {
  componentWillReceiveProps(nextProps) {

    // POSTS BY CREATED IF CONNECTED
    /*if (isEmpty(this.props.postsFeed) && (nextProps.isConnected && this.props.isConnected !== true)) {
      this.props.getPostsBy('feed', { tag: 'aggroed', limit: 5 });
    }*/
  }

  render() {
    const { match: { params: { category, tag }} } = this.props;
    console.log(this.props.match);
    return (
      <PostList category={category} query={{ limit: 10, tag: tag }} />
    );
  }
}
