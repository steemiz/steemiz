import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import asyncComponent from './utils/asyncComponent';
import { getToken } from './utils/token';
import { getProfileBegin } from './features/User/actions/getProfile';
import { selectProfile } from './features/User/selectors';
import isEmpty from 'lodash/isEmpty';

const Home = asyncComponent(() => import('./Home'));
const Test = asyncComponent(() => import('./Test'));
const PostRead = asyncComponent(() => import('./features/Post/PostRead'));

class Routes extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
  };

  render() {
    const { profile } = this.props;
    return (
      <div>
        <Route path="/" children={(props) => {
          if (props.location.search) {
            const { access_token } = queryString.parse(props.location.search);
            if (access_token) {
              this.props.getProfile(access_token);
              props.history.replace('/');
            }
          }
          const accessToken = getToken();
          if (accessToken && isEmpty(profile)) {
            this.props.getProfile(accessToken);
          }
          return <div/>;
        }} />
        <Route path="/" exact component={Home} />
        <Route path="/:category/@:author/:permlink" exact component={PostRead} />
        <Route path="/test" exact component={Test} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => createStructuredSelector({
  profile: selectProfile(),
});

const mapDispatchToProps = dispatch => ({
  getProfile: token => dispatch(getProfileBegin(token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
