import React, {Component} from 'react'
import './create-calendar-page.css'
import Button from '../../components/button/button'
import PageHeader from '../../components/page-header/page-header'

export default class CreateCalendarPage extends Component {
  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addItem(this.state.label)
    this.setState({
      label: '',
    })
  }


  render() {

    const {onArrowBackClick} = this.props

    const {label} = this.state


    return (
      <div className="create-calendar-page"

      >
        <PageHeader
          onArrowBackClick={onArrowBackClick}
        >New</PageHeader>
        <form onSubmit={this.onSubmit}>

          <label htmlFor="" className="create-calendar-page__label">
            Enter the title</label>
          <input type="text" className="create-calendar-page__input"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
          <Button type="submit">Create</Button>
        </form>
      </div>
    )
  }
}