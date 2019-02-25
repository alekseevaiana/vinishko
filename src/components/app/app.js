import React, {Component} from 'react';
import CalendarsListPage from '../../components/calendar-list-page/calendar-list-page';
import CreateCalendarPage from '../../components/create-calendar-page/create-calendar-page';
import CalendarPage from '../../components/calendar-page/calendar-page';
import './app.css';

const lsKey = 'items'


// достает данные из localstorege
function restoreItems() {
  const dataText = localStorage.getItem(lsKey)

  try {
    const calendars = JSON.parse(dataText)

    return calendars || []
  } catch(e) {
    return []
  }
}

function saveItems(calendars) {
  const dataText = JSON.stringify(calendars);

  localStorage.setItem(lsKey, dataText)
}

function getMaxId(calendars) {
  if (calendars.length === 0) {
    return 0
  }

  const calendarsIds = calendars.map(calendar => calendar.id);


  return Math.max(...calendarsIds);
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'calendar',
      calendars: restoreItems(),
      selectedCalendarId: 1
    }
  }



  goToForm = () => {
    this.setState({page: 'create'})
  }

  goBackToMain = () => {
    this.setState({page: 'main'})
  }

  goToTheCalendar = (calendar) => {
    this.setState({page: 'calendar', selectedCalendarId: calendar.id})
  }

  addItem = (text) => {

    this.setState(({calendars}) => {

      const id = getMaxId(calendars);
      const newId = id + 1;

      const newCalendar = {
        id: newId,
        title: text,
        startDate: '2019-02-12',
        checkedDates: ['2019-02-13', '2019-02-15']
      }

      const newCalendars = [
        ...calendars,
        newCalendar,
      ]

      saveItems(newCalendars);

      return {
        calendars: newCalendars,
        page: 'main'
      }
    })
  }


  render() {
    const {page, calendars, selectedCalendarId} = this.state

    let element
    if (page === 'main') {
      element = <CalendarsListPage
        calendars={calendars}
        onCreateClick={this.goToForm}
        goToTheCalendar={this.goToTheCalendar}
      />
    }

    if (page === 'create') {
      element = <CreateCalendarPage
        onArrowBackClick={this.goBackToMain}
        addItem={this.addItem}
      />
    }

    if (page === 'calendar') {
      const theCalendar = calendars.find(cal => cal.id === selectedCalendarId)
      element = <CalendarPage
        calendar={theCalendar}
        onArrowBackClick={this.goBackToMain}
      />
    }

    return (
      <div>
        {element}
      </div>
    )
  }
}
