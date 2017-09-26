import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PostList from 'features/Post/PostList';
import { setCategoryTag } from 'features/App/actions/setCategoryTag';

class SubCategoryPostList extends Component {
  componentDidMount() {
    const { match: { params: { category, tag }} } = this.props;
    this.props.setCategoryTag(category, tag);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { category, tag }} } = this.props;
    const nextCategory = nextProps.match.params.category;
    const nextTag = nextProps.match.params.tag;
    if (nextCategory !== category || nextTag !== tag) {
      this.props.setCategoryTag(nextCategory, nextTag);
    }
  }

  render() {
    const { match: { params: { category, tag }} } = this.props;
    return (
      <div>
        <Helmet>
          <title>{`${category} | ${tag} `}</title>
        </Helmet>
        <PostList category={category} subCategory={tag} query={{ limit: 10, tag: tag }} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCategoryTag: (category, tag) => dispatch(setCategoryTag(category, tag)),
  }
};

export default connect(null, mapDispatchToProps)(SubCategoryPostList);
