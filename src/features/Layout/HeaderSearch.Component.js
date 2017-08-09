import React from 'react'
import PropTypes from 'prop-types'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import CommentCard from '../../components/__common/CommentCard'
import { getClassName } from '../../components/__utilities'


const HeaderSearchComponent = ({
                                 className = "",
                                 showSearchResult,
                                 keySearch,
                                 dataResult,
                                 inputSearchRef,
                                 handleSearch,
                                 handleKeyUpSearch,
                                 handleRemoveSearchKey,
                                 dataSearchFilter,
                                 handleSearchFilterPost,
                                 handleSearchFilterTime,
                                 handleSearchGoAhead,
                               }) => {
  return (
    <div className={`search ${className}`}>
      <i className="search__icon material-icons" onClick={handleSearch}>search</i>
      <input className="search__input" type="text" placeholder="Search for posts"
             ref={inputSearchRef} onKeyUp={handleKeyUpSearch} />

      <div className={getClassName({ hidden: !showSearchResult }, "search__overlay")}>
        <div className="search__result">
          <div className="search__result__head">
            <div className="key_search">
              <h2>{keySearch}<span className="btn_close_search"
                                   onClick={handleRemoveSearchKey}>×</span></h2>
              <p>{dataResult ? dataResult.length : 0} results found</p>
            </div>
            <div className="filter">
              <div className="custom_select">
                <SelectField
                  value={dataSearchFilter.post}
                  onChange={handleSearchFilterPost}
                  className="select"
                  maxHeight={400}
                  fullWidth={true}
                  autoWidth={true}
                >
                  <MenuItem value={1} key={1} primaryText="all post" />
                  <MenuItem value={2} key={2} primaryText="my post" />
                </SelectField>
              </div>
              <div className="custom_select">
                <SelectField
                  value={dataSearchFilter.time}
                  onChange={handleSearchFilterTime}
                  className="select"
                  maxHeight={400}
                  fullWidth={true}
                  autoWidth={true}
                >
                  <MenuItem value={1} key={1} primaryText="2017" />
                  <MenuItem value={2} key={2} primaryText="2016" />
                </SelectField>
              </div>
            </div>
          </div>
          <div className="search__result__body">
            {
              dataResult ? dataResult.map(data =>
                <CommentCard
                  key={data.id}
                  data={data}
                  handleGoAhead={handleSearchGoAhead}
                />
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default HeaderSearchComponent

HeaderSearchComponent.propTypes = {
  className: PropTypes.string,
  showSearchResult: PropTypes.bool,  // state to show search box results
  keySearch: PropTypes.string,  // input that user type
  dataResult: PropTypes.array,  // result after search
  inputSearchRef: PropTypes.any,  // ref of input search
  handleSearch: PropTypes.func,  // function search
  handleKeyUpSearch: PropTypes.func,
  handleRemoveSearchKey: PropTypes.func,  // remove and close search box results
  dataSearchFilter: PropTypes.object,  // state to save filter on search box
  handleSearchFilterPost: PropTypes.func,  // flter post
  handleSearchFilterTime: PropTypes.func,  // flter date time
  handleSearchGoAhead: PropTypes.func,  // handle button on results
};
