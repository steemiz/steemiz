import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import steemconnect from 'utils/steemconnect';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import IconClose from 'material-ui/svg-icons/navigation/close';

import { selectMe, selectMyAccount } from 'features/User/selectors';
import { selectCurrentCategory } from './selectors';
import { logoutBegin } from 'features/User/actions/logout';

import logo from 'styles/assets/imgs/logos/logo.png'
import PostCreate from 'features/Post/PostCreate';
import AvatarSteemit from 'components/AvatarSteemit';
import GreenButton from 'components/GreenButton';

import { COUNTRIES } from 'constants/constants'
import HeaderMenu from './components/HeaderMenu';

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

class Header extends Component {
  static propTypes = {
    me: PropTypes.string.isRequired,
    currentCategory: PropTypes.string.isRequired,
    myAccount: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super();

    this.state = {
      filter: {
        post: 1,
        category: "videos",
        country: "1",
      },
      dropdownMenu: {
        open: false,
      },
      collapseOpen: false,
      category: props.currentCategory,
    }
  }
  
  componentWillReceiveProps(nextProps) {
    // CANNOT SET CATEGORY DIRECTLY FROM currentCategory
    // BECAUSE currentCategory CAN EQUAL 'blog' OR 'feed'
    // (something different from select options)
    if (['created', 'hot', 'trending'].indexOf(nextProps.currentCategory) >= 0) {
      this.setState({ category: nextProps.currentCategory });
    }
  }

  handleSelectCountry = (event, index, value) => {
    this.setState(state => {
      state.filter.country = value
    })
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
    const { me, myAccount } = this.props;
    const { filter, dropdownMenu, collapseOpen, category } = this.state;
    return (
      <header className="header clearfix">
        <div className="header__group header__group--search float_left">
          <Link to="/" id="logo">
            <img src={logo} alt="logo" />
          </Link>
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
              value={category}
              className="select_filter"
              maxHeight={400}
              fullWidth={true}
              autoWidth={true}
            >
              <MenuItem value="trending" key="trending" primaryText={<Link className="menu_link" to="/trending">trending</Link>} />
              <MenuItem value="created" key="created" primaryText={<Link className="menu_link" to="/created">new</Link>} />
              <MenuItem value="hot" key="hot" primaryText={<Link className="menu_link" to="/hot">hot</Link>} />
              {/*<MenuItem value="promoted" key="promoted" primaryText={<Link className="menu_link" to="/promoted">promoted</Link>} />*/}
            </SelectField>
            <SelectField
              value={filter.category}
              className="select_filter"
              maxHeight={400}
              fullWidth={true}
              autoWidth={true}
            >
              <MenuItem value="videos" key={1} primaryText="videos only" />
              <MenuItem value="articles" key={2} primaryText="articles only" />
            </SelectField>
            <SelectField
              value={filter.country}
              onChange={this.handleSelectCountry}
              className="select_filter"
              fullWidth={true}
              autoWidth={true}
            >
              {countriesItems}
            </SelectField>
            <PostCreate />
            <button className="header__group__username"
                    onTouchTap={this.handleShowDropdownMenu}>
              {me}
            </button>
            <div>
              <AvatarSteemit name={me} size={48} votingPower={myAccount.voting_power} />
            </div>
            <Popover
              className="header__group__dropdownmenu"
              open={dropdownMenu.open}
              anchorEl={dropdownMenu.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleCloseDropdownMenu}
            >
              <HeaderMenu me={me} logout={this.props.logout} />
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
});

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => dispatch(logoutBegin()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
