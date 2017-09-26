import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectSearch } from './selectors';
import { searchBegin } from 'features/Search/actions/search';
import InfiniteList from 'components/InfiniteList';
import Result from './components/Result';

class Search extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { match: { params : { q }}, search: { pages: { current }}} = this.props;
    this.props.searchBegin(q, current);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params : { q }} } = nextProps;
    if (q !== this.props.match.params.q) {
      this.props.searchBegin(q);
    }
  }

  loadPosts = () => {
    const { match: { params : { q }}, search: { pages: { current }}} = this.props;
    this.props.searchBegin(q, current + 1);
  };

  render() {
    const { match: { params : { q }}, search } = this.props;
    return (
      <div>
        <h2>Search results for '{q}'</h2>
        {typeof search.hits !== 'undefined' && <h4>{search.hits} result(s)</h4>}
        <InfiniteList
          list={search.results}
          hasMore={search.pages && search.pages.has_next}
          isLoading={search.isLoading}
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
  search: selectSearch(),
});

const mapDispatchToProps = dispatch => ({
  searchBegin: (q, page) => dispatch(searchBegin(q, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
