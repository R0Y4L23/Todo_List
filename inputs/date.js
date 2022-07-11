import React from 'react'
import { DatePicker } from 'antd';

const Date = ({ value, setValue }) => {
    return (
        <>
            <DatePicker onChange={(date, dateString) => { setValue({ date, dateString }) }} />
        </>
    )

}

export default Date