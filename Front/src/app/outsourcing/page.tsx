'use client'

import Calendar from '@/component/Calender'
import style from './outsourcing.module.scss'
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

const OutsourcingPage: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([])

    useEffect(() => {
        const fetchSchedules = async () => {
            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1
            const response = await getCalendar(year, month)

            setSchedules(response.data)
        }

        fetchSchedules()
    }, [])

    return (
        <div className={style.container}>
            <Calendar
                width="80vw"
                height="90vh"
                year={new Date().getFullYear()}
                month={new Date().getMonth() + 1}
                schedules={schedules}
            />
        </div>
    )
}

export default OutsourcingPage
