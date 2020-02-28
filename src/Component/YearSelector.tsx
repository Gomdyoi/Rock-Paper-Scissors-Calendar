import React, { useState } from 'react'
import Moment from 'moment'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import 'Stylesheet/YearSelector.scss'

const YearSelector = ({ getYear }: any) => {
  const currendDate = Moment()

  const yearList = (): number[] => {
    const years: number[] = []

    for (let i = currendDate.year() - 100; i < currendDate.year(); i++) {
      years.push(i + 1)
    }

    return years
  }

  const itemsLength: number = yearList().length - 1

  const [currentItemIndex, setCurrentItemIndex] = useState(itemsLength)
  const [currentYear, setCurrentYear] = useState(currendDate.year())

  const positionTop: string = -currentItemIndex * 30 + 'rem, 0, 0'

  const onWheel = (event: React.WheelEvent): void => {
    const direction = event.deltaY
    if (direction > 0 && currentItemIndex < itemsLength) {
      setCurrentItemIndex(currentItemIndex => currentItemIndex + 1)
      setCurrentYear(currentYear => currentYear + 1)
      getYear(currentYear + 1)
    } else if (direction < 0 && currentItemIndex !== 0) {
      setCurrentItemIndex(currentItemIndex => currentItemIndex - 1)
      setCurrentYear(currentYear => currentYear - 1)
      getYear(currentYear - 1)
    }
  }

  const onNext = (): void => {
    if (currentItemIndex < itemsLength) {
      setCurrentItemIndex(currentItemIndex => currentItemIndex + 1)
      getYear(currentItemIndex + 1)
    }
  }
  const onPrev = (): void => {
    if (currentItemIndex !== 0) {
      setCurrentItemIndex(currentItemIndex => currentItemIndex - 1)
      getYear(currentItemIndex - 1)
    }
  }

  return (
    <div className="YearSelector">
      <button
        type="button"
        className={
          currentItemIndex !== 0 ? 'arrow-button' : 'arrow-button disabled'
        }
        onClick={onPrev}
      >
        <MdKeyboardArrowLeft />
      </button>
      <div className="year-counter">
        <div
          className="year-wrapper"
          onWheel={onWheel}
          style={{ transform: `translate3d(${positionTop})` }}
        >
          {yearList().map(year => (
            <div className="year" key={year}>
              {year}
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

export default YearSelector
