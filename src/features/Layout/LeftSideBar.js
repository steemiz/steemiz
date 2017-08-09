import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <aside id="left_sidebar">
      <div className="link">
        <NavLink className="link__inner" activeClassName="active" to="/">
          <i className="material-icons">view_quilt</i>
          <span>View Quilt</span>
        </NavLink>
      </div>
      <div className="link">
        <NavLink className="link__inner" activeClassName="active" to="/users/1/profile">
          <i className="material-icons">star</i>
          <span>Star Rate</span>
        </NavLink>
      </div>
      <div className="link">
        <NavLink className="link__inner" activeClassName="active" to="/1">
          <i className="material-icons">rss_feed</i>
          <span>Rss Feed</span>
        </NavLink>
      </div>
      <div className="link">
        <NavLink className="link__inner" activeClassName="active" to="/1">
          <i className="material-icons">group_work</i>
          <span>Group</span>
        </NavLink>
      </div>
      <div className="link">
        <NavLink className="link__inner" activeClassName="active" to="/2">
          <i className="material-icons rotate__90">local_offer</i>
          <span>Local offer</span>
        </NavLink>
      </div>
      <div className="link link--account">
        <NavLink className="link__inner" activeClassName="active" to="/3">
          <i className="material-icons">account_circle</i>
          <span>Account</span>
        </NavLink>
      </div>
      <div className="link link--setting">
        <NavLink className="link__inner" activeClassName="active" to="/4">
          <i className="material-icons">settings</i>
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  )
};

export default LeftSidebar;