import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
/*import { selectUser } from './selectors';*/

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import draftToHtml from 'draftjs-to-html'
import { convertToRaw, EditorState } from 'draft-js'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import GreenButton from 'components/GreenButton';
import { uploadFileBegin } from './actions/uploadFile';

class PostCreate extends Component {
  static propTypes = {
    //myProp: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      editorState: EditorState.createEmpty(),
      dataTag: '',
    }
  }

  handleCloseCreatePost = () => {
    this.setState({ dialogOpen: false })
  };

  handleOpenCreatePost = () => {
    this.setState({ dialogOpen: true })
  };

  handleCreatePost = () => {

  };

  handleEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      this.props.uploadFile({ resolve, reject }, file);
    });
  };

  handleChangeSelectTag = (tagSelected) => {
    console.log(tagSelected);
    console.log(tagSelected.length);

    let maxSelectedOptions = 5;
    if (tagSelected.length <= maxSelectedOptions) {
      this.setState(state => {
        state.dataTag = tagSelected
      })
    }
  };

  render() {
    const { dialogOpen, editorState } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseCreatePost}
      />,
      <RaisedButton
        label="Post"
        primary={true}
        onTouchTap={this.handleCreatePost}
      />,
    ];
    return (
      <div className="create_post">
        <GreenButton onClick={this.handleOpenCreatePost}>Create a Post</GreenButton>

        <Dialog
          className="wysiwyg"
          title="Write a new post"
          actions={actions}
          modal={false}
          open={dialogOpen}
          onRequestClose={this.handleCloseCreatePost}
          contentStyle={{ width: '90%', height: '90%', maxWidth: 'none' }}
          titleStyle={{ padding: '15px 24px 15px' }}
          autoScrollBodyContent={true}
        >
          <div className="create_post__body">
            <TextField
              className="input__group"
              /*errorText={formError.title || null}*/
              floatingLabelText="Title"
              name="title"
              /*ref={ref => {
                formData.InputTitle = ref
              }}*/
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
            >
              <MenuItem value={1} key={1} primaryText="50/50" />
              <MenuItem value={2} key={2} primaryText="49/50" />
            </SelectField>

            <p className="tag_label">Add a maximum of 5 tags</p>
            <Select
              name="tag"
              multi
              onChange={this.handleChangeSelectTag}
              placeholder="Tags..."
            />

            <div className="real_time_preview">
              <h2>Real Time Preview</h2>
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

/*const mapStateToProps = (state, props) => createStructuredSelector({
  user: selectUser(),
});*/

const mapDispatchToProps = dispatch => ({
  uploadFile: (promise, file) => dispatch(uploadFileBegin(promise, file)),
});

export default connect(null, mapDispatchToProps)(PostCreate);
