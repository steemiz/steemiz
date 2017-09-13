import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

const AvatarSteemit = ({ name, size, votingPower }) => {
  const percentVotingPower = votingPower ? parseInt(votingPower / 100, 10) : 0;
  let borderWidth = 2;
  borderWidth = votingPower ? borderWidth : 0;
  const fontWeight = size <= 48 ? '400' : '200';
  return (
    <div className="avatar-steemit" style={{ borderWidth: borderWidth, width: size + 5, height: size + 5 }}>
      {votingPower && <CircularProgress
        mode="determinate"
        value={percentVotingPower}
        style={{
          position: 'absolute',
          transform: 'translate(-50%,-50%)',
          top: '50%',
          left: '50%',
        }}
        innerStyle={{
          transform: 'rotate(-90deg)',
        }}
        size={size + borderWidth * 5}
        thickness={borderWidth}
      />}
      <div className="avatar">
        <Avatar
          src={`${process.env.REACT_APP_STEEMCONNECT_IMG_HOST}/@${name}?s=${size}`}
          backgroundColor="#999"
          size={size}
          style={{ display: 'block' }}
        />
      </div>
      {votingPower && (
        <div className="avatar_hover" style={{ fontWeight: fontWeight, width: size, height: size }}>
          <span style={{ fontSize: size / 2.5 }}>{percentVotingPower}</span>
        </div>
      )}
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
