import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import { blue400, blue500, grey400, grey500 } from 'material-ui/styles/colors';

import { selectIsConnected, selectMyAccount } from '../User/selectors';
import { selectPostByPermlink } from '../Post/selectors';
import { selectCommentById } from '../Comment/selectors';
import { voteBegin } from './actions/vote';
import {
  hasVoted
} from 'utils/helpers/steemitHelpers';

class VoteButton extends Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
    myAccount: PropTypes.object.isRequired,
    isConnected: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    vote: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.vote = this.vote.bind(this);
  }

  vote(weight) {
    const { isConnected, content, vote, type } = this.props;
    if (isConnected) {
      vote(content, weight, { type });
    } else {
      console.log('Not logged');
    }
  }

  render() {
    const { myAccount, isConnected, content } = this.props;
    const contentUpvoted = hasVoted(content, myAccount.name);

    return (
      <IconButton
        tooltip={contentUpvoted ? 'Unvote' : 'Vote'}
        onClick={!contentUpvoted ? () => this.vote(10000) : () => this.vote(0)}
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
        <ThumbUp color={contentUpvoted ? blue500 : grey500} hoverColor={contentUpvoted ? blue400 : grey400} />
      </IconButton>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  myAccount: selectMyAccount(),
  isConnected: selectIsConnected(),
});

const mapDispatchToProps = (dispatch, props) => ({
  vote: (content, weight, params) => dispatch(voteBegin(content, weight, props.type, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteButton);
