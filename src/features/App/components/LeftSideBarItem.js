import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { COLOR, COLOR_HOVER } from 'styles/icons';

const ICON_STYLE = {
  float: 'left',
  margin: '.6rem 0',
};

function LeftSideBarItem(props) {
  const { label, to, exact, location: { pathname } } = props;
  const isActive = exact ? pathname === to : pathname.indexOf(to) === 0;
  const Icon = props.icon;

  return (
    <div className="link">
      <NavLink className="link__inner" activeClassName="active" to={to} exact={exact}>
        <Icon color={isActive ? COLOR_HOVER : COLOR} style={ICON_STYLE} />
        <span>{label}</span>
      </NavLink>
    </div>
  );
}

LeftSideBarItem.defaultProps = {
  exact: true,
};

LeftSideBarItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  onClick: PropTypes.func,
};

export default withRouter(LeftSideBarItem);