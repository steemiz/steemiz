import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import isEmpty from 'lodash/isEmpty';

import CircularProgress from 'components/CircularProgress';

export default class InfiniteList extends PureComponent {
  static defaultProps = {
    isLoading: false,
  };

  static propTypes = {
    list: PropTypes.array.isRequired,
    hasMore: PropTypes.bool,
    isLoading: PropTypes.bool,
    initLoad: PropTypes.func,
    loadMoreCb: PropTypes.func.isRequired,
    itemMappingCb: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // INITIAL DATA LOADING IF PROVIDED
    if (this.props.initLoad) {
      const { list, hasMore } = this.props;
      if ((hasMore === true || hasMore === undefined) && isEmpty(list)) {
        this.props.initLoad();
      }
    }
  }

  loadMore = () => {
    const { isLoading, hasMore } = this.props;
    if (isLoading === false && hasMore === true) {
      this.props.loadMoreCb();
    }
  };

  render() {
    const { list, hasMore, isLoading, itemMappingCb } = this.props;
    const items = list.map(itemMappingCb);
    return (
      <div>
        {isEmpty(list) && isLoading && <CircularProgress />}
        {list.length > 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={hasMore}
            loader={<CircularProgress />}
          >
            {items}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}
