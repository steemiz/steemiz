import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import Body from 'components/Body';
import AvatarSteemit from 'components/AvatarSteemit';
import Author from 'components/Author';
import InfiniteList from 'components/InfiniteList';
import CommentItem from 'features/Comment/CommentItem';
import { getCommentsFromPostBegin } from 'features/Comment/actions/getCommentsFromPost';
import { selectCommentsChild, selectCommentsData, selectCommentsIsLoading } from 'features/Comment/selectors';
import { selectIsConnected } from 'features/User/selectors';
import { selectCurrentPost, selectCurrentComments } from './selectors';
import { getOnePostBegin, setCurrentPostId } from './actions/getOnePost';
import PostTags from './components/PostTags';
import PostFooter from './components/PostFooter';
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
    isConnected: PropTypes.bool.isRequired,
    post: PropTypes.object,
    commentsData: PropTypes.object.isRequired,
    commentsChild: PropTypes.object.isRequired,
    currentComments: PropTypes.object,
    commentsIsLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    location: {
      state: undefined,
    }
  };

  constructor() {
    super();
    this.state = {
      nbCommentsDisplayed: 10,
    };
  }

  componentDidMount() {
    const { match: { params : { author, permlink }} } = this.props;
    this.props.getOnePost(author, permlink);
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.currentComments) && nextProps.commentsIsLoading === false) {
      const { match: { params : { topic, author, permlink }}} = nextProps;
      this.props.getCommentsFromPost(topic, author, permlink);
    }
  }

  componentWillUnmount() {
    this.props.setCurrentPostId(undefined);
  }

  addMoreComments = () => {
    this.setState({
      nbCommentsDisplayed: this.state.nbCommentsDisplayed + 10,
    });
  };

  render() {
    const { post, currentComments, commentsData, commentsChild, commentsIsLoading, isConnected } = this.props;
    const { nbCommentsDisplayed } = this.state;
    let listComments, listCommentsDisplayed = [];
    if (!isEmpty(currentComments)) {
      listComments = currentComments.list;
      listCommentsDisplayed = listComments.slice(0, nbCommentsDisplayed);
    }
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
            {!isConnected && (
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
            )}
            <div className={`PostDetail__large ${isConnected ? 'border_top' : ''}`}>
              <InfiniteList
                list={listCommentsDisplayed}
                hasMore={listComments && listComments.length > nbCommentsDisplayed}
                isLoading={commentsIsLoading}
                loadMoreCb={this.addMoreComments}
                itemMappingCb={commentId =>
                  <CommentItem
                    key={commentId}
                    comment={commentsData[commentId]}
                    commentsData={commentsData}
                    commentsChild={commentsChild}
                  />}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = () => createStructuredSelector({
  post: selectCurrentPost(),
  commentsData: selectCommentsData(),
  commentsChild: selectCommentsChild(),
  currentComments: selectCurrentComments(),
  commentsIsLoading: selectCommentsIsLoading(),
  isConnected: selectIsConnected(),
});

const mapDispatchToProps = dispatch => ({
  getOnePost: (author, permlink) => dispatch(getOnePostBegin(author, permlink)),
  setCurrentPostId: id => dispatch(setCurrentPostId(id)),
  getCommentsFromPost: (category, author, permlink) => dispatch(getCommentsFromPostBegin(category, author, permlink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostRead);
