import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

const AvatarSteemit = ({ name, size, votingPower }) => {
  const percentVotingPower = votingPower ? parseInt(votingPower / 100) : 0;
  return (
    <div className="avatar_progress" data-progress={percentVotingPower} data-size={`${size}px`}>
      <div className="circle">
        <div className="mask full">
          <div className="fill" />
        </div>
        <div className="mask half">
          <div className="fill" />
          <div className="fill fix" />
        </div>
      </div>
      <div className="inset">
        <div className="avatar">
          <Avatar
            src={`${process.env.REACT_APP_STEEMCONNECT_IMG_HOST}/@${name}?s=${size}`}
            backgroundColor="#999"
            size={size}
          />
          {votingPower && <div className="avatar__hover"><span>{percentVotingPower}</span></div>}
        </div>
      </div>
    </div>
  )
};

AvatarSteemit.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  votingPower: PropTypes.number,
};

AvatarSteemit.defaultProps = {
  size: 48,
  votingPower: undefined,
};

export default AvatarSteemit;
