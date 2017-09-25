import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import IconNotification from 'material-ui/svg-icons/social/notifications';
import IconAccountCircle from 'material-ui/svg-icons/action/account-circle';
import IconMail from 'material-ui/svg-icons/communication/mail-outline';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconQuestion from 'material-ui/svg-icons/action/question-answer';
import IconPower from 'material-ui/svg-icons/action/power-settings-new';
import HeaderMenuItems from './HeaderMenuItem';

const HeaderMenu = ({ me, logout, closeMenu }) => {
  return (
    <Menu>
      <HeaderMenuItems to="#" label="Notifications" icon={IconNotification} onClick={closeMenu} />
      <HeaderMenuItems to={`/@${me}`} label="My Profile" icon={IconAccountCircle} onClick={closeMenu} />
      <HeaderMenuItems to="#" label="Transactions" icon={IconMail} onClick={closeMenu} />
      <Divider />
      <HeaderMenuItems to="#" label="Settings" icon={IconSettings} onClick={closeMenu} />
      <HeaderMenuItems to="#" label="Support" icon={IconQuestion} onClick={closeMenu} />
      <Divider />
      <HeaderMenuItems to="#" onClick={() => { logout(); closeMenu(); }} label="Sign Out" icon={IconPower} />
    </Menu>
  )
};

HeaderMenu.propTypes = {
  me: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default HeaderMenu;
