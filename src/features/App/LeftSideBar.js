import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import IconView from 'material-ui/svg-icons/action/view-quilt';
import IconStar from 'material-ui/svg-icons/toggle/star';
import IconRss from 'material-ui/svg-icons/communication/rss-feed';
import IconAccountCircle from 'material-ui/svg-icons/action/account-circle';
import IconSettings from 'material-ui/svg-icons/action/settings';

import LeftSideBarItem from './components/LeftSideBarItem';
import { selectMe } from '../User/selectors';

function LeftSideBar(props) {
  const { me } = props;
  return (
    <div>
      {me && (
        <aside id="left_sidebar">
          <div>
            <LeftSideBarItem to="/" label="All post" icon={IconView} />
            <LeftSideBarItem to={`/@${me}/feed`} label="Following Feed" icon={IconStar} />
            <LeftSideBarItem to={`/@${me}/blog`} label="My Blog" icon={IconRss} />
          </div>
          <div>
            <LeftSideBarItem to={`/@${me}`} label="Profile" icon={IconAccountCircle} exact={false} />
            <LeftSideBarItem to="#" label="Settings" icon={IconSettings} />
          </div>
        </aside>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  me: selectMe(),
});

export default withRouter(connect(mapStateToProps)(LeftSideBar));
