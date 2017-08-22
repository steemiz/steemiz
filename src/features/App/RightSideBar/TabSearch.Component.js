import React from 'react'
import PropTypes from 'prop-types'
import { getClassName } from '../../../components/__utilities/index'

const TabSearchComponent = ({
                              className,
                              titleArr,
                              titleActive = 1,
                              handleChooseTab,
                              handleOnClickSearch,
                              placeholderSearch,
                              inputSearchRef,
                              handleKeyUpSearch,
                              handleOptions,
                              handleShowMore,
                              children
                            }) => {
  return (
    <div className={`tab ${className}`}>
      <div className="tab__title">
        {
          titleArr.map(title => {
            return (
              <p
                className={getClassName({ active: titleActive === title.id }, 'tab__key')}
                key={title.id}
                onClick={handleChooseTab(title)}
              >
                {title.name}
              </p>
            )
          })
        }
      </div>
      <div className="tab__search">
        <i className="icon material-icons" onClick={handleOnClickSearch}>search</i>
        <input className="input" type="text" ref={inputSearchRef} placeholder={placeholderSearch}
               onKeyUp={handleKeyUpSearch} />
        <button className="btn__options" onClick={handleOptions}>...</button>
      </div>
      <div className="tab__result">
        {children}
      </div>
      <button className="btn__show_more" onClick={handleShowMore}><i className="material-icons">keyboard_arrow_down</i>
      </button>
    </div>
  )
};

export default TabSearchComponent

TabSearchComponent.propTypes = {
  className: PropTypes.string,
  titleArr: PropTypes.array, // Array of tab title
  titleActive: PropTypes.number, // id of tab title active
  handleChooseTab: PropTypes.func,
  handleOnClickSearch: PropTypes.func,
  placeholderSearch: PropTypes.string,
  inputSearchRef: PropTypes.any,
  handleKeyUpSearch: PropTypes.func,
  handleOptions: PropTypes.func,
  handleShowMore: PropTypes.func,
  children: PropTypes.node,
};