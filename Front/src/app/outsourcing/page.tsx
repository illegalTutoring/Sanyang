import Calendar from '@/component/Calender'
import style from './outsourcing.module.scss'

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

    return (
        <div className={style.container}>
            <Calendar
                width="80vw" // 동적으로 크기 지정
                height="90vh" // 동적으로 크기 지정
                year={2023}
                month={4}
                schedules={schedules}
            />
        </div>
    )
}

export default OutsourcingPage
