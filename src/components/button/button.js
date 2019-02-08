import React from 'react'
import './button.css';

const Button = ({onClick, type, children}) => {
 const btnType = type || 'button'
  return (
    <button type={btnType} className='button' onClick={onClick}>
      {children}
    </button>
  )
}

export default Button