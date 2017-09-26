import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconSearch from 'material-ui/svg-icons/action/search';
import { COLOR_INACTIVE } from 'styles/icons';

import { initSearch } from 'features/Search/actions/search';

class SearchInput extends Component {
  constructor() {
    super();
    this.state = {
      q: '',
    };
  }

  handleInput = (evt) => {
    this.setState({ q: evt.target.value });
  };

  validate = (evt) => {
    if (evt.key === 'Enter') {
      this.props.initSearch();
      this.setState({ go: true });
      this.props.history.push(`/search/${this.state.q}/1`);
    }
  };

  render() {
    const { q } = this.state;
    return (
      <div className="search">
        <IconSearch color={COLOR_INACTIVE} />
        <input className="search__input" value={q} type="text" placeholder="Search for posts" onChange={this.handleInput} onKeyPress={this.validate} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  initSearch: () => dispatch(initSearch()),
});

export default withRouter(connect(null, mapDispatchToProps)(SearchInput));
