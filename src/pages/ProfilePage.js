import React from 'react';
import PropTypes from 'prop-types';
import Profile from 'features/User/Profile';

const ProfilePage = (props) => {
  console.log('profile page', props.match.params.accountName);
  return (
    <div>
      <Profile accountName={props.match.params.accountName} />
    </div>
  )
};

ProfilePage.propTypes = {
  //prop: PropTypes.array.isRequired
};

export default ProfilePage;
