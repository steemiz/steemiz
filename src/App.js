import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink, withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import asyncComponent from './utils/asyncComponent';
import './custom.css';
import steemconnect from './utils/steemconnect';
import { selectMyAccountMetadata, selectMyAccount } from './features/User/selectors';
import { logoutBegin } from './features/User/actions/logout';
import Header from './features/Layout/Header';
import LeftSideBar from './features/Layout/LeftSideBar';
import RightSideBar from './features/Layout/RightSideBar';
import Routes from './Routes';

const Home = asyncComponent(() => import('./Home'));
const Test = asyncComponent(() => import('./Test'));

class App extends Component {
  static propTypes = {
    accountMetadata: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
  };

  componentDidMount() {
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
    const { accountMetadata, account } = this.props;

    return (
      <div id="app_container">
        <Header
          avatar={!isEmpty(accountMetadata) ? accountMetadata.profile.profile_image : ''}
          name={account.name || ''}
        />
        <LeftSideBar />
        <RightSideBar />
        <div id="app_content">
          <div className="content__inner">
            <a href="#" onClick={this.props.logout}>Logout</a>
            <a href={steemconnect.getLoginURL()}>Connect</a>
            <NavLink to="/test" exact activeStyle={{ fontWeight: 'bold' }}>Go to test</NavLink>
            <NavLink to="/" exact activeStyle={{ fontWeight: 'bold' }}>Go to Home</NavLink>
            <NavLink to="/profile" exact activeStyle={{ fontWeight: 'bold' }}>Go to My Profile</NavLink>
            <Routes />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  accountMetadata: selectMyAccountMetadata(),
  account: selectMyAccount(),
});

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => dispatch(logoutBegin()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
