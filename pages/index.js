/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import css from "./index.module.css";
import note from "../assets/note.png";
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
const Index = () => {

  const router = useRouter()

  const [exit, setExit] = React.useState(false)

  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <div>
        <div className={css.image}>
          <Image src={note} width={100} height={100} />
        </div>
        <div className={css.body}>
          <h1 className={`${css.heading} ${css.slide_in_elliptic_top_fwd} ${exit && css.swirl_out_bck}`}>Task It</h1>
          <p style={{ textTransform: "capitalize" }} className={`${css.subheading} ${exit && css.slide_out_bck_center}`}>
            A simple browser based task management webapp
          </p>
          <p className={`${css.button} ${css.slide_in_right} ${exit && css.slide_out_right}`} onClick={() => { setExit(true); setTimeout(() => { router.push("/ViewTodo") }, 550) }}>
            View All To-Dos
          </p>
          <p className={`${css.button} ${css.slide_in_left} ${exit && css.slide_out_left}`} onClick={() => { setExit(true); setTimeout(() => { router.push("/CreateTodo") }, 550) }}>
            Create A To-Do
          </p>
        </div>
      </div>
    </>
  )
}

export default Index