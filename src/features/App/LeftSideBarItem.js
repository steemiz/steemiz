import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

const COLOR = '#e6e6e6';
const COLOR_HOVER = '#4aa7f4';
const ICON_STYLE = {
  float: 'left',
  margin: '.6rem 0',
};

class LeftSideBarItem extends PureComponent {
  static propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const { to, location: { pathname }} = this.props;
    this.state = {
      isActive: to === pathname,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { to } = this.props;
    const { location: { pathname }} = nextProps;
    this.setState({
      isActive: to === pathname,
    });
  }

  render() {
    const { label, to } = this.props;
    const { isActive } = this.state;
    const Icon = this.props.icon;

    return (
      <div className="link">
        <NavLink className="link__inner" activeClassName="active" to={to} exact>
          <Icon color={isActive ? COLOR_HOVER : COLOR} style={ICON_STYLE} />
          <span>{label}</span>
        </NavLink>
      </div>
    );
  }
}

export default withRouter(LeftSideBarItem);