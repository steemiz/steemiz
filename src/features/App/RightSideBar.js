import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Tab } from 'material-ui/Tabs';
import CustomTabs from '../../components/CustomTabs';
import FollowersList from '../User/FollowersList';
import FollowingsList from '../User/FollowingsList';
import { selectIsSidebarOpen, selectTrendingTags } from './selectors';
import { selectMe } from '../User/selectors';
import { toggleSidebar } from './actions/sidebar';

const colorActive = '#4aa7f4';
const colorInactive = '#a2a2a3';

class RightSideBar extends Component {
  static propTypes = {
    //myProp: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      tabs1: 'tags',
      tabs2: 'followers',
      tagsShowAll: false,
    };
    this.switchTags = this.switchTab1.bind(this, 'tags');
    this.switchUsers = this.switchTab1.bind(this, 'users');
    this.switchFollowers = this.switchTab2.bind(this, 'followers');
    this.switchFollowing = this.switchTab2.bind(this, 'following');
    this.toggleAllTags = this.toggleAllTags.bind(this);
  }

  switchTab1(tab) {
    this.setState({
      tabs1: tab,
    });
  }

  switchTab2(tab) {
    this.setState({
      tabs2: tab,
    });
  }

  toggleAllTags() {
    this.setState({
      tagsShowAll: !this.state.tagsShowAll,
    });
  }

  render() {
    const { isSidebarOpen, trendingTags, me } = this.props;
    const { tabs1, tabs2, tagsShowAll } = this.state;
    return (
      <aside id="right_sidebar" className={isSidebarOpen ? "-is-open" : ""}>
        <CustomTabs>
          <Tab
            label="Tags"
            buttonStyle={{ color: tabs1 === 'tags' ? colorActive : colorInactive }}
            onActive={this.switchTags}
          >
            <div>
              <div className={`link_wrapper ${tagsShowAll ? 'show_all' : ''}`}>
                {!isEmpty(trendingTags) && trendingTags.map(tag =>
                  <Link key={tag} to={`/trending/${tag}`} className="tab__result--link">{tag}</Link>
                )}
              </div>
              <button className="btn__show_more" onClick={this.toggleAllTags}>
                <i className="material-icons">keyboard_arrow_down</i>
              </button>
            </div>
          </Tab>
          <Tab
            label="Users"
            buttonStyle={{ color: tabs1 === 'users' ? colorActive : colorInactive }}
            onActive={this.switchUsers}
          >
            <div>
              <h2>Tab Two</h2>
              <p>
                This is another example tab.
              </p>
            </div>
          </Tab>
        </CustomTabs>
        <CustomTabs>
          <Tab
            label="Followers"
            buttonStyle={{ color: tabs2 === 'followers' ? colorActive : colorInactive }}
            onActive={this.switchFollowers}
          >
            <div className="chat_list">
              {me && <FollowersList accountName={me} />}
            </div>
          </Tab>
          <Tab
            label="Following"
            buttonStyle={{ color: tabs2 === 'following' ? colorActive : colorInactive }}
            onActive={this.switchFollowing}
          >
            <div className="chat_list">
              {me && <FollowingsList accountName={me} />}
            </div>
          </Tab>
        </CustomTabs>
        <button className="btn_toggle_sidebar" onClick={this.props.toggleSidebar}>
          <i className="material-icons">{isSidebarOpen ? "keyboard_arrow_right" : "keyboard_arrow_left"}</i>
        </button>
      </aside>
    );
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  me: selectMe(),
  isSidebarOpen: selectIsSidebarOpen(),
  trendingTags: selectTrendingTags(),
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch(toggleSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightSideBar);
