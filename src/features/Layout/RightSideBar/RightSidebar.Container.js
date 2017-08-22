import React from 'react'
import TabSearchTopContainer from './TabSearchTop.Container'
import TabSearchBottomContainer from './TabSearchBottom.Container'

export default class RightSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenSideBar: false,
    }
  }

  updatePositionSideBar = () => {
    this.setState({
      isOpenSideBar: window.innerWidth > 1200
    })
  };

  componentWillMount() {
    //this.updatePositionSideBar()
  }

  componentDidMount() {
    //window.addEventListener("resize", this.updatePositionSideBar);
  }

  componentWillUnmount() {
    //window.removeEventListener("resize", this.updatePositionSideBar);
  }

  handleToggleSideBar = () => {
    // width of SideBar is 22rem
    document.getElementById("app_content").style.paddingRight = this.state.isOpenSideBar ? 0 : "22rem";

    this.setState(state => {
      state.isOpenSideBar = !state.isOpenSideBar
    })
  };

  render() {
    return (
      <aside id="right_sidebar" className={this.state.isOpenSideBar ? "-is-open" : ""}>
        <TabSearchTopContainer />
        <TabSearchBottomContainer />

        <button className="btn_toggle_sidebar" onClick={this.handleToggleSideBar}>
          <i
            className="material-icons">{this.state.isOpenSideBar ? "keyboard_arrow_right" : "keyboard_arrow_left"}</i>
        </button>
      </aside>
    )
  }
}