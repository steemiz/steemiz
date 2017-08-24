import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AvatarSteemit from 'components/AvatarSteemit';
import Author from 'components/Author';


const UserContact = ({ account }) => {
  const { name, reputation } = account;
  const profile = account.json_metadata.profile;
  return (
    <Link to={`/@${name}`} className="user_contact" data-show="false">
      <AvatarSteemit name={name} votingPower={account.voting_power} />
      <div className="user_contact__data">
        {/*<Author name={name} reputation={reputation}/>*/}
        <div className="user_contact__data">
          <h3>{name} <span>{reputation}</span></h3>
          <p><i className="user_contact__status active" />{profile.about}</p>
        </div>
        <p><i className="user_contact__status" /></p>
        {/*{userData.num_new_message ?
          <div className="user_contact__new_message">{userData.num_new_message}</div> : null}*/}
      </div>
      <button className="btn_unfollow">Unfollow</button>
    </Link>
  )
};

UserContact.propTypes = {
  //prop: PropTypes.array.isRequired
};

export default UserContact;
