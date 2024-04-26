'use client'

import Calendar from '@/component/Calender'
import styles from './outsourcing.module.scss'
import { useDarkModeStore } from '@/utils/store/useThemaStore'
import { use } from 'react'

const OutsourcingPage = () => {
    const schedules = [
        {
            title: 'Conference',
            startDate: new Date(2023, 3, 10),
            endDate: new Date(2023, 3, 12),
        },
        {
            title: 'Vacation1',
            startDate: new Date(2023, 3, 12),
            endDate: new Date(2023, 3, 20),
        },
        {
            title: 'Vacation2',
            startDate: new Date(2023, 3, 15),
            endDate: new Date(2023, 3, 25),
        },
        {
            title: 'Vacation3',
            startDate: new Date(2023, 3, 20),
            endDate: new Date(2023, 3, 24),
        },
        {
            title: 'Vacation4',
            startDate: new Date(2023, 3, 24),
            endDate: new Date(2023, 3, 28),
        },
        {
            title: 'Vacation5',
            startDate: new Date(2023, 3, 24),
            endDate: new Date(2023, 3, 28),
        },
    ]
    const { darkMode } = useDarkModeStore()

    return (
        <article
            className={`${styles.container} ${darkMode ? 'dark' : 'light'}`}
        >
            <Calendar
                width="80vw" // 동적으로 크기 지정
                height="90vh" // 동적으로 크기 지정
                year={2023}
                month={4}
                schedules={schedules}
            />
        </article>
    )
}

export default OutsourcingPage
