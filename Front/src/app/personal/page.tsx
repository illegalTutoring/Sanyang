'use client'

import styles from './personal.module.scss'
import { useCallback, useState } from 'react'
import useEditModeStore from '@/utils/store/useEditModeStore'
import useDarkModeStore from '@/utils/store/useThemaStore'
import Calendar from '@/component/Calender'

import { calendarInfo } from '@/utils/api/DTO/calendar'
import { getCalendar } from '@/utils/api/calendar'
import {
    registCalendar,
    modifyCalendar,
    deleteCalendar,
} from '@/utils/api/admin'
import { addMonths } from 'date-fns'

const PersonalPage: React.FC = () => {
    // 전역변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // 지역변수
    const [schedules, setSchedules] = useState<calendarInfo[]>([])

    // 함수
    const fetchSchedules = async (year: number, month: number) => {
        // 현재, 전달, 후달의 Date 객체 생성
        const currentDate = new Date(year, month)
        const prevDate = addMonths(currentDate, -1)
        const nextDate = addMonths(currentDate, 1)

        try {
            // 각 달에 대한 API 호출
            const [prevMonthData, currentMonthData, nextMonthData] =
                await Promise.all([
                    getCalendar(prevDate.getFullYear(), prevDate.getMonth()),
                    getCalendar(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                    ),
                    getCalendar(nextDate.getFullYear(), nextDate.getMonth()),
                ])

            // 세 달의 데이터를 하나의 배열로 병합
            const combinedData = [
                ...prevMonthData.data,
                ...currentMonthData.data,
                ...nextMonthData.data,
            ]

            // 중복된 calendarId를 제거
            const uniqueSchedules = Array.from(
                new Map(
                    combinedData.map((item) => [item.calendarId, item]),
                ).values(),
            )

            // 상태 업데이트
            setSchedules(uniqueSchedules)
            //console.log(uniqueSchedules)
        } catch (error) {
            console.error('Error fetching schedules:', error)
        }
    }

    return (
        <article
            className={`${styles.container} ${isDarkMode ? 'dark' : 'light'}`}
        >
            <Calendar
                width="100%"
                height="90vh"
                year={new Date().getFullYear()}
                month={new Date().getMonth()}
                schedules={schedules}
                isDarkMode={isDarkMode}
                isEditMode={isEditMode}
                fetchSchedules={fetchSchedules}
                addSchedule={registCalendar}
                updateSchedules={modifyCalendar}
                deleteSchedule={deleteCalendar}
            />
        </article>
    )
}

export default PersonalPage
