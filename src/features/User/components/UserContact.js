import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AvatarSteemit from '../../../components/AvatarSteemit';
import Author from '../../../components/Author';

const UserContact = ({ account }) => {
  const { name, reputation } = account;
  return (
    <Link to="#" className="user_contact" data-show="false">
      <AvatarSteemit name={name} />
      <div className="user_contact__data">
        {/*<Author name={name} reputation={reputation}/>*/}
        <div className="user_contact__data">
          <h3>{name} <span>{reputation}</span></h3>
          <p><i className="user_contact__status active" />tiam elementum erat identify</p>
        </div>
        <p><i className="user_contact__status" />bla</p>
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
