import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import IconView from 'material-ui/svg-icons/action/view-quilt';
import IconStar from 'material-ui/svg-icons/toggle/star';
import IconRss from 'material-ui/svg-icons/communication/rss-feed';
import IconAccountCircle from 'material-ui/svg-icons/action/account-circle';
import IconSettings from 'material-ui/svg-icons/action/settings';

import LeftSideBarItem from './LeftSideBarItem';
import { selectMe } from '../User/selectors';

class LeftSideBar extends Component {
  render() {
    const { me } = this.props;
    return (
      <aside id="left_sidebar">
        <div>
          <LeftSideBarItem to="/" label="All post" icon={IconView} />
          <LeftSideBarItem to="/feed" label="Following Feed" icon={IconStar} />
          <LeftSideBarItem to="/blog" label="My Blog" icon={IconRss} />
        </div>
        {me && (
          <div>
            <LeftSideBarItem to={`/@${me}`} label="Profile" icon={IconAccountCircle} exact={false} />
            <LeftSideBarItem to="/settings" label="Settings" icon={IconSettings} />
          </div>
        )}
      </aside>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  me: selectMe(),
});

export default withRouter(connect(mapStateToProps)(LeftSideBar));
