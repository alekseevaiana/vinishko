import React, {Component} from 'react'
import './calendar-table.css'

export default class CalendarTable extends Component {

  render() {

    const tableRow = () => {
      return (
        <tr className="calendar-table__row">
          <td className="calendar-table__td">1</td>
          <td className="calendar-table__td">2</td>
          <td className="calendar-table__td">3</td>
          <td className="calendar-table__td">4</td>
          <td className="calendar-table__td">5</td>
          <td className="calendar-table__td">6</td>
          <td className="calendar-table__td">7</td>
        </tr>
      )
    }

    return (

      <table className="calendar-table">
        {tableRow()}
      </table>
    )
  }
}