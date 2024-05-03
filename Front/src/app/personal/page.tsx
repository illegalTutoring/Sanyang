'use client'

import styles from './personal.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'

import Calendar from '@/component/Calender'
import { getCalendar } from '@/utils/api/calendar'
import { useEffect, useState } from 'react'

export interface Schedule {
    calendarId: number
    userId: string
    company: string
    title: string
    startDate: string
    endDate: string
}

const PersonalPage: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([])

    useEffect(() => {
        const fetchSchedules = async () => {
            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1
            const response = await getCalendar(year, month)

            /**
             * @todo Error Handling
             */

            setSchedules(response.data)
        }

        fetchSchedules()
    }, [])

    const { isDarkMode } = useDarkModeStore()
    return (
        <article
            className={`${styles.container} ${isDarkMode ? 'dark' : 'light'}`}
        >
            <Calendar
                width="80vw"
                height="90vh"
                year={new Date().getFullYear()}
                month={new Date().getMonth() + 1}
                schedules={schedules}
            />
        </article>
    )
}

export default PersonalPage
