import React from 'react'
import './page-header.css';
import arrowBack from '../../img/arrow-back.svg'

const PageHeader = ({onCreateClick}) => {

  const handleClick = evt => {
    evt.preventDefault()
    onCreateClick()
  }

  return (
    <div className="page-header">
      <button className="page-header__arrow-back"
        onClick={handleClick}
      >
        <img src={arrowBack} alt="back"/>
      </button>
      <h2 className="page-header__title">New</h2>
    </div>
  )
}

export default PageHeader