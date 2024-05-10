'use client'

import styles from './personal.module.scss'
import { useEffect, useState } from 'react'
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

const PersonalPage: React.FC = () => {
    // 전역변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // 지역변수
    const [schedules, setSchedules] = useState<calendarInfo[]>([])

    // 함수
    const fetchSchedules = async (year: number, month: number) => {
        const response = await getCalendar(year, month)
        setSchedules(response.data)
    }

    useEffect(() => {
        fetchSchedules(new Date().getFullYear(), new Date().getMonth())
    }, [])

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
