import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectPostSearch } from './selectors';
import { postSearchBegin } from 'features/Search/actions/postSearch';
import InfiniteList from 'components/InfiniteList';
import Result from './components/Result';
import logo from './powered_by_asksteem.png';
import './PostSearch.css';

class PostSearch extends Component {
  static propTypes = {
    postSearch: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { match: { params : { q }}, postSearch: { pages: { current }}} = this.props;
    if (q !== this.props.postSearch.q) {
      this.props.postSearchBegin(q, current);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params : { q }} } = nextProps;
    if (q !== this.props.match.params.q) {
      this.props.postSearchBegin(q);
    }
  }

  loadPosts = () => {
    const { match: { params : { q }}, postSearch: { pages: { current }}} = this.props;
    this.props.postSearchBegin(q, current + 1);
  };

  render() {
    const { match: { params : { q }}, postSearch } = this.props;
    return (
      <div>
        <div className="search-result-header">
          <div>
            <h2>Search results for '{q}'</h2>
            {typeof postSearch.hits !== 'undefined' && <p className="nb">{postSearch.hits} result(s)</p>}
          </div>
          <a href={`https://www.asksteem.com/search?q=${q}`} target="_blank"><img src={logo} alt="AskSteem" /></a>
        </div>
        <InfiniteList
          list={postSearch.results}
          hasMore={postSearch.pages && postSearch.pages.has_next}
          isLoading={postSearch.isLoading}
          loadMoreCb={this.loadPosts}
          itemMappingCb={result => (
            <Result
              key={`${result.author}-${result.permlink}`}
              content={result}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  postSearch: selectPostSearch(),
});

const mapDispatchToProps = dispatch => ({
  postSearchBegin: (q, page) => dispatch(postSearchBegin(q, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostSearch);
