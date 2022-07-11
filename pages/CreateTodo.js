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
import Head from "next/head";
import { useRouter } from 'next/router';

const CreateTodo = () => {
    const { Title } = Typography;
    const [page, setPage] = React.useState(1);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState({ date: null, dateString: "" });
    const [tags, setTags] = React.useState([]);
    const [status, setStatus] = React.useState(1);
    const [createdOn, setCreatedOn] = React.useState("");
    const [lengthOfTodosAsID, setLengthOfTodosAsID] = React.useState(0);

    useEffect(() => {

        let a = localStorage.getItem("todos");
        if (a !== null) {
            let lengthOfTodos = JSON.parse(a).length;
            setLengthOfTodosAsID(lengthOfTodos);
        }

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

    const s = ["Open", "Working", "Done", "Overdue"];

    const createTodo = [{ name: "Title", required: true, answer: title }, { name: "Description", required: true, answer: description }, { name: "Date", required: true, answer: date }, { name: "Tags", required: true, answer: tags }, { name: "Status", required: true, answer: status }];
    const answer = { id: lengthOfTodosAsID, createdOn, title, description, date: date.dateString, tags, status: s[status - 1] };

    return (
        <>
            <Head>
                <title>Create Todo</title>
            </Head>
            <div className={css.fade_in_fwd}>
                <div className={css.image}
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    <Image src={note} width={100} height={100} />
                    <p className={`${css.slide_in_elliptic_top_fwd} ${css.heading}`}>Create A To Do</p>
                </div>
                <div className={css.main}>
                    <Title>{createTodo[page - 1].name}</Title>
                    {page === 1 && <Title2 value={title} setValue={setTitle} />}
                    {page === 2 && <Description value={description} setValue={setDescription} />}
                    {page === 3 && <Date2 setValue={setDate} />}
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
                                        message.error("Please fill in the required field");
                                    }
                                    else {
                                        setPage(page + 1)
                                    }
                                }
                                else {
                                    message.success("Todo created successfully");
                                    console.log(createTodo)
                                    let a = localStorage.getItem("todos");
                                    if (a === null) {
                                        a = [answer];
                                    }
                                    else {
                                        a = JSON.parse(a);
                                        a.push(answer);
                                    }
                                    localStorage.setItem("todos", JSON.stringify(a));
                                    router.push("/")
                                }
                            }}>{page == createTodo.length ? "Add Task" : "Next"}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTodo