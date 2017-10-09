import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconSearch from 'material-ui/svg-icons/action/search';
import AutoComplete from 'material-ui/AutoComplete';
import debounce from 'lodash/debounce';
import { COLOR_INACTIVE } from 'styles/icons';
import { selectPostSearch, selectPostSuggestions } from './selectors';

import CircularProgress from 'components/CircularProgress';
import { postSearchInit } from 'features/Search/actions/postSearch';
import { suggestBegin } from 'features/Search/actions/suggest';

class PostSearchInput extends Component {
  handleInput = term => {
    if (term) {
      this.props.suggest(term);
    }
  };

  validate = term => {
    if (term !== this.props.postSearch.q) {
      this.props.initSearch();
    }
    this.props.history.push(`/search/${term}`);
  };

  render() {
    const { isLoading } = this.props.postSearch;
    return (
      <div className="search">
        <IconSearch color={COLOR_INACTIVE} />
        <AutoComplete
          style={{ width: 244 }}
          hintText="Search for posts"
          className="search__input"
          dataSource={this.props.postSuggestions}
          onUpdateInput={debounce(this.handleInput, 500)}
          onNewRequest={this.validate}
        />
        {isLoading && <CircularProgress size={20} thickness={3} />}
      </div>
    );
  }
}

const mapStateToProps = () => createStructuredSelector({
  postSuggestions: selectPostSuggestions(),
  postSearch: selectPostSearch(),
});

const mapDispatchToProps = dispatch => ({
  initSearch: () => dispatch(postSearchInit()),
  suggest: term => dispatch(suggestBegin(term)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostSearchInput));
