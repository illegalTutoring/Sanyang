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
            title: 'Vacation',
            startDate: new Date(2023, 3, 15),
            endDate: new Date(2023, 3, 20),
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
