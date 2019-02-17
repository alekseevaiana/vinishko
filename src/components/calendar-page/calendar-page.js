import React, {Component} from 'react'
import './calendar-page.css'
import PageHeader from '../../components/page-header/page-header'
import CalendarTable from '../../components/calendar-table/calendar-table'

export default class CalendarPage extends Component {

  render() {

    return (
      <main className="calendar-page">
        <PageHeader/>
        <CalendarTable/>
      </main>
    )
  }
}