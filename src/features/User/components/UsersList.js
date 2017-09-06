import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import SideBarNav from 'components/SideBarNav';
import SearchBox from 'components/SearchBox';
import UserContact from './UserContact';

const DISPLAYED_SIZE = 5;

export default class UsersList extends PureComponent {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
  };

  constructor(props) {
    super();
    this.filter = this.filter.bind(this);
    this.reset = this.reset.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.state = {
      page: 1,
      results: props.dataSource,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource) {
      this.setState({
        results: nextProps.dataSource,
      });
    }
  }

  filter(value) {
    this.setState({
      page: 1,
      results: this.props.dataSource
        .filter(user => user.indexOf(value) >= 0),
    });
  }

  reset(value) {
    if (value === '') {
      this.setState({
        page: 1,
        results: this.props.dataSource,
      });
    }
  }

  goToPage(page) {
    this.setState({
      page: page,
    })
  }

  render() {
    const { results, page } = this.state;
    const { dataSource } = this.props;
    const start = (page - 1) * DISPLAYED_SIZE;
    const end = start + DISPLAYED_SIZE;
    const displayedResults = results.slice(start, end);
    return (
      <div>
        <SearchBox dataSource={dataSource} onNewRequest={this.filter} onUpdateInput={this.reset} />
        {!isEmpty(displayedResults) && displayedResults.map(user => <UserContact key={user} name={user} />)}
        <SideBarNav changePage={this.goToPage} page={page} isEndPage={displayedResults.length !== DISPLAYED_SIZE} />
      </div>
    );
  }
}
