import React from 'react'
import { Input, Button, Tag } from 'antd'
import css from './input.module.css'

const Tags = ({ value, setValue }) => {
    const [tags, setTags] = React.useState(value);
    const [tag, setTag] = React.useState('');
    const color = ['geekblue', 'green', 'volcano', 'red', 'purple'];

    return (
        <>
            <Input value={tag} onChange={(e) => { if (e.target.value.length <= 100) setTag(e.target.value) }} placeholder="Enter tags" />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'row', margin: 30 }}>
                {tags.map((tag, index) => {
                    return (
                        <Tag
                            color={Math.floor(Math.random() * color.length)}
                            key={index} closable onClose={() => {
                                setTags(tags.filter((_, i) => i !== index))
                                setValue(value.filter((_, i) => i !== index))
                            }}>
                            {tag}
                        </Tag>
                    )
                })
                }
            </div>

            <Button type="primary"
                onClick={() => {
                    if (tag && tags.includes(tag) === false) {
                        setTags([...tags, tag]);
                        setValue([...value, tag]);
                        setTag('');
                    }
                }
                }
            >Add</Button>
        </>

    )
}

export default Tags