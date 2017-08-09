import React from 'react'
import HeaderSearchComponent from './HeaderSearch.Component'


const dummyData = [
  {
    id: 1,
    link: "#",
    title: "Sodales vel efficitur id feugiat in",
    content: "Aliquam gravidia, massa faucibus posuere eleifenvidia, massa faucibus posuere eleifenvidia, massa faucibus posuere eleifenvidia, massa faucibus posuere eleifend, ante justoAliquam gravidia, massa faucibus posuere eleifend, ante justo",
    author: {
      name: "Elie Rotschild",
      rate: 56,
    },
    created_at: "5 days ago",
    tagLink: "#",
    tag: "technology",
    price: 731.11,
    like: 123,
    comment: 21,
  },
  {
    id: 2,
    link: "#",
    title: "Sodales vel efficitur id feugiat in",
    content: "Aliquam gravidia, massa faucibus posuere eleifend, ante justoAliquam gravidia, massa faucibus posuere eleifend, ante justo",
    author: {
      name: "Elie Rotschild",
      rate: 56,
    },
    created_at: "5 days ago",
    tagLink: "#",
    tag: "technology",
    price: 731.11,
    like: 123,
    comment: 21,
  },
  {
    id: 3,
    link: "#",
    title: "Sodales vel efficitur id feugiat in",
    content: "Aliquam gravidia, massa faucibus posuere eleifend, ante justoAliquam gravidia, massa faucibus posuere eleifend, ante justo",
    author: {
      name: "Elie Rotschild",
      rate: 56,
    },
    created_at: "5 days ago",
    tagLink: "#",
    tag: "technology",
    price: 731.11,
    like: 123,
    comment: 21,
  },
  {
    id: 4,
    link: "#",
    title: "Sodales vel efficitur id feugiat in",
    content: "Aliquam gravidia, massa faucibus posuere eleifend, ante justoAliquam gravidia, massa faucibus posuere eleifend, ante justo",
    author: {
      name: "Elie Rotschild",
      rate: 56,
    },
    created_at: "5 days ago",
    tagLink: "#",
    tag: "technology",
    price: 731.11,
    like: 123,
    comment: 21,
  },
];

export default class HeaderSearch extends React.Component {
  search = () => {
    this.setState(state => {
      state.showSearchResult = true;
      state.keySearch = this.textSearch;
      state.dataResult = dummyData
    })
  };
  handleKeyUpSearch = (event) => {
    this.textSearch = this.inputSearchEl.value;

    if (event.keyCode === 13) {
      this.search()
    }
  };
  handleRemoveSearchKey = () => {
    console.log("handleRemoveSearchKey");
    this.setState(state => {
      state.showSearchResult = false
    })
  };
  handleSearchFilterPost = (event, index, value) => {
    this.setState(state => {
      state.searchFilter.post = value
    })
  };
  handleSearchFilterTime = (event, index, value) => {
    this.setState(state => {
      state.searchFilter.time = value
    })
  };
  handleSearchGoAhead = () => {
    console.log("handleSearchGoAhead")
  };

  constructor(props) {
    super(props);

    this.state = {
      searchFilter: {
        post: 1,
        time: 1,
      },
      showSearchResult: false,
      keySearch: null,
      dataResult: null
    };

    this.inputSearchRef = null;

    this.textSearch = null
  }

  render() {
    return (
      <HeaderSearchComponent
        showSearchResult={this.state.showSearchResult}
        keySearch={this.state.keySearch}
        dataResult={this.state.dataResult}
        inputSearchRef={el => this.inputSearchEl = el}
        handleSearch={this.search}
        handleKeyUpSearch={this.handleKeyUpSearch}
        handleRemoveSearchKey={this.handleRemoveSearchKey}
        dataSearchFilter={this.state.searchFilter}
        handleSearchFilterPost={this.handleSearchFilterPost}
        handleSearchFilterTime={this.handleSearchFilterTime}
        handleSearchGoAhead={this.handleSearchGoAhead}
      />
    )
  }
}