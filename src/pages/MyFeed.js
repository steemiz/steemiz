import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectMe } from '../features/User/selectors';
import PostList from '../features/Post/PostList';

class MyFeed extends Component {
  static propTypes = {
    me: PropTypes.string.isRequired,
  };

  render() {
    const { me } = this.props;
    return (
      <div>
        {me && <PostList category="feed" query={{ limit: 10, tag: me }} />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  me: selectMe(),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyFeed);
