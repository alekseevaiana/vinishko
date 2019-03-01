import React, {Component} from 'react'
import CalendarsListPage from '../../components/calendar-list-page/calendar-list-page'
import CreateCalendarPage from '../../components/create-calendar-page/create-calendar-page'
import CalendarPage from '../../components/calendar-page/calendar-page'
import './app.css'

const lsKey = 'items'

// получает список календарей и айди какого то календаря
// и возвращает календарь с таким айди из списка
function getCalendarFromCalendarsById(calendars, id) {
  // return calendar
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
      page: 'calendar',
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
        startDate: new Date,
        checkedDates: ['2019-05-13', '2019-05-15'],
      }

      const newCalendars = [
        ...calendars,
        newCalendar,
      ]

      saveItems(newCalendars)

      return {
        calendars: newCalendars,
        page: 'main',
      }
    })
  }

  //
  toggleDay = (currentDate, calendarId) => {
    this.setState((state) => {
      // или const calendars = state.calendars
      const {calendars} = state
      // const calendar = getCalendarFromCalendarsById(calendars, calendarId)

      const theCalendar = calendars.find(cal => cal.id === calendarId)
      // находит нужный календарь объект

      const theCalendarIdx = calendars.indexOf(theCalendar);

      let theCheckedDates = theCalendar.checkedDates
      // массив с отмеченными датами в объекте календаря

      const theDateIndex = theCheckedDates.indexOf(currentDate)
      // возвращает индекс из массива c checkedDates

      const addNewCheckedDate = [
        ...theCheckedDates,
        currentDate,
      ]
      // новый массив с отмеченной датой (старый массив и новое значение взятое из онКлика

      const removeCheckedDate = [
        ...theCheckedDates.slice(0, theDateIndex),
        ...theCheckedDates.slice(theDateIndex + 1),
      ]
      // удаляет чекнутую дату

      if (theDateIndex === -1) {
        // чтобы отметить день, выделить черным
        const newCalendar = {
          ...theCalendar,
          checkedDates: addNewCheckedDate
        }
        //   // это объект копирующий theCalendar с новым свойством theCheckedDates = addNewCheckedDate

        const newCalendars = [
          ...calendars.slice(0, theCalendarIdx),
          newCalendar,
          ...calendars.slice(theCalendarIdx + 1)
        ]
        // это объект со всеми старыми календарями и одним новым календарем newCalendar
        return {
          calendars: newCalendars,
          // вернуть все календари с одним новым
        }
      } else {
        const newCalendar = {
          ...theCalendar,
          checkedDates: removeCheckedDate
        }

        const newCalendars = [
          ...calendars.slice(0, theCalendarIdx),
          newCalendar,
          ...calendars.slice(theCalendarIdx + 1)
        ]

        return {
          calendars: newCalendars,
        }
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
        toggleDay={this.toggleDay}
      />
    }

    return (
      <div>
        {element}
      </div>
    )
  }
}
