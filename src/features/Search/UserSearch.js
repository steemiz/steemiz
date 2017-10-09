import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import IconSearch from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import { COLOR_INACTIVE } from 'styles/icons';
import logo from './powered_by_asksteem.png';
import { selectUserSearch } from './selectors';

import SideBarNav from 'components/SideBarNav';
import CircularProgress from 'components/CircularProgress';
import { userSearchBegin } from 'features/Search/actions/userSearch';
import UserContact from 'features/User/components/UserContact';
import './PostSearch.css';

class UserSearch extends Component {
  changePage = page => {
    this.props.userSearchBegin(this.props.userSearch.q, page);
  };

  validate = evt => {
    const term = evt.target.value;
    if (term && evt.key === 'Enter') {
      if (term !== this.props.userSearch.q) {
        this.props.userSearchBegin(term);
      }
    }
  };

  render() {
    const { isLoading, q, results, hits, pages: { has_next, current} } = this.props.userSearch;
    return (
      <div>
        <div className="user-search">
          <IconSearch color={COLOR_INACTIVE} style={{ marginRight: 8 }} />
          <TextField
            fullWidth
            hintText="Search for users"
            className="search__input"
            onKeyPress={this.validate}
          />
          {isLoading && <CircularProgress size={20} thickness={3} />}
        </div>
        {results.length > 0 && (
          <div>
            <div className="search-result-header">
              <p>{hits} result(s)</p>
              <a href={`https://www.asksteem.com`} target="_blank">
                <img src={logo} alt="AskSteem" width={70} />
              </a>
            </div>
            {results.map(result => {
              return <UserContact key={result.name} name={result.name} />;
            })}
            <SideBarNav changePage={this.changePage} page={current} isEndPage={!has_next} />
          </div>
        )}
        {q && hits === 0 && (
          <p>There is no results for query '{q}'.</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = () => createStructuredSelector({
  userSearch: selectUserSearch(),
});

const mapDispatchToProps = dispatch => ({
  userSearchBegin: (term, page) => dispatch(userSearchBegin(term, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
