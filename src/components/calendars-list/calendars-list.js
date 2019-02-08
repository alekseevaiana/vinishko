import React from 'react'
import './calendars-list.css';

const CalendarsList = ({calendars}) => {

  const calendarItems = calendars.map((calendar) => {
    return (
      <li className='calendars-list__item' key={calendar.id}>
        <span className='calendars-list__shape'></span>
        <a href="" className="calendars-list__link">{calendar.title}</a>
        </li>
    )
  })

  return (
    <ul className="calendars-list">
      {calendarItems}
    </ul>
  )
}

export default CalendarsList