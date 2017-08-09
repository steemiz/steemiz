import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import { blue500, blue400, grey500, grey400 } from 'material-ui/styles/colors';

import { selectMyAccount, selectIsConnected } from '../User/selectors';
import { voteBegin } from'./actions/vote';

class VoteButton extends Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.vote = this.vote.bind(this);
  }

  vote(weight) {
    const { isConnected, content, vote, type } = this.props;
    if (isConnected) {
      vote(content, weight, { type: type });
    } else {
      console.log('Not logged');
    }
  }

  render() {
    const { account, content, isConnected } = this.props;
    const hasVoted = !!content.active_votes.find(vote => vote.voter === account.name && vote.percent > 0);
    return (
      <IconButton
        tooltip={hasVoted ? 'Unvote' : 'Vote'}
        onClick={!hasVoted ? () => this.vote(account.voting_power) : () => this.vote(0)}
        disabled={!isConnected}
        iconStyle={{
          width: 18,
          height: 18,
        }}
        style={{
          width: 36,
          height: 36,
          padding: 0,
        }}
      >
        <ThumbUp color={hasVoted ? blue500 : grey500} hoverColor={hasVoted ? blue400 : grey400} />
      </IconButton>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  account: selectMyAccount(),
  isConnected: selectIsConnected(),
});

const mapDispatchToProps = dispatch => ({
  vote: (post, weight, params) => dispatch(voteBegin(post, weight, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteButton);
