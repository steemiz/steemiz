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
import { getCommentsFromPostBegin } from '../Comment/actions/getCommentsFromPost';
import { selectCommentsChild, selectCommentsData, selectCommentsIsLoading } from '../Comment/selectors';
import { selectCurrentPost, selectCurrentComments } from './selectors';
import { getOnePostBegin, setCurrentPostId } from './actions/getOnePost';
import PostTags from './PostTags';
import PostFooter from './PostFooter';
import CommentPost from '../Comment/CommentPost';
import './PostRead.css';

class PostRead extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        postId: PropTypes.number,
      }),
    }).isRequired,
    getOnePost: PropTypes.func.isRequired,
    setCurrentPostId: PropTypes.func.isRequired,
    getCommentsFromPost: PropTypes.func.isRequired,
  };

  static defaultProps = {
    location: {
      state: undefined,
    }
  };

  componentDidMount() {
    const { post, location: { state }, match: { params : { author, permlink }} } = this.props;
    if (isEmpty(post)) {
      // FETCH POST
      this.props.getOnePost(author, permlink);
    } else if (state && state.postId) {
      // READING FROM INTERNAL LINK
      this.props.setCurrentPostId(state.postId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.currentComments) && nextProps.commentsIsLoading === false) {
      const { match: { params : { topic, author, permlink }}} = nextProps;
      this.props.getCommentsFromPost(topic, author, permlink);
    }
  }

  render() {
    const { post, currentComments, commentsData, commentsChild } = this.props;

    return (
      <div className="single_post_container clearfix">
        {!isEmpty(post) && (
          <div className="PostDetail">
            <div className="PostDetail__content">
              <article className="article">
                <div className="article__post">
                  <h1>{post.title}</h1>
                  <div className="article__post__author">
                    <AvatarSteemit name={post.author} />
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
              {!isEmpty(currentComments) && (
                <CommentPost
                  currentComments={currentComments}
                  commentsData={commentsData}
                  commentsChild={commentsChild}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = () => {
  return createStructuredSelector({
    post: selectCurrentPost(),
    commentsData: selectCommentsData(),
    commentsChild: selectCommentsChild(),
    currentComments: selectCurrentComments(),
    commentsIsLoading: selectCommentsIsLoading(),
  });
};

const mapDispatchToProps = dispatch => ({
  getOnePost: (author, permlink) => dispatch(getOnePostBegin(author, permlink)),
  setCurrentPostId: id => dispatch(setCurrentPostId(id)),
  getCommentsFromPost: (category, author, permlink) => dispatch(getCommentsFromPostBegin(category, author, permlink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostRead);
