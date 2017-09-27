import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import steemconnect from 'sc2-sdk';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import IconClose from 'material-ui/svg-icons/navigation/close';

import { selectMe, selectMyAccount } from 'features/User/selectors';
import { selectCurrentCategory, selectCurrentTag } from './selectors';
import { logoutBegin } from 'features/User/actions/logout';

import logo from 'styles/assets/imgs/logos/logo.png'
import PostCreate from 'features/Post/PostCreate';
import AvatarSteemit from 'components/AvatarSteemit';
import GreenButton from 'components/GreenButton';
import HeaderMenu from './components/HeaderMenu';
import Search from '../Search/PostSearchInput';

class Header extends Component {
  static propTypes = {
    me: PropTypes.string.isRequired,
    currentCategory: PropTypes.string.isRequired,
    currentTag: PropTypes.string,
    myAccount: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      filter: {
        post: 1,
        category: "videos",
      },
      dropdownMenu: {
        open: false,
      },
      collapseOpen: false,
    }
  }

  handleShowDropdownMenu = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      dropdownMenu: {
        open: true,
        anchorEl: event.currentTarget,
      }
    })
  };

  handleCloseDropdownMenu = () => {
    this.setState(state => {
      state.dropdownMenu.open = false
    })
  };

  handleControlCollapse = () => {
    this.setState(state => {
      state.collapseOpen = !state.collapseOpen
    })
  };

  render() {
    const { me, myAccount, currentTag, currentCategory } = this.props;
    const { filter, dropdownMenu, collapseOpen } = this.state;
    return (
      <header className="header clearfix">
        <div className="header__group header__group--search float_left">
          <Link to="/" id="logo">
            <img src={logo} alt="logo" />
          </Link>
          <Search />
        </div>
        {me && (
          <div className="header__collapse__control">
            <IconButton onTouchTap={this.handleControlCollapse}>
              {collapseOpen ? <IconClose /> : <IconMenu />}
            </IconButton>
          </div>
        )}
        {me && (
          <div className={`header__collapse collapse ${collapseOpen ? 'in' : ''}`}>
            <SelectField
              style={{ fontSize: '.9rem' }}
              value={currentCategory}
              className="select_filter"
              maxHeight={400}
              autoWidth={true}
            >
              <MenuItem value="trending" key="trending" primaryText={<Link className="menu_link" to={`/trending${currentTag ? `/${currentTag}` : ''}`}>trending</Link>} />
              <MenuItem value="created" key="created" primaryText={<Link className="menu_link" to={`/created${currentTag ? `/${currentTag}` : ''}`}>new</Link>} />
              <MenuItem value="hot" key="hot" primaryText={<Link className="menu_link" to={`/hot${currentTag ? `/${currentTag}` : ''}`}>hot</Link>} />
              {/*<MenuItem value="promoted" key="promoted" primaryText={<Link className="menu_link" to="/promoted">promoted</Link>} />*/}
            </SelectField>
            <SelectField
              style={{ fontSize: '.9rem' }}
              value={filter.category}
              className="select_filter"
              maxHeight={400}
              autoWidth={true}
            >
              <MenuItem value="videos" key={1} primaryText="videos only" />
              <MenuItem value="articles" key={2} primaryText="articles only" />
            </SelectField>
            <SelectField
              style={{ fontSize: '.9rem' }}
              value="EN"
              className="select_filter"
              autoWidth={true}
            >
              <MenuItem value="EN" key={1} primaryText="EN" />
              <MenuItem value="FR" key={2} primaryText="FR" />
            </SelectField>
            <PostCreate />
            <button className="header__group__username"
                    onTouchTap={this.handleShowDropdownMenu}>
              {me}
            </button>
            <div>
              <AvatarSteemit name={me} votingPower={myAccount.voting_power} />
            </div>
            <Popover
              className="header__group__dropdownmenu"
              open={dropdownMenu.open}
              anchorEl={dropdownMenu.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleCloseDropdownMenu}
              onClick={this.handleCloseDropdownMenu}
            >
              <HeaderMenu me={me} logout={this.props.logout} closeMenu={this.handleCloseDropdownMenu} />
            </Popover>
          </div>
        )}
        {!me && (
          <div>
            <div className="connect">
              <a href={steemconnect.getLoginURL()}>
                <GreenButton>Connect</GreenButton>
              </a>
            </div>
          </div>
        )}
      </header>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  me: selectMe(),
  myAccount: selectMyAccount(),
  currentCategory: selectCurrentCategory(),
  currentTag: selectCurrentTag(),
});

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => dispatch(logoutBegin()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
