import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { selectPostsByCat } from './selectors';
import { getPostsByBegin } from './actions/getPostsBy';
import { voteBegin } from '../Vote/actions/vote';
import { selectIsConnected, selectMyAccount } from '../User/selectors';
import PostCard from '../../components/PostCard';

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
    vote: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    account: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleChangeTypeShow = this.handleChangeTypeShow.bind(this);
    this.vote = this.vote.bind(this);
    this.state = {
      typeShowPostCard: 'row',
    };
  }

  componentDidMount() {
    // POSTS BY CATEGORY
    if (isEmpty(this.props.posts)) {
      this.props.getPostsBy(this.props.category, this.props.query);
    }
  }

  handleChangeTypeShow = (event, value) => {
    this.setState({
      typeShowPostCard: value,
    });
  };

  vote(post, weight, index) {
    const { category, isConnected, vote } = this.props;
    if (isConnected) {
      vote(post, weight, { type: 'post', category, index });
    } else {
      console.log('Not logged');
    }
  }

  render() {
    const { posts, category, account } = this.props;
    return (
      <div className="post_container clearfix">
        <div>
          <RadioButtonGroup
            name="typeShow"
            defaultSelected={this.state.typeShowPostCard}
            onChange={this.handleChangeTypeShow}
            className="clearfix"
            style={{margin: "0 0 1.5rem 0"}}
          >
            <RadioButton
              value="column"
              label="Type Column"
              style={{float: "left", width: "auto", "minWidth": "12rem"}}
              labelStyle={{color: "#999"}}
            />
            <RadioButton
              value="row"
              label="Type Row"
              style={{float: "left", width: "auto", "minWidth": "10rem"}}
              labelStyle={{color: "#999"}}
            />
            <RadioButton
              value=""
              label="Type Default"
              style={{float: "left", width: "auto", "minWidth": "12rem"}}
              labelStyle={{color: "#999"}}
            />
          </RadioButtonGroup>
        </div>
        {posts && posts.map((post, index) =>
          <PostCard
            key={post.id}
            post={post}
            index={index}
            account={account}
            category={category}
            styleShow={this.state.typeShowPostCard}
            vote={(post, weight) => this.vote(post, weight, index)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  posts: selectPostsByCat(props.category),
  isConnected: selectIsConnected(),
  account: selectMyAccount(),
});

const mapDispatchToProps = (dispatch, props) => ({
  getPostsBy: (category, query) => dispatch(getPostsByBegin(category, query)),
  vote: (post, weight, params) => dispatch(voteBegin(post, weight, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
