import React from 'react';
import './calendars-list.css';

const CalendarsList = ({calendars, goToTheCalendar}) => {

  const calendarItems = calendars.map((calendar) => {
    const handleClick = (event) => {
      event.preventDefault()
      goToTheCalendar(calendar)
    }
    return (
      <li className='calendars-list__item' key={calendar.id}>
        <span className='calendars-list__shape'></span>
        <a
          className="calendars-list__link"
          onClick={handleClick}
        >{calendar.title}</a>
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