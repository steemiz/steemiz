import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Body from '../../components/Body';
import { selectPostFromCategory, selectRead } from './selectors';
import { getOnePostBegin } from './actions/getOnePost';
import isEmpty from 'lodash/isEmpty';

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
        <h1>{post.title}</h1>
        {!isEmpty(post) && (
          <Body body={post.body} jsonMetadata={post.json_metadata} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { location } = props;
  const category = location.state && location.state.category ? location.state.category : '';
  const index = location.state && location.state.index ? location.state.index : '';
  return createStructuredSelector({
    postFromList: selectPostFromCategory(category, index),
    read: selectRead(),
  });
};

const mapDispatchToProps = dispatch => ({
  getOnePost: (author, permlink) => dispatch(getOnePostBegin(author, permlink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostRead);
