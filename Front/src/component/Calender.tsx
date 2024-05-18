'use client'

import React, { useState, useMemo, useEffect } from 'react'
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
import Modal from './layout/Modal'
import {
    calendarInfo,
    registCalendarRequestDTO,
    modifyCalendarRequestDTO,
} from '@/utils/api/DTO/calendar'

interface CalendarProps {
    width: string
    height: string
    year: number
    month: number
    schedules: calendarInfo[]
    isDarkMode: boolean
    isEditMode: boolean
    fetchSchedules: (year: number, month: number) => void
    addSchedule: (schedule: registCalendarRequestDTO) => void
    updateSchedules: (schedules: modifyCalendarRequestDTO) => void
    deleteSchedule: (calendarId: number) => void
}

const Calendar: React.FC<CalendarProps> = ({
    width,
    height,
    year,
    month,
    schedules,
    isDarkMode,
    isEditMode,
    fetchSchedules,
    addSchedule,
    updateSchedules,
    deleteSchedule,
}) => {
    // 지역변수
    const [selectedYear, setSelectedYear] = useState(year)
    const [selectedMonth, setSelectedMonth] = useState(month)
    const [isAddMode, setAddMode] = useState(false)
    const [isUpdateMode, setUpdateMode] = useState(false)
    const [insertData, setInsertData] = useState({
        calendarId: -1,
        title: '',
        startDate: '',
        endDate: '',
    })

    // 토글 함수
    const toggleAddMode = () => {
        setAddMode(!isAddMode)
    }

    const toggleUpdateMode = () => {
        setUpdateMode(!isUpdateMode)
    }

    // 이벤트 핸들러
    const handleDateClick = (event: React.MouseEvent, day: Date) => {
        event.stopPropagation()
        setInsertData({
            calendarId: -1,
            title: '',
            startDate: format(day, 'yyyy-MM-dd'),
            endDate: format(day, 'yyyy-MM-dd'),
        })
        setAddMode(true)
    }

    const handleScheduleClick = (
        event: React.MouseEvent,
        schedule: calendarInfo,
    ) => {
        event.stopPropagation()
        setInsertData({
            calendarId: schedule.calendarId,
            title: schedule.title,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
        })
        setUpdateMode(true)
    }

    const handleAddSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const calendarId = formData.get('calendarId')
        const title = formData.get('title')
        const startDate = formData.get('startDate')
        const endDate = formData.get('endDate')

        await addSchedule({
            title: title as string,
            startDate: startDate as string,
            endDate: endDate as string,
        })

        setAddMode(false)
    }

    const handleUpdateSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const calendarId = formData.get('calendarId')
        const title = formData.get('title')
        const startDate = formData.get('startDate')
        const endDate = formData.get('endDate')

        await updateSchedules({
            calendarId: parseInt(calendarId as string, 10),
            title: title as string,
            startDate: startDate as string,
            endDate: endDate as string,
        })

        setUpdateMode(false)
    }

    const handleDelete = async (calendarId: number) => {
        await deleteSchedule(calendarId)

        setUpdateMode(false)
    }

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

    // 달력관련 함수
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
            color: isThisMonth
                ? isDarkMode
                    ? 'white'
                    : 'black'
                : isDarkMode
                  ? '#444'
                  : '#ccc',
        }
    }

    // handleInputChange 함수 정의
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setInsertData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    //훅
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
                            calendarId: -1,
                            name: '',
                            level: i,
                            visible: false,
                        })
                    }
                }

                daySchedules.schedules[currentLevel] = {
                    calendarId: schedule.calendarId,
                    name:
                        date.getTime() ===
                            new Date(schedule.startDate).getTime() ||
                        date.getDay() === 0
                            ? schedule.title
                            : '',
                    title: schedule.title,
                    startDate: schedule.startDate,
                    endDate: schedule.endDate,
                    level: currentLevel,
                    visible: true,
                }
            }
        })

        return map
    }, [schedules])

    useEffect(() => {
        fetchSchedules(selectedYear, selectedMonth + 1)
    }, [selectedYear, selectedMonth, isAddMode, isUpdateMode])

    useEffect(() => {
        fetchSchedules(new Date().getFullYear(), new Date().getMonth())
    }, [])

    const yearOptions = Array.from({ length: 10 }).map((_, idx) => ({
        value: year - 5 + idx,
        label: year - 5 + idx,
    }))

    const monthOptions = Array.from({ length: 12 }).map((_, idx) => ({
        value: idx + 1,
        label: idx + 1 + '월',
    }))

    const hashStringToColor = (str: String) => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash)
        }
        const hue = hash % 360
        return `hsl(${hue}, 50%, 70%)`
    }

    return (
        <>
            <div className={styles.selectBox}>
                <div className={styles.selectDateBox}>
                    <Select
                        id="year-select"
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
                    />
                    <Select
                        id="month-select"
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
            <div
                style={{ width, height }}
                className={`${styles.calendar} ${!isEditMode && styles.disableClick}`}
            >
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
                            onClick={(event) => handleDateClick(event, day)}
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
                                            onClick={(event) => {
                                                if (schedule.visible) {
                                                    handleScheduleClick(
                                                        event,
                                                        schedule,
                                                    )
                                                }
                                            }}
                                            style={
                                                schedule.visible == true
                                                    ? {
                                                          backgroundColor:
                                                              hashStringToColor(
                                                                  schedule.title,
                                                              ),
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              '#ffffff00',
                                                      }
                                            }
                                        >
                                            {schedule.name}
                                        </div>
                                    ),
                                )}
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                height="fit-content"
                width="fit-content"
                isVisible={isAddMode || isUpdateMode}
                toggleModal={isAddMode ? toggleAddMode : toggleUpdateMode}
            >
                <form
                    className={styles.calendarFormContainer}
                    onSubmit={isAddMode ? handleAddSubmit : handleUpdateSubmit}
                >
                    <input
                        type="hidden"
                        name="calendarId"
                        value={insertData.calendarId}
                    />
                    <div className={styles.calendarFormTitle}>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={insertData.title}
                            style={{ color: isDarkMode ? 'white' : 'black' }}
                            onChange={handleInputChange}
                            placeholder="제목"
                            required
                        />
                    </div>
                    <div className={styles.calendarFormDate}>
                        <img
                            src={`${isDarkMode ? '/svgs/clock_white.svg' : '/svgs/clock_black.svg'}`}
                        />
                        <div className={styles.date}>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={insertData.startDate}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="endDate">~</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={insertData.endDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.calendarFormButton}>
                        <button className={styles.blueButton} type="submit">
                            {isAddMode ? '저장' : '수정'}
                        </button>
                        {isUpdateMode && (
                            <button
                                className={styles.redButton}
                                type="button"
                                onClick={() =>
                                    handleDelete(insertData.calendarId)
                                }
                            >
                                삭제
                            </button>
                        )}
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Calendar
