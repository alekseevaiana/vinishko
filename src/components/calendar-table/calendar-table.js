import React, {Component} from 'react'
import './calendar-table.css'

export default class CalendarTable extends Component {


  render() {
    const {calendar, toggleDay} = this.props;
    const {checkedDates} = calendar;

    let date = new Date(calendar.startDate)
    date = getMonday(date)

    const elements = [];

    for (let i = 0; i < 365; i++) {
      const isChecked = isDateInChecked(checkedDates, date);

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month < 10) {
        month = '0' + month
      }

      let currentDate = `${year}-${month}-${day}`;

      let classNames = isChecked ? 'calendar-cell calendar-cell--checked' : 'calendar-cell'

      elements.push(

        <div
          className={classNames}
          key={i}
          onClick={() => toggleDay(currentDate, calendar.id)}
        >
          {day}/{month}
        </div>
      );

      date.setDate(day + 1)
    }

    return <div className="calendar-grid">
      {elements}
    </div>
  }
}

function isDateInChecked(checkedList, date) {
  const strDate = dateToString(date);
  return checkedList.includes(strDate);
}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

function dateToString(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  return `${year}-${month}-${day}`
}

function getMonday(date) {
  const d = new Date(date)

  const dayOfWeek = date.getDay()
  if (dayOfWeek === 1) {
    return d
  }

  d.setDate(d.getDate() - (dayOfWeek - 1))

  return d
}