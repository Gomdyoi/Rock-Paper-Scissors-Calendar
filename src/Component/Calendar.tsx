import React from 'react'
import Moment from 'moment'

import 'Stylesheet/Calendar.scss'

interface CalendarProps {
  selectDate: any
}

const Calendar = ({ selectDate }: CalendarProps) => {
  const weakList = () => {
    const weakDay = Moment.weekdaysShort()

    return weakDay.map(weak => {
      return weak.toUpperCase()
    })
  }

  const dayList = () => {
    const firstDay: string = selectDate.startOf('month').format('d')

    const blankDays = []

    for (let i = 0; i < Number(firstDay); i++) {
      blankDays.push(
        <div key={i} className="empty">
          {''}
        </div>,
      )
    }

    const days = []

    for (let i = 1; i <= selectDate.daysInMonth(); i++) {
      const today = Moment().format('YYYY-MM-DD')
      const date =
        selectDate.format('YYYY-MM-') + (String(i).length > 1 ? i : '0' + i)
      days.push(
        <button
          type="button"
          key={date}
          className={date === today ? 'day today' : 'day'}
        >
          {[date].map(key => (
            <div key={key} className="day-information">
              <div className="day-number">{i}</div>
            </div>
          ))}
        </button>,
      )
    }

    return [...blankDays, ...days]
  }

  return (
    <div className="Calendar">
      <div className="weak-list">
        {weakList().map((weakDay, index) => (
          <div key={index} className="weak-day">
            {weakDay}
          </div>
        ))}
      </div>
      <div className="day-list">{dayList()}</div>
    </div>
  )
}

export default Calendar
