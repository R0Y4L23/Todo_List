import React from 'react'
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Description = ({ value, setValue }) => {
    return (
        <>
            <Input value={value} onChange={(e) => { if (e.target.value.length <= 100) setValue(e.target.value) }} size="large" placeholder="Enter..." prefix={<UserOutlined />} />
        </>
    )
}

export default Description