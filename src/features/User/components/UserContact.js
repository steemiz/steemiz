import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AvatarSteemit from 'components/AvatarSteemit';

const UserContact = ({ name }) => {
  return (
    <Link to={`/@${name}`} className="user_contact" data-show="false">
      <AvatarSteemit name={name} />
      <div className="user_contact__block">
        {/*<div className="user_contact__data">
          <h3>{name}<span>{reputation}</span></h3>
          {profile && <p>{profile.about}</p>}
        </div>*/}
        {/*{userData.num_new_message ?
          <div className="user_contact__new_message">{userData.num_new_message}</div> : null}*/}
        <h3>{name}</h3>
        <button className="btn_unfollow">Unfollow</button>
      </div>
    </Link>
  )
};

UserContact.propTypes = {
  name: PropTypes.string.isRequired,
};

export default UserContact;
