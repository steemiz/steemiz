import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const UserMenu = ({ accountName }) => {
  return (
    <div className="content__links">
      <NavLink activeClassName="active" to={`/@${accountName}/blog`}>Blog</NavLink>
      <NavLink activeClassName="active" to={`/@${accountName}/comments`}>Comments</NavLink>
      <NavLink activeClassName="active" to={`/@${accountName}/replies`}>Replies</NavLink>
      <NavLink activeClassName="active" to={`/@${accountName}/votes`}>Votes</NavLink>
      <NavLink activeClassName="active" to={`/@${accountName}/followers`}>Followers</NavLink>
      <NavLink activeClassName="active" to={`/@${accountName}/followings`}>Followings</NavLink>
      <NavLink activeClassName="active" to={`/@${accountName}/rewards`}>Rewards</NavLink>
      <NavLink activeClassName="active" to={`/@${accountName}/wallet`}>Wallet</NavLink>
    </div>
  )
};

UserMenu.propTypes = {
  accountName: PropTypes.string.isRequired
};

export default UserMenu;
