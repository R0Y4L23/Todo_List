import React from 'react'
import { DatePicker, message } from 'antd';

const Dates = ({ value, setValue, current }) => {
    const [d, setD] = React.useState(null);
    return (
        <>
            <DatePicker value={d} onChange={(date, dateString) => {
                if (dateString < current) {
                    message.error("Date cannot be before today");
                } else {
                    setValue({ date, dateString })
                    setD(date);
                }
            }} />
        </>
    )

}

export default Dates