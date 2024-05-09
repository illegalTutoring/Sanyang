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
                endDate: '2024-06-20',
            },
            {
                calendarId: 5,
                userId: 'mijung',
                title: '제품 출시 회의',
                startDate: '2024-06-10',
                endDate: '2024-06-10',
            },
            {
                calendarId: 6,
                userId: 'mijung',
                title: '오프라인 이벤트 준비',
                startDate: '2024-06-15',
                endDate: '2024-06-25',
            },
            {
                calendarId: 7,
                userId: 'chulsoo',
                title: '팀 빌딩 워크샵',
                startDate: '2024-06-05',
                endDate: '2024-06-07',
            },
            {
                calendarId: 8,
                userId: 'chulsoo',
                title: '비즈니스 전략 리뷰',
                startDate: '2024-06-14',
                endDate: '2024-06-14',
            },
            {
                calendarId: 9,
                userId: 'chulsoo',
                title: '기술 컨퍼런스 참여',
                startDate: '2024-06-18',
                endDate: '2024-06-20',
            },
            {
                calendarId: 10,
                userId: 'jiyoung',
                title: 'UI/UX 디자인 브레인스토밍',
                startDate: '2024-06-22',
                endDate: '2024-06-22',
            },
            {
                calendarId: 11,
                userId: 'jiyoung',
                title: '모바일 앱 버전 업데이트 회의',
                startDate: '2024-06-11',
                endDate: '2024-06-11',
            },
            {
                calendarId: 12,
                userId: 'jiyoung',
                title: '긴급 개발 이슈 미팅',
                startDate: '2024-06-12',
                endDate: '2024-06-12',
            },
            {
                calendarId: 13,
                userId: 'jiyoung',
                title: '예산 계획 회의',
                startDate: '2024-06-13',
                endDate: '2024-06-13',
            },
            {
                calendarId: 14,
                userId: 'jiyoung',
                title: '새 프로젝트 런칭 플랜',
                startDate: '2024-06-16',
                endDate: '2024-06-16',
            },
            {
                calendarId: 15,
                userId: 'jiyoung',
                title: '해외 파트너와의 웹미팅',
                startDate: '2024-06-19',
                endDate: '2024-06-19',
            },
            {
                calendarId: 16,
                userId: 'jiyoung',
                title: '사내 교육 세미나',
                startDate: '2024-06-21',
                endDate: '2024-06-21',
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
                month={new Date().getMonth()}
                schedules={schedules}
                isDarkMode={isDarkMode}
                isEditMode={isEditMode}
                addSchedule={(schedule) => {}}
                updateSchedules={(schedules) => {}}
                deleteSchedule={(schedule) => {}}
            />
        </article>
    )
}

export default PersonalPage
