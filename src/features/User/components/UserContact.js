import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FollowButton from '../FollowButton';
import AvatarSteemit from 'components/AvatarSteemit';

const UserContact = ({ name }) => {
  return (
    <div className="user_contact">
      <Link to={`/@${name}`}>
        <AvatarSteemit name={name} />
        <h3>{name}</h3>
      </Link>
      <FollowButton accountName={name} />
    </div>
  )
};

UserContact.propTypes = {
  name: PropTypes.string.isRequired,
};

export default UserContact;
