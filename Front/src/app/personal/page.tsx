'use client'

import styles from './personal.module.scss'
import useDarkModeStore from '@/utils/store/useThemaStore'
import Calendar from '@/component/Calender'
import { getCalendar } from '@/utils/api/calendar'
import { useEffect, useState } from 'react'
import useEditModeStore from '@/utils/store/useEditModeStore'

export interface Schedule {
    calendarId: number
    userId: string
    title: string
    startDate: string
    endDate: string
}

const PersonalPage: React.FC = () => {
    // 전역변수
    const { isDarkMode } = useDarkModeStore()
    const { isEditMode } = useEditModeStore()

    // 지역변수
    const [schedules, setSchedules] = useState<Schedule[]>([])

    // 함수
    const fetchSchedules = async () => {
        const year = new Date().getFullYear()
        const month = new Date().getMonth()
        const response = await getCalendar(year, month)

        console.log(month)

        /**
         * @todo Error Handling
         * 에러가 아닌 일정이 없음을 알려주는 UI?
         */

        //setSchedules(response.data)

        setSchedules([
            {
                calendarId: 1,
                userId: 'sanyang',
                title: 'd&f 신규 캐릭터 일러 작업',
                startDate: '2024-06-01',
                endDate: '2024-06-10',
            },
            {
                calendarId: 2,
                userId: 'sanyang',
                title: 'd&f 업데이트 일러 작업',
                startDate: '2024-06-01',
                endDate: '2024-06-01',
            },
            {
                calendarId: 3,
                userId: 'sanyang',
                title: '웹사이트 리디자인 프로젝트',
                startDate: '2024-06-01',
                endDate: '2024-06-30',
            },
            {
                calendarId: 4,
                userId: 'sanyang',
                title: '마케팅 캠페인 준비',
                startDate: '2024-06-03',
                endDate: '2024-06-31',
            },
        ])
    }

    useEffect(() => {
        fetchSchedules()
    }, [])

    return (
        <article
            className={`${styles.container} ${isDarkMode ? 'dark' : 'light'}`}
        >
            <Calendar
                width="100%"
                height="90vh"
                year={new Date().getFullYear()}
                month={new Date().getMonth() + 1}
                schedules={schedules}
                isDarkMode={isDarkMode}
                isEditMode={isEditMode}
            />
        </article>
    )
}

export default PersonalPage
