'use client'

import React, { useState, useMemo } from 'react'
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    addDays,
} from 'date-fns'
import styles from './Calendar.module.scss'

interface ScheduleItem {
    calendarId: number
    userId: string
    company: string
    title: string
    startDate: string
    endDate: string
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

    const scheduleMap = useMemo(() => {
        const map = new Map()
        schedules.forEach((schedule) => {
            let currentLevel = 0

            for (
                let date = new Date(schedule.startDate);
                date <= new Date(schedule.endDate);
                date = addDays(date, 1)
            ) {
                const dateKey = format(date, 'yyyy-MM-dd')

                if (!map.has(dateKey)) {
                    map.set(dateKey, { schedules: [], maxLevel: 0 })
                }

                let daySchedules = map.get(dateKey)
                if (date.getTime() === new Date(schedule.startDate).getTime()) {
                    currentLevel = 0
                    while (
                        daySchedules.schedules.some(
                            (s: any) => s.level === currentLevel && s.visible,
                        )
                    ) {
                        currentLevel++
                    }
                }

                daySchedules.maxLevel = Math.max(
                    daySchedules.maxLevel,
                    currentLevel,
                )

                for (let i = 0; i < currentLevel; i++) {
                    if (
                        !daySchedules.schedules.some((s: any) => s.level === i)
                    ) {
                        daySchedules.schedules.push({
                            title: '',
                            level: i,
                            visible: false,
                        })
                    }
                }

                daySchedules.schedules[currentLevel] = {
                    title:
                        date.getTime() ===
                        new Date(schedule.startDate).getTime()
                            ? schedule.title
                            : '',
                    level: currentLevel,
                    visible: true,
                }
            }
        })

        console.log(map)

        return map
    }, [schedules])

    const dayStyle = (day: Date) => {
        const isThisMonth = day.getMonth() === selectedMonth
        return {
            color: isThisMonth ? '000' : '#ccc',
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
                        <div style={{ paddingLeft: '5px' }}>
                            {format(day, 'd')}
                        </div>
                        {scheduleMap
                            .get(format(day, 'yyyy-MM-dd'))
                            ?.schedules.map((schedule: any, idx: number) => (
                                <div
                                    key={idx}
                                    className={styles.schedule}
                                    style={
                                        schedule.visible == true
                                            ? {
                                                  backgroundColor: `hsl(${schedule.level * 30}, 50%, 70%)`,
                                              }
                                            : { backgroundColor: '#ffffff00' }
                                    }
                                >
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
