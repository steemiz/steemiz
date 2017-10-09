import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectIsPublishing, selectPublishFormOpen } from './selectors';

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import draftToHtml from 'draftjs-to-html'
import { convertToRaw, EditorState } from 'draft-js'

import TagsInput from 'components/TagsInput';
import CircularProgress from 'components/CircularProgress';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import GreenButton from 'components/GreenButton';
import { uploadFileBegin } from './actions/uploadFile';
import { publishContentBegin, togglePublishForm } from './actions/publishContent';

class PostCreate extends Component {
  static propTypes = {
    publishContent: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    togglePublishForm: PropTypes.func.isRequired,
    publishFormOpen: PropTypes.bool.isRequired,
    isPublishing: PropTypes.bool.isRequired,
  };

  constructor() {
    super();

    this.state = {
      title: '',
      editorState: EditorState.createEmpty(),
      tags: [],
      reward: '50',
    }
  }

  handleChangeSelectTag = tags => {
    this.setState({ tags });
  };

  handleCreatePost = () => {
    const { title, editorState, tags, reward } = this.state;
    this.props.publishContent({
      title,
      editorRaw: convertToRaw(editorState.getCurrentContent()),
      tags,
      reward,
    });
  };

  handleEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  handleRewards = (evt, index, value) => {
    this.setState({ reward: value });
  };

  handleTitle = (evt) => {
    this.setState({ title: evt.target.value });
  };

  toggleForm = () => {
    this.props.togglePublishForm();
  };

  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      this.props.uploadFile({ resolve, reject }, file);
    });
  };

  render() {
    const { publishFormOpen, isPublishing } = this.props;
    const { editorState, title, reward } = this.state;
    const progress = isPublishing ? <CircularProgress size={20} thickness={3} /> : <div />;
    const actions = [
      progress,
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.toggleForm}
      />,
      <RaisedButton
        label="Post"
        primary={true}
        onTouchTap={this.handleCreatePost}
        disabled={isPublishing}
      />,
    ];
    return (
      <div className="create_post">
        <GreenButton onClick={this.toggleForm}>Create a Post</GreenButton>

        <Dialog
          className="wysiwyg"
          title="Write a new post"
          actions={actions}
          modal={false}
          open={publishFormOpen}
          onRequestClose={this.toggleForm}
          contentStyle={{ width: '90%', height: '90%', maxWidth: 'none' }}
          titleStyle={{ padding: '15px 24px 15px' }}
          actionsContainerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          autoScrollBodyContent={true}
        >
          <div className="create_post__body">
            <TextField
              className="input__group"
              onChange={this.handleTitle}
              floatingLabelText="Title"
              name="title"
              value={title}
            />
            <Editor
              hashtag={{}}
              editorState={editorState}
              toolbarClassName="create_post__toolbar"
              wrapperClassName="create_post__wrapper"
              editorClassName="create_post__editor"
              onEditorStateChange={this.handleEditorStateChange}
              toolbar={{ image: { uploadCallback: this.uploadImageCallBack } }}
            />

            <SelectField
              floatingLabelText="Rewards"
              maxHeight={400}
              fullWidth={true}
              onChange={this.handleRewards}
              value={reward}
            >
              <MenuItem value="50" key={0} primaryText="Default (50% / 50%)" />
              <MenuItem value="100" key={1} primaryText="Power Up 100%" />
              <MenuItem value="0" key={2} primaryText="Decline Payout" />
            </SelectField>
            <TagsInput value={this.state.tags} onChange={this.handleChangeSelectTag} />

            <div className="real_time_preview">
              <h3>Preview</h3>
              <div
                dangerouslySetInnerHTML={{ __html: editorState && draftToHtml(convertToRaw(editorState.getCurrentContent())) }}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  publishFormOpen: selectPublishFormOpen(),
  isPublishing: selectIsPublishing(),
});

const mapDispatchToProps = dispatch => ({
  uploadFile: (promise, file) => dispatch(uploadFileBegin(promise, file)),
  publishContent: content => dispatch(publishContentBegin(content)),
  togglePublishForm: () => dispatch(togglePublishForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);
