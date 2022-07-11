import React from 'react'
import { Radio } from 'antd';

const Status = ({ value, setValue }) => {

    const [status, setStatus] = React.useState(value);

    const onchange = (e) => {
        setStatus(e.target.value);
        console.log(e.target.value);
        setValue(e.target.value)
    }

    return (
        <>
            <Radio.Group value={status} onChange={onchange}>
                <Radio value={1}>Open</Radio>
                <Radio value={2}>Working</Radio>
                <Radio value={3}>Done</Radio>
                <Radio value={4}>Overdue</Radio>
            </Radio.Group>
        </>
    )
}

export default Status