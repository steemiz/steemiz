import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import Body from '../../components/Body';
import AvatarSteemit from '../../components/AvatarSteemit';
import Author from '../../components/Author';
import { selectPostFromCategory, selectRead } from './selectors';
import { getOnePostBegin } from './actions/getOnePost';
import PostTags from './PostTags';
import PostFooter from './PostFooter';
import CommentPost from '../Comment/CommentPost';
import './PostRead.css';

class PostRead extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        category: PropTypes.string,
        index: PropTypes.number,
      }),
    }).isRequired,
    getOnePost: PropTypes.func.isRequired,
  };

  static defaultProps = {
    location: {
      state: undefined,
    }
  };

  componentDidMount() {
    if (isEmpty(this.props.postFromList)) {
      const { author, permlink } = this.props.match.params;
      this.props.getOnePost(author, permlink);
    }
  }

  render() {
    const { postFromList, read } = this.props;
    let post = !isEmpty(postFromList) ? postFromList : read;

    return (
      <div>
        {!isEmpty(post) && (
          <div className="single_post_container clearfix">
            <div className="PostDetail">
              <div className="PostDetail__content">
                <article className="article">
                  <div className="article__post">
                    <h1>{post.title}</h1>
                    <div className="article__post__author">
                      <AvatarSteemit author={post.author} />
                      <Author name={post.author} reputation={post.author_reputation} />
                      <span>in</span>
                      <Link className="article__post__author__link" to="#">{post.category}</Link>
                    </div>
                    <div className="article__content">
                      <Body post={post} jsonMetadata={post.json_metadata} />
                    </div>
                  </div>
                </article>
              </div>
              <div className="PostDetail__large">
                {post.json_metadata.tags ? <PostTags post={post} /> : <div />}
                <PostFooter post={post} />
              </div>
              <div className="PostDetail__signup">
                <p>Authors get paid when people like you upvote their post.</p>
                <p>Join our amazing community to comment and reward others.</p>
                <Link to="/signup">
                  <RaisedButton
                    label="Sign up now to receive FREE STEEM"
                    primary={true}
                    labelStyle={{ textTransform: 'initial' }}
                    buttonStyle={{ background: "#368dd2" }}
                  >
                  </RaisedButton>
                </Link>
              </div>
              <div className="PostDetail__large">
                <CommentPost post={post} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { location } = props;
  const category = location.state && location.state.category ? location.state.category : '';
  const index = location.state && location.state.index !== undefined ? location.state.index : '';
  return createStructuredSelector({
    postFromList: selectPostFromCategory(category, index),
    read: selectRead(),
  });
};

const mapDispatchToProps = dispatch => ({
  getOnePost: (author, permlink) => dispatch(getOnePostBegin(author, permlink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostRead);
