/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import Image from 'next/image'
import css from './createTodo.module.css'
import note from "../assets/note.png";
import { Button, Typography, message } from 'antd';
import Title2 from '../inputs/title';
import Description from '../inputs/description';
import Date2 from '../inputs/date';
import Tags2 from '../inputs/tags';
import Status from '../inputs/status';
import { useRouter } from 'next/router';
import Head from 'next/head';

const ModifyTodo = () => {

    const { Title } = Typography;
    const [page, setPage] = React.useState(1);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState({ date: null, dateString: "" });
    const [tags, setTags] = React.useState([]);
    const [status, setStatus] = React.useState(1);
    const [createdOn, setCreatedOn] = React.useState("");

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = yyyy + '-' + mm + '-' + dd;
        setCreatedOn(formattedToday);

    }, []);

    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        let a = localStorage.getItem("todos");
        if (a !== null) {
            let todos = JSON.parse(a);
            let todo = todos.find(todo => todo.id == id);
            setTitle(todo.title);
            setDescription(todo.description);
            setDate({ date: new Date(todo.date), dateString: todo.date });
            setTags(todo.tags);
            setStatus(s2[todo.status]);
        }
    }, [id]);


    const s = ["Open", "Working", "Done", "Overdue"];
    const s2 = { "Open": 1, "Working": 2, "Done": 3, "Overdue": 4 };

    const createTodo = [{ name: "Title", required: true, answer: title }, { name: "Description", required: true, answer: description }, { name: "Date", required: true, answer: date }, { name: "Tags", required: true, answer: tags }, { name: "Status", required: true, answer: status }];
    const answer = { createdOn, title, description, date: date.dateString, tags, status: s[status - 1] };

    return (
        <>
            <Head>
                <title>Modify Todo</title>
            </Head>
            <div>
                <div className={css.image}
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    <Image src={note} width={100} height={100} />
                    <p className={`${css.slide_in_elliptic_top_fwd} ${css.heading}`}>Modify To Do : {title}</p>
                </div>
                <div className={css.main}>
                    <Title>{createTodo[page - 1].name}</Title>
                    {page === 1 && <Title2 value={title} setValue={setTitle} />}
                    {page === 2 && <Description value={description} setValue={setDescription} />}
                    {page === 3 && <Date2 current={createdOn} value={date} setValue={setDate} />}
                    {page === 4 && <Tags2 value={tags} setValue={setTags} />}
                    {page === 5 && <Status value={status} setValue={setStatus} />}
                    <div className={css.buttons}>
                        {page != 1 && <Button type="primary" size={"large"}
                            onClick={() => {
                                setPage(page - 1)
                            }}>Previous</Button>}
                        <Button type="primary" size={"large"}
                            onClick={() => {
                                if (page != createTodo.length) {
                                    if (createTodo[page - 1].required && createTodo[page - 1].answer === "") {
                                        message.error("Please fill the required field");
                                    }
                                    else {
                                        setPage(page + 1)
                                    }
                                }
                                else {
                                    message.success("To Do modified successfully");
                                    console.log(createTodo)
                                    let a = localStorage.getItem("todos");
                                    a = JSON.parse(a);
                                    a[id] = answer;
                                    localStorage.setItem("todos", JSON.stringify(a));
                                    router.push("/")
                                }
                            }}>{page == createTodo.length ? "Modify" : "Next"}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModifyTodo