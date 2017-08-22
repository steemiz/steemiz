import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavLink, withRouter } from 'react-router-dom';

import { selectMe } from '../User/selectors';

class LeftSideBar extends Component {
  render() {
    const { me } = this.props;
    return (
      <aside id="left_sidebar">
        <div className="link">
          <NavLink className="link__inner" activeClassName="active" to="/" exact>
            <i className="material-icons">view_quilt</i>
            <span>All post</span>
          </NavLink>
        </div>
        <div className="link">
          <NavLink className="link__inner" activeClassName="active" to="/feed" exact>
            <i className="material-icons">star</i>
            <span>Following Feed</span>
          </NavLink>
        </div>
        <div className="link">
          <NavLink className="link__inner" activeClassName="active" to="/blog" exact>
            <i className="material-icons">rss_feed</i>
            <span>My Blog</span>
          </NavLink>
        </div>
        {/*<div className="link">
        <NavLink className="link__inner" activeClassName="active" to="/1" exact>
          <i className="material-icons">group_work</i>
          <span>Followed Tags</span>
        </NavLink>
      </div>*/}
        {/*<div className="link">
        <NavLink className="link__inner" activeClassName="active" to="/2">
          <i className="material-icons rotate__90">local_offer</i>
          <span>Local offer</span>
        </NavLink>
      </div>*/}
        {me && (
          <div className="link link--account">
            <NavLink className="link__inner" activeClassName="active" to={`/@${me}`}>
              <i className="material-icons">account_circle</i>
              <span>Profile</span>
            </NavLink>
          </div>
        )}
        <div className="link link--setting">
          <NavLink className="link__inner" activeClassName="active" to="/4">
            <i className="material-icons">settings</i>
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  me: selectMe(),
});

export default withRouter(connect(mapStateToProps)(LeftSideBar));
