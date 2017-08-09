import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import avatar from '../../../styles/assets/imgs/users/chris.png'

import TabSearchComponent from './TabSearch.Component'
import UserContactComponent from './UserContact.Component'

const dummyDataResult = (
  <ul className="chat_list">
    <li>
      <Link to="#" className="user_contact">
        <Avatar src={avatar} className="user_contact__avatar" />
        <div className="user_contact__data">
          <h3>Diana Blume <span>88</span></h3>
          <p><i className="user_contact__status active" />tiam elementum erat identify</p>
        </div>
        <button className="btn_unfollow">Unfollow</button>
      </Link>
    </li>
    <li>
      <Link to="#" className="user_contact">
        <Avatar src={avatar} className="user_contact__avatar" />
        <div className="user_contact__data">
          <h3>Diana Blume <span>88</span></h3>
          <p><i className="user_contact__status active"></i>tiam elementum erat identify</p>
        </div>
        <button className="btn_unfollow">Unfollow</button>
      </Link>
    </li>
    <li>
      <Link to="#" className="user_contact">
        <Avatar src={avatar} className="user_contact__avatar" />
        <div className="user_contact__data">
          <h3>Diana Blume <span>88</span></h3>
          <p><i className="user_contact__status" />tiam elementum erat identify</p>
        </div>
        <button className="btn_unfollow">Unfollow</button>
      </Link>
    </li>
  </ul>
);

export default class TabSearchBottomContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: 2,
      dataSearch: dummyDataResult // store data to render
    };

    this.titleArr = [
      {
        id: 1,
        name: "Followers"
      },
      {
        id: 2,
        name: "Following"
      },
    ];

    this.dummyUserData = [
      {
        id: 1,
        avatar: avatar,
        name: "Diana Blume",
        rate: 32,
        message: "tiam elementum erat identify",
        num_new_message: 5,
        active: true,
      },
      {
        id: 2,
        avatar: avatar,
        name: "Christian",
        rate: 77,
        message: "Today is the best day",
        num_new_message: 8,
        active: true,
      },
      {
        id: 3,
        avatar: avatar,
        name: "Andy Caroll",
        rate: 32,
        message: "tiam elementum erat identify",
        num_new_message: 5,
        active: false,
      },
    ];

    this.inputSearchRef = null;

    this.textSearch = null
  }

  handleKeyUpSearch = (event) => {
    console.log(event);
    this.textSearch = this.inputSearchEl.value;

    if (event.keyCode === 13) {
      this.search()
    }
  };

  search = () => {
    console.log("search for: " + this.textSearch)
  };

  handleOptions = () => {
    console.log("handleOptions")
  };

  handleShowMore = () => {
    console.log("handleShowMore")
  };

  handleUnfollow = (e) => {
    e.preventDefault();
    console.log("handleUnfollow")
  };

  handleChooseTab = (item) => (e) => {
    console.log("handleChooseTab");
    this.setState(state => {
      state.tabActive = item.id;

      state.dataSearch = (item.id === 1) ? (
        <ul className="chat_list">
          {
            this.dummyUserData.map(userData => {
              return (
                <li key={userData.id}>
                  <UserContactComponent userData={userData} handleUnfollow={this.handleUnfollow} />
                </li>
              )
            })
          }
        </ul>
      ) : (
        dummyDataResult
      )
    })
  };

  render() {
    return (
      <TabSearchComponent
        className="tab--bottom"
        titleArr={this.titleArr}
        titleActive={this.state.tabActive}
        handleChooseTab={this.handleChooseTab}
        handleOnClickSearch={this.search}
        placeholderSearch="people & tags"
        inputSearchRef={el => this.inputSearchEl = el}
        handleKeyUpSearch={this.handleKeyUpSearch}
        handleChangeInputSearch={this.handleChangeInputSearch}
        handleOptions={this.handleOptions}
        handleShowMore={this.handleShowMore}
      >
        {this.state.dataSearch}
      </TabSearchComponent>
    )
  }
}