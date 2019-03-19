import React, {Component} from 'react'
import CalendarsListPage from '../../components/calendar-list-page/calendar-list-page'
import CreateCalendarPage from '../../components/create-calendar-page/create-calendar-page'
import CalendarPage from '../../components/calendar-page/calendar-page'
import './app.css'

const lsKey = 'items'

// получает список календарей и айди какого то календаря
// и возвращает календарь с таким айди из списка
function getCalendarFromCalendarsById(calendars, id) {
  return calendars.find(cal => cal.id === id)
}

function addItemToList(list, item) {
  return [
    ...list,
    item,
  ]
}

function removeDateFromList(dates, date) {
  const dateIndex = dates.indexOf(date)

  return [
    ...dates.slice(0, dateIndex),
    ...dates.slice(dateIndex + 1),
  ]
}

function replaceInArrayByIndex(array, newElement, index) {
  return [
    ...array.slice(0, index),
    newElement,
    ...array.slice(index + 1),
  ]
}


// достает данные из localstorege
function restoreItems() {
  const dataText = localStorage.getItem(lsKey)

  try {
    const calendars = JSON.parse(dataText)

    return calendars || []
  } catch (e) {
    return []
  }
}

function saveItems(calendars) {
  const dataText = JSON.stringify(calendars)

  localStorage.setItem(lsKey, dataText)
}

function getMaxId(calendars) {
  if (calendars.length === 0) {
    return 0
  }

  const calendarsIds = calendars.map(calendar => calendar.id)


  return Math.max(...calendarsIds)
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'main',
      calendars: restoreItems(),
      selectedCalendarId: 1,
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

      const id = getMaxId(calendars)
      const newId = id + 1

      const newCalendar = {
        id: newId,
        title: text,
        startDate: new Date(),
        checkedDates: [],
      }

      const newCalendars = addItemToList(calendars, newCalendar)

      saveItems(newCalendars)

      return {
        calendars: newCalendars,
        page: 'main',
      }
    })
  }

  deleteItem = (calendarId) => {
    this.setState((state) => {
      const {calendars} = state;
      const newCalendars = calendars.filter((calendar) => calendar.id !== calendarId);
      saveItems(newCalendars)
        return {
          calendars: newCalendars,
          page: 'main',
        }
      },
    )
  }


  toggleDay = (currentDate, calendarId) => {
    this.setState((state) => {
      const {calendars} = state

      const theCalendar = getCalendarFromCalendarsById(calendars, calendarId)


      let theCheckedDates = theCalendar.checkedDates

      const isDateAlreadyChecked = theCheckedDates.includes(currentDate)

      const newDatesList = isDateAlreadyChecked ?
        removeDateFromList(theCheckedDates, currentDate) :
        addItemToList(theCheckedDates, currentDate)

      let newCalendar = {
        ...theCalendar,
        checkedDates: newDatesList,
      }

      const theCalendarIdx = calendars.indexOf(theCalendar)

      const newCalendars = replaceInArrayByIndex(calendars, newCalendar, theCalendarIdx)

      saveItems(newCalendars)

      return {
        calendars: newCalendars,
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
      const theCalendar = getCalendarFromCalendarsById(calendars, selectedCalendarId)
      element = <CalendarPage
        calendar={theCalendar}
        onArrowBackClick={this.goBackToMain}
        toggleDay={this.toggleDay}
        deleteItem={this.deleteItem}
      />
    }

    return (
      <div className="container">
        {element}
      </div>
    )
  }
}
