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
      page: 'main',
      calendars: restoreItems()
    }
  }



  goToForm = () => {
    this.setState({page: 'create'})
  }

  goBackToMain = () => {
    this.setState({page: 'main'})
  }

  addItem = (text) => {

    this.setState(({calendars}) => {

      const id = getMaxId(calendars);
      const newId = id + 1;

      const newCalendar = {
        id: newId,
        title: text,
        startDate: '12.01.2019',
        checkedDate: '12.01.2019'
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
    const {page, calendars} = this.state

    let element
    if (page === 'main') {
      element = <CalendarsListPage
        calendars={calendars}
        onCreateClick={this.goToForm}
      />
    }

    if (page === 'create') {
      element = <CreateCalendarPage
        onCreateClick={this.goBackToMain}
        addItem={this.addItem}
      />
    }

    if (page === 'calendar') {
      element = <CalendarPage/>
    }

    return (
      <div>
        {element}
      </div>
    )
  }
}
