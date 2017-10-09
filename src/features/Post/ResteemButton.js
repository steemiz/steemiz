import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import IconExchange from 'react-icons/lib/fa/exchange';
import SmallIconButton from 'components/SmallIconButton';
import CircularProgress from 'components/CircularProgress';
import { resteemBegin } from './actions/resteem';
import { selectPostByPermlink } from './selectors';
import './ResteemButton.css';

function ResteemButton(props) {
  const { post } = props;
  return (
    <div className="resteem-button">
      {post.isResteeming && <CircularProgress size={20} thickness={3} style={{ marginRight: 10 }} />}
      <SmallIconButton
        disabled={post.isResteeming}
        icon={IconExchange}
        tooltip="Resteem"
        onClick={() => props.resteem(post)}
      />
    </div>
  );
}

ResteemButton.propTypes = {
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => createStructuredSelector({
  post: selectPostByPermlink(props.author, props.permlink),
});

const mapDispatchToProps = dispatch => ({
  resteem: post => dispatch(resteemBegin(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResteemButton);
