import React from 'react'
import './page-header.css'
import arrowBack from '../../img/arrow-back.svg'

const PageHeader = ({children, pageHeaderCalendarStyle, onArrowBackClick}) => {

  let classNames = 'page-header';

  if (pageHeaderCalendarStyle) {
    classNames = classNames + ' page-header--calendar'
  }

  return (
    <div className={classNames}>
      <div className="page-header__container">
        <button className="page-header__arrow-back"
          onClick={onArrowBackClick}
        >
          <img src={arrowBack} alt="back"/>
        </button>
        <h2 className="page-header__title">{children}</h2>
      </div>
    </div>
  )
}

export default PageHeader