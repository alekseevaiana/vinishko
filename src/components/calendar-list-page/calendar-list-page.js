import React from 'react'
import './calendar-list-page.css';
import CalendarsList from '../calendars-list/calendars-list';
import Button from '../button/button'

const CalendarsListPage = ({calendars, onCreateClick, goToTheCalendar}) => {

  const handleClick = evt => {
    evt.preventDefault()
    onCreateClick()
  }

  return (
    <main className="calendar-list-page">
      <CalendarsList
        calendars={calendars}
        goToTheCalendar={goToTheCalendar}/>
      <Button onClick={handleClick}>Create</Button>
    </main>
  )
}

export default CalendarsListPage