import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import { COLOR, COLOR_HOVER } from 'styles/icons';

const ICON_STYLE = {
  margin: '0 1.2rem 0 0.2rem',
};

export default class HeaderMenuItem extends PureComponent {
  static defaultProps = {
    to: '#',
    onClick: undefined,
  };

  static propTypes = {
    to: PropTypes.string,
    label: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  enter = () => {
    this.setState({
      hover: true,
    });
  };

  leave = () => {
    this.setState({
      hover: false,
    });
  };

  render() {
    const { hover } = this.state;
    const Icon = this.props.icon;
    return (
      <MenuItem onMouseEnter={this.enter} onMouseLeave={this.leave}>
        <Link to={this.props.to} onClick={this.props.onClick}>
          <Icon style={ICON_STYLE} color={hover ? COLOR_HOVER : COLOR} />{this.props.label}
        </Link>
      </MenuItem>
    );
  }
}
