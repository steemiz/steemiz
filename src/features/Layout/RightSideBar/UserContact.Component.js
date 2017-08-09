import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'

const UserContactComponent = ({ className, userData, handleUnfollow }) => {
  return (
    userData.active ? (
      <Link to="#" className={`user_contact ${className}`}>
        <Avatar src={userData.avatar} className="user_contact__avatar" />
        <div className="user_contact__data">
          <h3>{userData.name} {userData.rate ? <span> {userData.rate}</span> : null}</h3>
          <p><i className="user_contact__status active" />{userData.message}</p>
          {userData.num_new_message ?
            <div className="user_contact__new_message">{userData.num_new_message}</div> : null}
        </div>
        <button className="btn_unfollow" onClick={handleUnfollow}>Unfollow</button>
      </Link>
    ) : (
      <Link to="#" className={`user_contact ${className}`} data-show="false">
        <Avatar src={userData.avatar} className="user_contact__avatar" />
        <div className="user_contact__data">
          <h3>{userData.name} {userData.rate ? <span> {userData.rate}</span> : null}</h3>
          <p><i className="user_contact__status" />{userData.message}</p>
          {userData.num_new_message ?
            <div className="user_contact__new_message">{userData.num_new_message}</div> : null}
        </div>
        <button className="btn_unfollow" onClick={handleUnfollow}>Unfollow</button>
      </Link>
    )
  )
};

export default UserContactComponent