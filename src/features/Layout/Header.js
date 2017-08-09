import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

import logo from '../../styles/assets/imgs/logos/logo.png'
import HeaderSearch from './HeaderSearch.Container'
import CreatePost from '../../components/__common/CreatePost'
import AvatarProgress from '../../components/__common/AvatarProgress'

import { COUNTRIES } from '../../constants/constants'
import { getClassName } from '../../components/__utilities'

const countriesItems = Object.keys(COUNTRIES).map(index => (
  <MenuItem
    className={`icon_flag icon_flag_${COUNTRIES[index].flag}`}
    value={index}
    key={index}
    primaryText={COUNTRIES[index].name}
    label={<span
      className={`selected_flag icon_flag_${COUNTRIES[index].flag}`}>{COUNTRIES[index].name}</span>}
  />
));

export default class Header extends React.Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      filter: {
        post: 1,
        category: 1,
        country: "1",
      },
      dropdownMenu: {
        open: false,
      },
      collapseOpen: false,
    }
  }

  handleSelectPost = (event, index, value) => {
    this.setState(state => { state.filter.post = value })
  };

  handleSelectCategory = (event, index, value) => {
    this.setState(state => { state.filter.category = value })
  };

  handleSelectCountry = (event, index, value) => {
    this.setState(state => { state.filter.country = value })
  };

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
    this.setState( state => { state.dropdownMenu.open = false })
  };

  handleControlCollapse = () => {
    this.setState( state => { state.collapseOpen = !state.collapseOpen })
  };

  render() {
    const { avatar, name } = this.props;
    const { filter, dropdownMenu, collapseOpen } = this.state;
    return (
      <header className="header clearfix">
        <div className="header__group header__group--search float_left">
          <Link to="/" id="logo">
            <img src={logo} alt="logo" />
          </Link>

          <HeaderSearch />
        </div>

        <div className="header__collapse__control">
          <IconButton onTouchTap={this.handleControlCollapse}><i
            className="material-icons">{collapseOpen ? "close" : "menu"}</i></IconButton>
        </div>

        <div
          className={getClassName({ in: collapseOpen }, "header__collapse collapse clearfix float_right")}>
          <div className="header__group header__group--function float_right">
            <CreatePost />

            <Badge
              badgeContent={10}
              secondary={true}
              style={{ padding: '2px', margin: '0 0rem 0 1rem' }}
              badgeStyle={{
                top: 30,
                right: 28,
                background: '#e26a73',
                width: "20px",
                height: "20px",
                "fontSize": "11px"
              }}
            >
              <IconButton>
                <NotificationsIcon className="notifications" />
              </IconButton>
            </Badge>
            <button className="header__group__username" onTouchTap={this.handleShowDropdownMenu}>
              {name}
            </button>
            <AvatarProgress src={avatar} progress={75} size="48px" />
            <Popover
              className="header__group__dropdownmenu"
              open={dropdownMenu.open}
              anchorEl={dropdownMenu.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleCloseDropdownMenu}
            >
              <Menu>
                <MenuItem><Link to="#"><i
                  className="material-icons">notifications</i>Notifications</Link></MenuItem>
                <MenuItem><Link to="#"><i
                  className="material-icons">sms</i>Blog</Link></MenuItem>
                <MenuItem><Link to="#"><i
                  className="material-icons">account_circle</i>My Profile</Link></MenuItem>
                <MenuItem><Link to="#"><i
                  className="material-icons">mail_outline</i>Transactions</Link></MenuItem>
                <MenuItem className="divider"><Link to="#"><i
                  className="material-icons">settings</i>Settings</Link></MenuItem>
                <MenuItem><Link to="#"><i
                  className="material-icons">question_answer</i>Support</Link></MenuItem>
                <MenuItem className="divider"><Link to="#"><i
                  className="material-icons">power_settings_new</i>Sign Out
                  <span>Switch User</span></Link></MenuItem>
              </Menu>
            </Popover>
          </div>

          <div className="header__group header__group--filter float_right">
            <div className="select_wrapper">
              <SelectField
                value={filter.post}
                onChange={this.handleSelectPost}
                className="select_filter"
                maxHeight={400}
                fullWidth={true}
                autoWidth={true}
              >
                <MenuItem value={1} key={1} primaryText="all posts" />
                <MenuItem value={2} key={2} primaryText="my posts" />
              </SelectField>
            </div>
            <div className="select_wrapper">
              <SelectField
                value={filter.category}
                onChange={this.handleSelectCategory}
                className="select_filter"
                maxHeight={400}
                fullWidth={true}
                autoWidth={true}
              >
                <MenuItem value={1} key={1} primaryText="videos only" />
                <MenuItem value={2} key={2} primaryText="articles only" />
              </SelectField>
            </div>
            <div className="select_wrapper select_wrapper--country">
              <SelectField
                value={filter.country}
                onChange={this.handleSelectCountry}
                className="select_filter"
                fullWidth={true}
                autoWidth={true}
              >
                {countriesItems}
              </SelectField>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
