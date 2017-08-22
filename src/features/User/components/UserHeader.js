import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formatter } from 'steem';
import isEmpty from 'lodash/isEmpty';
import background_url from '../../../styles/assets/imgs/bg.jpg';
import AvatarSteemit from '../../../components/AvatarSteemit';
import UserSteemPower from '../UserSteemPower';
import FollowerCount from '../FollowerCount';

class UserHeader extends PureComponent {
  static propTypes = {
    account: PropTypes.object.isRequired,
  };

  render() {
    const { account } = this.props;
    if (isEmpty(account)) {
      return <div></div>;
    }
    const accountName = account.name;
    const { reputation, post_count } = account;
    const metadata = JSON.parse(account.json_metadata);
    const about = metadata.profile.about;
    const coverImageData = metadata.profile.cover_image;
    const coverImage = coverImageData ? `https://steemitimages.com/1920x1080/${coverImageData}` : background_url;
    return (
      <div className="user"
           style={{ background: `url(${coverImage}) transparent no-repeat center center/cover` }}>
        <div className="user__overlay" />
        <div className="user__wrapper">
          <div className="user__containner">
            <AvatarSteemit name={accountName} size={146} />
          </div>
          <div className="user__info">
            <h2 className="user__info__name">
              {accountName}
              <span>{formatter.reputation(reputation)}</span>
            </h2>
            <p className="user__info__position">{about}</p>
            <div className="user__info__statistics">
              <div className="statistic statistic--steem_power">
                <h3>{account.vesting_shares && <UserSteemPower vestingShares={account.vesting_shares} />}</h3>
                <p>Steem Power</p>
              </div>
              <div className="statistic statistic--posts">
                <h3>{post_count}</h3>
                <p>Posts</p>
              </div>
              <div className="statistic statistic--followers">
                <h3><FollowerCount accountName={accountName} unit="followers" /></h3>
                <p>Followers</p>
              </div>
              <div className="statistic statistic--following">
                <h3><FollowerCount accountName={accountName} unit="followings" /></h3>
                <p>Following</p>
              </div>
              <div className="statistic statistic--buttons">
                <button className="statistic--buttons__message">
                  <i className="material-icons">sms</i>
                </button>
                <button className="btn_default" onClick={this.handleFollow}>Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserHeader;