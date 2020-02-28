import React, { useState, useCallback } from 'react'
import Moment from 'moment'
import Calendar from 'Component/Calendar'
import YearSelector from 'Component/YearSelector'
import MonthSelector from 'Component/MonthSelector'
import 'Stylesheet/App.scss'

function App() {
  const [selectDate, setSelectDate] = useState(Moment())

  const getYear = useCallback(
    e => {
      const selectedYear = Moment(selectDate).set('year', e)
      setSelectDate(selectedYear)
    },
    [selectDate],
  )

  const getMonth = useCallback(
    e => {
      const selectedMonth = Moment(selectDate).set('month', e)
      setSelectDate(selectedMonth)
    },
    [selectDate],
  )

  return (
    <div className="App">
      <div className="date-select-section">
        <YearSelector getYear={getYear} />
        <MonthSelector getMonth={getMonth} />
      </div>
      <Calendar selectDate={selectDate} />
    </div>
  )
}

export default App
