import React from "react";
import Head from 'next/head';
import AuthHOC from "lib/auth";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Center from "components/center";
import ButtonLink from "components/button_link";
import NewQuestionButton from "components/new_question_button";
import Paper from "components/paper";
import Question from "components/questions/question";

const Home = ({
  data
}) => {

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography>
            Biz
          </Typography>
        </Toolbar>
      </AppBar>
      <Head>
        <title>Biz | Questions</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Center>
        <ul style={{listStyle: "none", padding: 0}}>
          {
            data.map((question, i) => (
              <li key={i} style={{marginBottom: "20px"}}>
                <Question key={i} question={question} />
              </li>
            ))
          }
        </ul>
        <NewQuestionButton />
      </Center>
    </>
  )
}

export async function getServerSideProps (context) {
  const res = await fetch("http://localhost:3001/api/v1/questions")
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}

export default AuthHOC(Home);
