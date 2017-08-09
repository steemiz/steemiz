import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import asyncComponent from './utils/asyncComponent';
import { getToken } from './utils/token';
import { getMeBegin } from './features/User/actions/getMe';
import { selectMe } from './features/User/selectors';
import isEmpty from 'lodash/isEmpty';

const Home = asyncComponent(() => import('./Home'));
const Test = asyncComponent(() => import('./Test'));
const PostRead = asyncComponent(() => import('./features/Post/PostRead'));
const MyProfile = asyncComponent(() => import('./features/User/MyProfile'));

class Routes extends Component {
  static propTypes = {
    me: PropTypes.string.isRequired,
    getMe: PropTypes.func.isRequired,
  };

  render() {
    const { me } = this.props;
    return (
      <div>
        <Route path="/" children={(props) => {
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
        }} />
        <Route path="/" exact component={Home} />
        <Route path="/:category/@:author/:permlink" exact component={PostRead} />
        <Route path="/test" exact component={Test} />
        <Route path="/profile" exact component={MyProfile} />
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
