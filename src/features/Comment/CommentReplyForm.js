import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { replyBegin } from './actions/reply';

class CommentReplyForm extends Component {
  static propTypes = {
    content: PropTypes.object.isRequired,
    closeForm: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.reply = this.reply.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      body: '',
    }
  }

  reply() {
    this.props.reply(this.state.body);
    this.props.closeForm();
  }

  onChange(evt, val) {
    this.setState({ body: val });
  }

  render() {
    const { closeForm } = this.props;
    const { body } = this.state;
    return (
      <div>
        <TextField
          name="comment-reply"
          value={body}
          multiLine
          fullWidth
          floatingLabelText="Reply"
          onChange={this.onChange}
        />
        <div>
          <RaisedButton
            label="Post"
            primary={true}
            onTouchTap={this.reply}
          />
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={closeForm}
          />
        </div>
      </div>
    );
  }
}

/*const mapStateToProps = (state, props) => createStructuredSelector({
  publishFormOpen: selectPublishFormOpen(),
  isPublishing: selectIsPublishing(),
});*/

const mapDispatchToProps = (dispatch, props) => ({
  reply: body => dispatch(replyBegin(props.content, body)),
});

export default connect(null, mapDispatchToProps)(CommentReplyForm);