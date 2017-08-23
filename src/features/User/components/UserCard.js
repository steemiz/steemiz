import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import AvatarSteemit from 'components/AvatarSteemit';
import UserSteemPower from '../UserSteemPower';


const UserCard = ({ user }) => {
  return (
    <div className="user_profile">
      <button className="user_profile__delete">×</button>
      <div className="user_profile__avatar">
        <AvatarSteemit name={user.name} size={140} />
      </div>
      {/*<Author name={user.name} reputation={user.reputation}/>*/}
      <span className="user_profile__rate">{user.reputation}</span>
      <h3 className="user_profile__name">{user.name}</h3>
      {/*<span className="user_profile__rate">{formatter.reputation(user.reputation)}</span>
      <h3 className="user_profile__name">{user.name}</h3>*/}
      <h4 className="user_profile__steem_power">
        {user.vesting_shares && <UserSteemPower vestingShares={user.vesting_shares} />}
      </h4>
      <p>Steem Power</p>
      <div className="user_profile__view">
        <Link to={`/@${user.name}`}>View Profile</Link>
      </div>
    </div>
  )
};

UserCard.propTypes = {
  //prop: PropTypes.array.isRequired
};

export default withRouter(UserCard);
