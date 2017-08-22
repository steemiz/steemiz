import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { replace } from 'react-router-redux';
import queryString from 'query-string';
import asyncComponent from './utils/asyncComponent';
import { getToken } from './utils/token';
import { getMeBegin } from './features/User/actions/getMe';
import { selectMe } from './features/User/selectors';
import isEmpty from 'lodash/isEmpty';

const Home = asyncComponent(() => import('./pages/Home'));
const Feed = asyncComponent(() => import('./pages/Feed'));
const MyFeed = asyncComponent(() => import('./pages/MyFeed'));
const MyBlog = asyncComponent(() => import('./pages/MyBlog'));
const PostRead = asyncComponent(() => import('./features/Post/PostRead'));
const Profile = asyncComponent(() => import('./features/User/Profile'));
const ProfilePage = asyncComponent(() => import('./pages/ProfilePage'));
const Test = asyncComponent(() => import('./Test'));



class Routes extends Component {
  static propTypes = {
    me: PropTypes.string.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.location.search) {
      const { access_token } = queryString.parse(this.props.location.search);
      if (access_token) {
        this.props.getMe(access_token);
        this.props.replace('/');
      }
    }
    const accessToken = getToken();
    if (accessToken) {
      this.props.getMe(accessToken);
    }
  }

  render() {
    return (
      <div>
        {/*<Route path="/" children={(props) => {
          if (props.location.search) {
            const { access_token } = queryString.parse(props.location.search);
            if (access_token) {
              this.props.getMe(access_token);
              props.history.replace('/');
            }
          }
          const accessToken = getToken();
          if (accessToken && isEmpty(me)) {
            this.props.getMe(accessToken);
          }
          return <div/>;
        }} />*/}
        <Route path="/" exact component={Home} />
        <Route path="/:topic/@:author/:permlink" exact component={PostRead} />
        {/*<Route path="/@:accountName/feed" exact component={Feed} />*/}
        <Route path="/feed" exact component={MyFeed} />
        <Route path="/blog" exact component={MyBlog} />
        <Route path="/@:accountName" component={Profile} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  me: selectMe(),
});

const mapDispatchToProps = dispatch => ({
  getMe: token => dispatch(getMeBegin(token)),
  replace: path => dispatch(replace(path)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
