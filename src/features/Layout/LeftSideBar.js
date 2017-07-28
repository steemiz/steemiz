import React                    from 'react';
import { Link }                 from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <aside id="left_sidebar">
      <div className="link">
        <Link className="link__inner" to="/posts" >
          <i className="material-icons">sim_card</i>
          <span>Sim Card</span>
        </Link>
      </div>
      <div className="link">
        <Link className="link__inner" to="/profile" >
          <i className="material-icons">star</i>
          <span>Star Rate</span>
        </Link>
      </div>
      <div className="link">
        <Link className="link__inner" to="/1" >
          <i className="material-icons">rss_feed</i>
          <span>Rss Feed</span>
        </Link>
      </div>
      <div className="link">
        <Link className="link__inner" to="/2" >
          <i className="material-icons">local_offer</i>
          <span>Local offer</span>
        </Link>
      </div>

      <div className="link link--account">
        <Link className="link__inner" to="/3" >
          <i className="material-icons">account_circle</i>
          <span>Account</span>
        </Link>
      </div>
      <div className="link link--setting">
        <Link className="link__inner" to="/4" >
          <i className="material-icons">settings</i>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  )
};

export default LeftSidebar;