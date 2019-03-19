import React, {Component} from 'react'
import './calendar-page.css'
import PageHeader from '../../components/page-header/page-header'
import CalendarTable from '../../components/calendar-table/calendar-table'
import trash from '../../img/trash.png'

export default class CalendarPage extends Component {

  render() {
    const {calendar, onArrowBackClick, toggleDay, deleteItem} = this.props
    return (
      <main className="calendar-page">
        <PageHeader
          pageHeaderCalendarStyle
          onArrowBackClick={onArrowBackClick}
          withDelete={true}
          deleteItem={deleteItem}
          calendar={calendar}
        >{calendar.title}</PageHeader>
        <CalendarTable calendar={calendar}
          toggleDay={toggleDay}
        />
      </main>
    )
  }
}