import React, {Component} from 'react'
import './calendar-page.css'
import PageHeader from '../../components/page-header/page-header'
import CalendarTable from '../../components/calendar-table/calendar-table'

export default class CalendarPage extends Component {

  render() {
  const {calendar, onArrowBackClick} = this.props;
    return (
      <main className="calendar-page">
        <PageHeader
          pageHeaderCalendarStyle
          onArrowBackClick={onArrowBackClick}
        >{calendar.title}</PageHeader>
        <CalendarTable calendar={calendar}/>
      </main>
    )
  }
}