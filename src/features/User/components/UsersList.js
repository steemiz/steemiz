import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import IconButton from 'material-ui/IconButton';
import IconNavBefore from 'material-ui/svg-icons/image/navigate-before';
import IconNavNext from 'material-ui/svg-icons/image/navigate-next';

import SearchBox from 'components/SearchBox';
import UserContact from './UserContact';

export default class UsersList extends PureComponent {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
  };

  constructor(props) {
    super();
    this.filter = this.filter.bind(this);
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

  goToPage(page) {
    this.setState({
      page: page,
    })
  }

  render() {
    const { results, page } = this.state;
    const { dataSource } = this.props;
    const start = (page - 1) * 5;
    const end = start + 5;
    const displayedResults = results.slice(start, end);
    return (
      <div>
        <SearchBox dataSource={dataSource} onNewRequest={this.filter} />
        {!isEmpty(displayedResults) && displayedResults.map(user => <UserContact key={user} name={user} />)}
        <div className="nav">
          <IconButton onClick={() => this.goToPage(page - 1)} disabled={page === 1}>
            <IconNavBefore />
          </IconButton>
          <IconButton onClick={() => this.goToPage(page + 1)}>
            <IconNavNext />
          </IconButton>
        </div>
      </div>
    );
  }
}
