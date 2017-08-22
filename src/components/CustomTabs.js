import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'material-ui/Tabs';

const CustomTabs = props => {
  return (
    <Tabs
      tabItemContainerStyle={{ backgroundColor: 'transparent' }}
      inkBarStyle={{ backgroundColor: '#4aa7f4', marginBottom: 15 }}
      {...props}
    >
      {props.children}
    </Tabs>
  )
};

CustomTabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
};

export default CustomTabs;