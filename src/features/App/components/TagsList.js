import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import SideBarNav from 'components/SideBarNav';

const DISPLAYED_SIZE = 17;

export default class TagsList extends PureComponent {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    currentCategory: PropTypes.string.isRequired,
    currentTag: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.goToPage = this.goToPage.bind(this);
    this.state = {
      page: 1,
    };
  }

  goToPage(page) {
    this.setState({
      page: page,
    })
  }

  render() {
    const { tags, currentCategory, currentTag } = this.props;
    const { page } = this.state;
    const start = (page - 1) * DISPLAYED_SIZE;
    const end = start + DISPLAYED_SIZE;
    const displayedResults = tags.slice(start, end);
    return (
      <div>
        {!isEmpty(displayedResults) && displayedResults.map(tag => (
          <Link key={tag} to={`/${currentCategory}/${tag}`} className={currentTag === tag ? 'tab__result--link active' : 'tab__result--link'}>{tag}</Link>
        ))}
        <SideBarNav changePage={this.goToPage} page={page} isEndPage={displayedResults.length !== DISPLAYED_SIZE} />
      </div>
    );
  }
}
