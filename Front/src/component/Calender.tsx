'use client'

import React, { useState } from 'react'
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    addDays,
} from 'date-fns'
import styles from './Calendar.module.scss' // CSS 모듈

interface ScheduleItem {
    title: string
    startDate: Date
    endDate: Date
}

interface CalendarProps {
    width: string
    height: string
    year: number
    month: number
    schedules: ScheduleItem[]
}

const Calendar: React.FC<CalendarProps> = ({
    width,
    height,
    year,
    month,
    schedules,
}) => {
    const [selectedYear, setSelectedYear] = useState(year)
    const [selectedMonth, setSelectedMonth] = useState(month - 1)

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(event.target.value, 10))
    }

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(parseInt(event.target.value, 10) - 1)
    }

    const days = eachDayOfInterval({
        start: addDays(
            startOfMonth(new Date(selectedYear, selectedMonth)),
            -getDay(new Date(selectedYear, selectedMonth)),
        ),
        end: addDays(
            endOfMonth(new Date(selectedYear, selectedMonth)),
            6 - getDay(endOfMonth(new Date(selectedYear, selectedMonth))),
        ),
    })

    const dayStyle = (day: Date) => {
        const isThisMonth = day.getMonth() === selectedMonth
        return {
            gridColumnStart:
                isThisMonth && day.getDate() === 1
                    ? getDay(day) + 1
                    : undefined,
            backgroundColor: isThisMonth ? '#fff' : '#eee',
        }
    }

    return (
        <div style={{ width, height }} className={styles.calendar}>
            <div className={styles.header}>
                <select value={selectedYear} onChange={handleYearChange}>
                    {Array.from({ length: 10 }).map((_, idx) => (
                        <option key={idx} value={year - 5 + idx}>
                            {year - 5 + idx}
                        </option>
                    ))}
                </select>
                <select value={selectedMonth + 1} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }).map((_, idx) => (
                        <option key={idx} value={idx + 1}>
                            {format(new Date(0, idx), 'MMMM')}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.daysGrid}>
                {days.map((day, index) => (
                    <div
                        key={index}
                        style={dayStyle(day)}
                        className={styles.day}
                    >
                        {format(day, 'd')}
                        {schedules
                            .filter(
                                (schedule) =>
                                    day >= schedule.startDate &&
                                    day <= schedule.endDate,
                            )
                            .map((schedule, idx) => (
                                <div key={idx} className={styles.schedule}>
                                    {schedule.title}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar
