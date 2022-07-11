/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import note from "../assets/note.png";
import css from './viewTodo.module.css'
import Image from 'next/image'
import { Space, Table, Tag, Popconfirm, message, Input } from 'antd';
import { useRouter } from 'next/router';
import { UpCircleOutlined, Loading3QuartersOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons"
import Head from 'next/head'

const ViewTodo = () => {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [dataToShow, setDataToShow] = useState([]);
    useEffect(() => {
        let a = localStorage.getItem("todos");
        if (a) {
            setData(JSON.parse(a));
            setDataToShow(JSON.parse(a));
        }
    }, []);


    const columns = [
        {
            title: 'Created On',
            dataIndex: 'createdOn',
            key: 'createdOn',
            sorter: (a, b) => a.createdOn > b.createdOn,

        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title > b.title,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description > b.description,
        },
        {
            title: 'Deadline',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date > b.date,
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag, index) => {
                        const color = ['geekblue', 'green', 'volcano', 'red', 'purple'];
                        return (
                            <Tag color={
                                color[Math.floor(Math.random() * color.length)]
                            } key={index}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
                <>
                    <Tag color={
                        status === 1 ? "geekblue" :
                            status === 2 ? "green" :
                                status === 3 ? "volcano" :
                                    status === 4 ? "red" :
                                        "geekblue"
                    }
                        icon={
                            status === 1 ? <UpCircleOutlined /> :
                                status === 2 ? <CheckCircleOutlined /> :
                                    status === 3 ? <Loading3QuartersOutlined /> :
                                        status === 4 ? <ClockCircleOutlined /> :
                                            <UpCircleOutlined />
                        }
                    >
                        {status === 1 ? "Open" :
                            status === 2 ? "Working" :
                                status === 3 ? "Done" :
                                    status === 4 ? "Overdue" :
                                        "Open"
                        }
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {

                const confirm = (e) => {
                    localStorage.setItem("todos", JSON.stringify(data.filter(d => d.id !== record.id)));
                    setDataToShow(data.filter(d => d.id !== record.id));
                    setData(data.filter(d => d.id !== record.id));
                    message.success('To do Deleted');
                };

                const cancel = (e) => {
                    message.error('To Do Not Deleted');
                };

                return (
                    <Space size="middle">
                        <p style={{ color: "green", cursor: "pointer" }}
                            onClick={() => {
                                router.push(`/ModifyTodo?id=${record.id}`)
                            }
                            }
                        >Modify</p>
                        <Popconfirm
                            title="Are you sure to delete this todo?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <p style={{ color: "red", cursor: "pointer" }}>Delete</p>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ];

    return (
        <>
            <Head>
                <title>Todo List</title>
            </Head>
            <div>
                <div className={css.image}
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    <Image src={note} width={100} height={100} />
                    <p className={`${css.slide_in_elliptic_top_fwd} ${css.heading}`}>View All To Dos</p>
                </div>
                <Input
                    placeholder="Search To Do"
                    style={{ width: 200, margin: "30px", marginLeft: "30px", }}
                    onChange={(e) => {
                        const search = e.target.value;
                        if (search.length > 0) {
                            const filtered = data.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));
                            setDataToShow(filtered);
                        }
                        else {
                            setDataToShow(data);
                        }
                    }
                    }
                />

                <Table className={`${css.table} ${css.fade_in_fwd}`} columns={columns} dataSource={dataToShow} />
            </div>
        </>
    )
}

export default ViewTodo