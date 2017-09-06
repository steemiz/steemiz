import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import IconNavBefore from 'material-ui/svg-icons/image/navigate-before';
import IconNavNext from 'material-ui/svg-icons/image/navigate-next';

const SideBarNav = ({ changePage, page, isEndPage }) => {
  return (
    <div className="nav">
      <IconButton onClick={() => changePage(page - 1)} disabled={page === 1}>
        <IconNavBefore />
      </IconButton>
      <IconButton onClick={() => changePage(page + 1)} disabled={isEndPage}>
        <IconNavNext />
      </IconButton>
    </div>
  )
};

SideBarNav.propTypes = {
  changePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  isEndPage: PropTypes.bool.isRequired,
};

export default SideBarNav;
