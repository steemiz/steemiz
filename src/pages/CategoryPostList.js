import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostList from 'features/Post/PostList';
import { setCategoryTag } from 'features/App/actions/setCategoryTag';

class CategoryPostList extends Component {
  componentDidMount() {
    const { match: { params: { category }} } = this.props;
    this.props.setCategoryTag(category);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { category }} } = this.props;
    const nextCategory = nextProps.match.params.category;
    if (nextCategory !== category) {
      this.props.setCategoryTag(nextCategory);
    }
  }

  render() {
    const { match: { params: { category }} } = this.props;
    return (
      <PostList category={category} subCategory="all" query={{ limit: 10 }} />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCategoryTag: (category) => dispatch(setCategoryTag(category)),
  }
};

export default connect(null, mapDispatchToProps)(CategoryPostList);
