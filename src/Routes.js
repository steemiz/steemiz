import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import asyncComponent from 'asyncComponent';
import { getToken } from './utils/token';
import { getMeBegin } from './features/User/actions/getMe';
import { selectMe } from './features/User/selectors';

const Home = asyncComponent(() => import('./pages/Home'));
const MyFeed = asyncComponent(() => import('./pages/MyFeed'));
const MyBlog = asyncComponent(() => import('./pages/MyBlog'));
const Category = asyncComponent(() => import('./pages/Category'));
const TagPostList = asyncComponent(() => import('./pages/TagPostList'));
const PostRead = asyncComponent(() => import('./features/Post/PostRead'));
const Profile = asyncComponent(() => import('./features/User/Profile'));

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
        {this.props.location.search && <Redirect to="/" />}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/feed" exact component={MyFeed} />
          <Route path="/blog" exact component={MyBlog} />
          <Route path="/@:accountName" component={Profile} />
          <Route path="/:category" exact component={Category} />
          <Route path="/:topic/@:author/:permlink" exact component={PostRead} />
          <Route path="/:category/:tag" exact component={TagPostList} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  me: selectMe(),
});

const mapDispatchToProps = dispatch => ({
  getMe: token => dispatch(getMeBegin(token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
