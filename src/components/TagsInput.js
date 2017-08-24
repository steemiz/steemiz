import React from 'react';
import PropTypes from 'prop-types';
import ReactTagsInput from 'react-tagsinput';
import TextField from 'material-ui/TextField';
import './TagsInput.css';

const renderInput = (props) => {
  const {onChange, value, addTag, ...other} = props;
  return (
    <TextField
      onChange={onChange}
      value={value} {...other}
      floatingLabelText="Tags (maximum of 5)"
      placeholder=""
      fullWidth
    />
  )
};

const renderLayout = (tagComponents, inputComponent) => {
  return (
    <div>
      {inputComponent}
      {tagComponents}
    </div>
  )
};

const TagsInput = ({ value, onChange }) => {
  return (
    <ReactTagsInput
      value={value}
      onChange={onChange}
      renderInput={renderInput}
      renderLayout={renderLayout}
      removeKeys={[]}
      maxTags={5}
      onlyUnique
    />
  )
};

TagsInput.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TagsInput;
