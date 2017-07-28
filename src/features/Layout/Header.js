import React                         from 'react'
import PropTypes                     from 'prop-types'
import { Link }                      from 'react-router-dom'
import SelectField                   from 'material-ui/SelectField'
import MenuItem                      from 'material-ui/MenuItem'
import Badge                         from 'material-ui/Badge'
import IconButton                    from 'material-ui/IconButton'
import NotificationsIcon             from 'material-ui/svg-icons/social/notifications'
import isEmpty from 'lodash/isEmpty';

import AvatarProgress                from '../../components/AvatarProgress';
import logo                          from '../../styles/assets/imgs/logos/logo.png'

const countriesItems = [];
const COUNTRIES = {
  1 : {
    name: 'afg',
    flag: 'Afghanistan.png'
  },
  2 : {
    name: 'afr',
    flag: 'african_union.png'
  },
  3 : {
    name: 'ala',
    flag: 'aland.png'
  },
};

for(let index in COUNTRIES) {
  countriesItems.push(
    <MenuItem
      className={`icon_flag_${COUNTRIES[index].name}`}
      value={index}
      key={index}
      primaryText={COUNTRIES[index].name}
      label={<span className={`icon_flag icon_flag_${COUNTRIES[index].name}`}>{COUNTRIES[index].name}</span>}
    />
  );
}

const onSelectChange = (event, index, value) => {
  console.log('event', event);
  this.setState(state => { state.filter.category = value })
};

const Header = ({dataFilter, handleSelectPost, handleSelectCategory, handleSelectCountry, handleCreatePost, profileMetadata}) => {
  return (
    <header className="header clearfix">
      <div className="header__group float_left">
        <Link to="/" id="logo">
          <img src={logo} alt="logo"/>
        </Link>
        <div className="search">
          <i className="search__icon material-icons">search</i>
          <input className="search__input" type="text" placeholder="Search for posts" />
        </div>
      </div>

      <div className="header__group header__group--function float_right">
        <button className="btn_default" onClick={handleCreatePost}>Create a Post</button>
        <Badge
          badgeContent={10}
          secondary={true}
          style={{padding: '2px', margin: '0 1rem 0 2rem'}}
          badgeStyle={{top: 31, right: 28, background: '#e26a73' }}
        >
          <IconButton>
            <NotificationsIcon className="notifications" />
          </IconButton>
        </Badge>
        <AvatarProgress src={!isEmpty(profileMetadata) ? profileMetadata.profile.profile_image : ''} progress={75} size="48px" />
      </div>

      <div className="header__group header__group--filter float_right">
        <div className="select_wrapper">
          <SelectField
            value={dataFilter.post}
            onChange={onSelectChange}
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
            value={dataFilter.category}
            onChange={handleSelectCategory}
            className="select_filter"
            maxHeight={400}
            fullWidth={true}
            autoWidth={true}
          >
            <MenuItem value={1} key={1} primaryText="all" />
            <MenuItem value={2} key={2} primaryText="videos only" />
            <MenuItem value={3} key={3} primaryText="articles only" />
          </SelectField>
        </div>
        <div className="select_wrapper">
          <SelectField
            value={dataFilter.country}
            onChange={handleSelectCountry}
            className="select_filter"
            maxHeight={400}
            fullWidth={true}
            autoWidth={true}
          >
            {countriesItems}
          </SelectField>
        </div>
      </div>
    </header>
  )
};

Header.propTypes = {
  dataFilter: PropTypes.object, // object save data filter
  handleSelectPost: PropTypes.func, // handle filter after select Category
  handleSelectCategory: PropTypes.func, // handle filter after select Category
  handleSelectCountry: PropTypes.func, // handle filter after select Country
  handleCreatePost: PropTypes.func, // handle create post
  profileMetadata: PropTypes.object, // source of avatar
};

Header.defaultProps = {
  dataFilter: {
    post: 1,
    category: 1,
    country: "1",
  }, // object save data filter
  handleSelectPost: undefined, // handle filter after select Category
  handleSelectCategory: undefined, // handle filter after select Category
  handleSelectCountry: undefined, // handle filter after select Country
  handleCreatePost: undefined, // handle create post
  profileMetadata: {}, // source of avatar
};

export default Header;
