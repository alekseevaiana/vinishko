import React, {Component} from 'react'
import './calendar-table.css'

export default class CalendarTable extends Component {


  render() {
    const {calendar, toggleDay} = this.props;
    const {checkedDates} = calendar;
    const today = new Date()

    let date = new Date(calendar.startDate)
    // создается новая дата на основе состояния в app
    date = getMonday(date)
    // первый понедельник

    const elements = [];

    for (let i = 0; i < 365; i++) {
      const isChecked = isDateInChecked(checkedDates, date);

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      month = formatNumber(month)
      day = formatNumber(day)

      let currentDate = `${year}-${month}-${day}`;

      // let classNames = isChecked ? 'calendar-cell calendar-cell--checked' : 'calendar-cell'
      let classNames = isChecked ? 'calendar-cell calendar-cell--checked' : 'calendar-cell'

      if (isSameDay(date, today) && !isChecked) {
        classNames += ' calendar-cell--today-unchecked'
      } else if (isSameDay(date, today) && isChecked) {
        classNames += ' calendar-cell--today-checked'
      }
      // добавить еще один класс, который говорит сегодня это или не сегодня
      // если сегодня, то calendar-cell--today

      elements.push(

        <div
          className={classNames}
          key={i}
          onClick={() => toggleDay(currentDate, calendar.id)}
        >
          {day}/{month}
        </div>
      );

      date.setDate(date.getDate() + 1)
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

function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

function formatNumber(number) {
  if (number < 10 ) {
    return '0' + String(number)
  }

  return String(number)
}

function dateToString(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = formatNumber(month)
  day = formatNumber(day)

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