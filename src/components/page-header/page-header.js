import React from 'react'
import './page-header.css'
import arrowBack from '../../img/arrow-back.svg'
import trash from '../../img/trash.png'

const PageHeader = ({children, pageHeaderCalendarStyle, onArrowBackClick, withDelete, deleteItem, calendar}) => {

  let classNames = 'page-header'

  if (pageHeaderCalendarStyle) {
    classNames = classNames + ' page-header--calendar'
  }

  let trashElement
  if (withDelete) {
    trashElement =  <div onClick={() => deleteItem(calendar.id)}>
      <img src={trash} alt="delete" width="40px" height="40px"/>
    </div>
  }

  return (
    <div className={classNames}>
      <div className="page-header__container">
        <button className="page-header__arrow-back"
          onClick={onArrowBackClick}
        >
          <img src={arrowBack} alt="back"/>
        </button>
        <div className="page-header__wrapper-right">
          <h2 className="page-header__title">{children}</h2>
            {trashElement}
        </div>
      </div>
    </div>
  )
}

export default PageHeader