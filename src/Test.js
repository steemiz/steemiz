import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Test extends PureComponent {
  componentDidMount() {
    console.log('test mount');
  }

  render() {
    return (
      <div></div>
    );
  }
}
