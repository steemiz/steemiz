import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { selectAppConfig } from './selectors';
import { getAppConfigBegin } from "./actions/getAppConfig";
import '../../custom.css';
import Header from '../Layout/Header';
import LeftSideBar from '../Layout/LeftSideBar';
import RightSideBar from '../Layout/RightSideBar';
import Routes from '../../Routes';

class App extends Component {

  componentDidMount() {
    if (isEmpty(this.props.appConfig)) {
      this.props.getAppConfig();
    }
    // POSTS BY AUTHOR
    /*steem.api.getDiscussionsByBlogAsync({
     limit: 11,
     /!*start_author: "jejaka",
     start_permlink: "synagogue-service-in-indonesia",*!/
     tag: "aggroed",
     }, (err, result) => {
     //console.log(result);
     this.setState({
     disc: result,
     });
     });*/

    // POSTS BY FEED
    /*steem.api.getDiscussionsByFeedAsync({
      limit: 11,
      tag: "aggroed",
    }, (err, result) => {
      console.log('feed', result);
    });*/

    /*steem.api.getAccountHistory('aggroed', 10, 5, function(err, result) {
     console.log(err, result);
     });
     steem.api.getAccounts(['aggroed'], function(err, result) {
     console.log('Accounts', result);
     });*/
  }

  render() {
    return (
      <div id="app_container">
        <Header />
        <LeftSideBar />
        <RightSideBar />
        <div id="app_content">
          <div className="content__inner">
            <Routes />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  appConfig: selectAppConfig(),
});

const mapDispatchToProps = (dispatch, props) => ({
  getAppConfig: () => dispatch(getAppConfigBegin()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
