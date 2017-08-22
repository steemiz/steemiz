import React from 'react'
import PropTypes from 'prop-types'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { getRegExp } from '../__utilities'
import GreenButton from '../../components/GreenButton';

const CreatePostComponent = ({
                               stateOpen,
                               formData,
                               formError,
                               handleCreatePost,
                               handleCloseCreatePost,
                               handleOpenCreatePost,
                               valueReward,
                               handleSelectReward,
                               handleChangeSelectTag,
                               dataTag,
                               onEditorStateChange,
                               uploadImageCallBack,
                               editorContents
                             }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={handleCloseCreatePost}
    />,
    <RaisedButton
      label="I want to add my post"
      primary={true}
      onTouchTap={handleCreatePost}
    />,
  ];
  return (
    <div className="create_post">
      <GreenButton onClick={handleOpenCreatePost}>Create a Post</GreenButton>

      <Dialog
        title="Write a new post"
        actions={actions}
        modal={false}
        open={stateOpen}
        onRequestClose={handleCloseCreatePost}
        contentStyle={{ width: '90%', height: '90%', maxWidth: 'none' }}
        titleStyle={{ padding: '15px 24px 15px' }}
        autoScrollBodyContent={true}
      >
        <div className="create_post__body">
          <TextField
            className="input__group"
            errorText={formError.title || null}
            floatingLabelText="Title"
            name="title"
            ref={ref => {
              formData.InputTitle = ref
            }}
          />
          <Editor
            hashtag={{}}
            editorState={editorContents[0]}
            toolbarClassName="create_post__toolbar"
            wrapperClassName="create_post__wrapper"
            editorClassName="create_post__editor"
            onEditorStateChange={onEditorStateChange(0)}
            toolbar={{ image: { uploadCallback: uploadImageCallBack } }}
          />

          <SelectField
            floatingLabelText="Rewards"
            value={valueReward}
            onChange={handleSelectReward}
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
            options={dataTag.options}
            onChange={handleChangeSelectTag}
            value={dataTag.value}
            placeholder="Tags..."
          />

          <div className="real_time_preview">
            <h2>Real Time Preview</h2>
            <div
              dangerouslySetInnerHTML={{ __html: editorContents[0] && draftToHtml(convertToRaw(editorContents[0].getCurrentContent())) }}></div>
          </div>
        </div>
      </Dialog>
    </div>
  )
};

CreatePostComponent.propTypes = {
  stateOpen: PropTypes.bool, // state for opening Create Post popup
  formData: PropTypes.object, // data of form
  formError: PropTypes.object, // error of form
  handleCreatePost: PropTypes.func, // handle CREATE A POST
  handleCloseCreatePost: PropTypes.func, // function to close Create Post popup
  handleOpenCreatePost: PropTypes.func, // function to open Create Post popup
  valueReward: PropTypes.number, // value of select Reward
  handleSelectReward: PropTypes.func, // handle select Reward
  handleChangeSelectTag: PropTypes.func, // function handle add or remove tag
  dataTag: PropTypes.object, // data of Tag field
  onEditorStateChange: PropTypes.func, // on Edit wysiwyg
  uploadImageCallBack: PropTypes.func, // handle upload image for wysiwyg
  editorContents: PropTypes.array, // state of wysiwyg
};

const uploadImageCallBack = (file) => {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);

      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });

      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
};

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: {},
      open: false,
      editorContents: [],
      valueReward: 1,
      dataTag: {
        value: null,
        options: [
          { value: 1, label: 'One' },
          { value: 2, label: 'Two' },
          { value: 3, label: 'Three' },
          { value: 4, label: 'Four' },
          { value: 5, label: 'Five' },
          { value: 6, label: 'Six' },
        ]
      }
    };

    this.formData = {}
  }

  handleCloseCreatePost = () => {
    this.setState(state => {
      state.open = false
    })
  };

  handleOpenCreatePost = () => {
    this.setState(state => {
      state.open = true
    })
  };

  handleChangeSelectTag = (tagSelected) => {
    console.log(tagSelected);
    console.log(tagSelected.length);

    let maxSelectedOptions = 5;
    if (tagSelected.length <= maxSelectedOptions) {
      this.setState(state => {
        state.dataTag.value = tagSelected
      })
    }
  };

  handleSelectReward = (event, index, value) => {
    this.setState(state => {
      state.valueReward = value
    })
  };

  handleEditorStateChange = (index) => (editorContent) => {
    let editorContents = this.state.editorContents;
    editorContents[index] = editorContent;
    editorContents = [...editorContents];
    this.setState(state => {
      state.editorContents = editorContents
    })
  };

  handleCreatePost = () => {
    console.log("handleCreatePost");

    // let countError = 0
    let data = {};

    let inputTitle = this.formData.InputTitle.input;
    if (!getRegExp.typeString().test(inputTitle.value)) {
      // countError++
      this.setState((state) => {
        state.formError[inputTitle.name] = "Title is not null."
      })
    } else {
      this.setState((state) => {
        state.formError[inputTitle.name] = null
      })
    }

    data.title = inputTitle.value;

    data.post = this.state.editorContents[0] ? draftToHtml(convertToRaw(this.state.editorContents[0].getCurrentContent())) : null;

    data.reward = this.state.valueReward;

    data.tag = this.state.dataTag.value;

    console.log(data)
  };

  render() {
    return (
      <CreatePostComponent
        formData={this.formData}
        formError={this.state.formError}
        handleCreatePost={this.handleCreatePost}
        handleCloseCreatePost={this.handleCloseCreatePost}
        handleOpenCreatePost={this.handleOpenCreatePost}
        valueReward={this.state.valueReward}
        handleSelectReward={this.handleSelectReward}
        stateOpen={this.state.open}
        handleChangeSelectTag={this.handleChangeSelectTag}
        dataTag={this.state.dataTag}
        onEditorStateChange={this.handleEditorStateChange}
        editorContents={this.state.editorContents}
        uploadImageCallBack={uploadImageCallBack}
      />
    )
  }
}