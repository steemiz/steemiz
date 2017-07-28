import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PostCard from './PostCard';
import Toggle from 'material-ui/Toggle';
import { voteBegin } from './actions/vote';
import isEmpty from 'lodash/isEmpty';

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    vote: PropTypes.func.isRequired,
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

  vote(post) {
    if (!isEmpty(this.props.profile)) {
      this.props.vote(post);
    } else {
      console.log('Not logged');
    }
  }

  render() {
    const { posts, category } = this.props;
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
            category={category}
            styleShowColumn={this.state.styleShowColumn}
            vote={this.vote}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  vote: post => dispatch(voteBegin(post)),
});

export default connect(null, mapDispatchToProps)(PostList);
