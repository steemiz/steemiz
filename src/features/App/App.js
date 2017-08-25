import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { selectAppProps, selectIsSidebarOpen } from './selectors';
import { getAppConfigBegin } from './actions/getAppConfig';
import 'custom.css';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import Notification from 'features/Notification';
import Routes from 'Routes';

class App extends Component {

  componentDidMount() {
    if (isEmpty(this.props.appProps)) {
      this.props.getAppConfig();
    }
  }

  render() {
    const { isSidebarOpen } = this.props;
    return (
      <div id="app_container">
        <Header />
        <LeftSideBar />
        <RightSideBar />
        <div id="app_content" className={isSidebarOpen ? 'sidebar_open' : ''}>
          <div className="content__inner">
            <Routes />
          </div>
        </div>
        <Notification />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  appProps: selectAppProps(),
  isSidebarOpen: selectIsSidebarOpen(),
});

const mapDispatchToProps = (dispatch, props) => ({
  getAppConfig: () => dispatch(getAppConfigBegin()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
