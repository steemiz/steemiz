import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { COLOR, COLOR_HOVER } from 'styles/icons';

const ICON_STYLE = {
  float: 'left',
  margin: '.6rem 0',
};

class LeftSideBarItem extends PureComponent {
  static propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    exact: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    exact: true,
  };

  render() {
    const { label, to, exact, location: { pathname } } = this.props;
    const isActive = exact ? pathname === to : pathname.indexOf(to) === 0;
    const Icon = this.props.icon;

    return (
      <div className="link">
        <NavLink className="link__inner" activeClassName="active" to={to} exact={exact}>
          <Icon color={isActive ? COLOR_HOVER : COLOR} style={ICON_STYLE} />
          <span>{label}</span>
        </NavLink>
      </div>
    );
  }
}

export default withRouter(LeftSideBarItem);