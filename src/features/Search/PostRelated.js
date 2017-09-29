import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { GridList } from 'material-ui/GridList';
import { selectPostRelatedFromPost } from './selectors';
import { getPostRelatedBegin } from './actions/getPostRelated';
import Result from './components/Result';

class PostRelated extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    permlink: PropTypes.string.isRequired,
    postRelatedFromPost: PropTypes.array,
  };

  componentDidMount() {
    this.props.getPostRelated();
  }

  render() {
    const { postRelatedFromPost } = this.props;
    return (
      <div>
        {postRelatedFromPost && (
          <div className="card-list">
            <h3>You may like</h3>
            <GridList style={{ flexWrap: 'nowrap', overflowX: 'auto' }} cols={2.2} cellHeight="auto">
              {postRelatedFromPost.map(post => (
                <Result key={`${post.author}/${post.permlink}`} content={post} placeholderImg={true} />
              ))}
            </GridList>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  postRelatedFromPost: selectPostRelatedFromPost(props.author, props.permlink),
});

const mapDispatchToProps = (dispatch, props) => ({
  getPostRelated: () => dispatch(getPostRelatedBegin(props.author, props.permlink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostRelated);
