import React, { useState } from 'react'
import Moment from 'moment'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import 'Stylesheet/MonthSelector.scss'

const MonthSelector = ({ getMonth }: any) => {
  const monthList = (): string[] => {
    const months: string[] = []
    const allMonth = Moment.months()

    allMonth.forEach(month => months.push(month))

    return months
  }

  const itemsLength: number = monthList().length - 1

  const [currentItemIndex, setCurrentItemIndex] = useState(Moment().month())

  const positionTop: string = -currentItemIndex * 50 + 'rem, 0, 0'

  const onWheel = (event: React.WheelEvent): void => {
    const direction = event.deltaY
    if (direction > 0 && currentItemIndex < itemsLength) {
      setCurrentItemIndex(currentItemIndex + 1)
      getMonth(currentItemIndex + 1)
    } else if (direction < 0 && currentItemIndex !== 0) {
      setCurrentItemIndex(currentItemIndex - 1)
      getMonth(currentItemIndex - 1)
    }
  }

  const onNext = (): void => {
    if (currentItemIndex < itemsLength) {
      setCurrentItemIndex(currentItemIndex => currentItemIndex + 1)
      getMonth(currentItemIndex + 1)
    }
  }
  const onPrev = (): void => {
    if (currentItemIndex !== 0) {
      setCurrentItemIndex(currentItemIndex => currentItemIndex - 1)
      getMonth(currentItemIndex - 1)
    }
  }

  return (
    <div className="MonthSelector">
      <button
        type="button"
        className={
          currentItemIndex !== 0 ? 'arrow-button' : 'arrow-button disabled'
        }
        onClick={onPrev}
      >
        <MdKeyboardArrowLeft />
      </button>
      <div className="month-counter">
        <div
          className="month-wrapper"
          onWheel={onWheel}
          style={{ transform: `translate3d(${positionTop})` }}
        >
          {monthList().map(month => (
            <div className="month" key={month}>
              {month}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className={
          currentItemIndex !== itemsLength
            ? 'arrow-button'
            : 'arrow-button disabled'
        }
        onClick={onNext}
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  )
}

export default MonthSelector
