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
import Select from 'react-select'
import useDarkModeStore from '@/utils/store/useThemaStore'

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
    const { isDarkMode } = useDarkModeStore()

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
            color: isThisMonth
                ? isDarkMode
                    ? 'white'
                    : 'black'
                : isDarkMode
                  ? '#444'
                  : '#ccc',
        }
    }

    const yearOptions = Array.from({ length: 10 }).map((_, idx) => ({
        value: year - 5 + idx,
        label: year - 5 + idx,
    }))

    const monthOptions = Array.from({ length: 12 }).map((_, idx) => ({
        value: idx + 1,
        label: idx + 1 + '월',
    }))

    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedYear(selectedYear - 1)
            setSelectedMonth(11)
        } else {
            setSelectedMonth(selectedMonth - 1)
        }
    }

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedYear(selectedYear + 1)
            setSelectedMonth(0)
        } else {
            setSelectedMonth(selectedMonth + 1)
        }
    }

    return (
        <div>
            <div className={styles.selectBox}>
                <div className={styles.selectDateBox}>
                    <Select
                        value={yearOptions.find(
                            (option) => option.value === selectedYear,
                        )}
                        options={yearOptions}
                        onChange={(option) => {
                            if (option) {
                                setSelectedYear(option.value)
                            }
                        }}
                        className={styles.customSelect}
                        isSearchable={false}
                        styles={{
                            menu: (provided) => ({
                                ...provided,
                                marginTop: -10,
                            }),
                        }}
                    />
                    <Select
                        value={monthOptions.find(
                            (option) => option.value === selectedMonth + 1,
                        )}
                        options={monthOptions}
                        onChange={(option) => {
                            if (option) {
                                setSelectedMonth(option.value - 1)
                            }
                        }}
                        className={styles.customSelect}
                        isSearchable={false}
                        styles={{
                            menu: (provided) => ({
                                ...provided,
                                marginTop: -10,
                            }),
                        }}
                    />
                </div>
                <div className={styles.selectButtonBox}>
                    <img
                        className={styles.selectButton}
                        src={`${isDarkMode ? '/svgs/arrow_left_white.svg' : '/svgs/arrow_left_black.svg'}`}
                        onClick={handlePrevMonth}
                        alt="Previous Month"
                    />
                    <img
                        className={styles.selectButton}
                        src={`${isDarkMode ? '/svgs/arrow_right_white.svg' : '/svgs/arrow_right_black.svg'}`}
                        onClick={handleNextMonth}
                        alt="Next Month"
                    />
                </div>
            </div>
            <div style={{ width, height }} className={styles.calendar}>
                <div
                    className={`${styles.header} ${isDarkMode ? styles.darkHeader : styles.lightHeader}`}
                >
                    {['월', '화', '수', '목', '금', '토', '일'].map(
                        (day, index) => (
                            <div key={index}>{day}</div>
                        ),
                    )}
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
                                ?.schedules.map(
                                    (schedule: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={styles.schedule}
                                            style={
                                                schedule.visible == true
                                                    ? {
                                                          backgroundColor: `hsl(${schedule.level * 30}, 50%, 70%)`,
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              '#ffffff00',
                                                      }
                                            }
                                        >
                                            {schedule.title}
                                        </div>
                                    ),
                                )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Calendar
