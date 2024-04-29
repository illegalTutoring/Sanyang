'use client'

import style from './inquire.module.scss'
import Profile from '@/component/Profile'
import SimpleForm from '@/component/SimpleForm'

const InquirePage = () => {
    return (
        <>
            <div className={style.container_col}>
                <Profile
                    src="https://pbs.twimg.com/media/FxeXXAeaEAATIVE?format=jpg&name=900x900"
                    size={400}
                    border="1px solid balck"
                    alt="instargram"
                    radius={50}
                />
                <div></div>
                <SimpleForm />
            </div>
        </>
    )
}

export default InquirePage
