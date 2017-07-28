import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PostCard from './PostCard';
import Toggle from 'material-ui/Toggle';

class PostList extends PureComponent {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    vote: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleStyleShow = this.toggleStyleShow.bind(this);
    this.vote = this.vote.bind(this);
    this.state = {
      styleShowColumn: true,
    };
  }

  toggleStyleShow() {
    this.setState(state => {
      state.styleShowColumn = !state.styleShowColumn
    })
  };

  vote(post, index) {
    const { category, isConnected, vote } = this.props;
    console.log('index', index);
    if (isConnected) {
      vote(post, category, index);
    } else {
      console.log('Not logged');
    }
  }

  render() {
    const { posts, category, username } = this.props;
    return (
      <div className="post_container clearfix">
        <div>
          <Toggle
            label="Toggled style show"
            defaultToggled={true}
            onToggle={this.toggleStyleShow}
          />
        </div>
        {posts && posts.map((post, index) =>
          <PostCard
            key={post.id}
            post={post}
            index={index}
            username={username}
            category={category}
            styleShowColumn={this.state.styleShowColumn}
            vote={() => this.vote(post, index)}
          />
        )}
      </div>
    );
  }
}


export default PostList;
