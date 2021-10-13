import React from "react";
import Head from 'next/head';
import AuthHOC from "lib/auth";
import {AuthContext} from "lib/auth";
import draftToHtml from 'draftjs-to-html';
import AppBar from "components/appbar";
import Center from "components/center";
import AnswersForm from "components/answers/form";
import Paper from "components/paper";
import {
  Typography
} from "@material-ui/core";

const Home = ({
  data
}) => {

  const {
    currentUser
  } = React.useContext(AuthContext);

  const body = draftToHtml(JSON.parse(data.body));

  return (
    <>
      <Head>
        <title>Biz | Show Question</title>
        <meta name="description" content={data.title} />
      </Head>
      <AppBar
        title="Show Question"
      />
      <Center>
        <Paper>
          <div style={{textAlign: "left"}}>
            <Typography variant="h5">
              {data.title}
            </Typography>
            <div dangerouslySetInnerHTML={{__html: body}}></div>
            <Typography variant="caption">
              {`by ${data.user.name} - ${data.created_at}`}
            </Typography>
          </div>
        </Paper>
        <Typography>
          Answers
        </Typography>
        <ul style={{listStyle: "none", padding: 0}}>
          {
            data.answers.map((answer, i) => {
              var body2 = draftToHtml(JSON.parse(answer.body));
              return(
                <li>
                  <Paper>
                    <div dangerouslySetInnerHTML={{__html: body2}}></div>
                    <Typography variant="caption">
                      {`by ${data.user.name} - ${answer.created_at}`}
                      </Typography>
                    </Paper>
                  </li>
                  )
              })
            }

        </ul>
        <AnswersForm />
        </Center>
    </>
  )
}

export async function getServerSideProps ({ params }) {
  const res = await fetch(`http://localhost:3001/api/v1/questions/${params.id}`)
  const data = await res.json();

  return {
    props: {
      data
    }
  }
}

export default AuthHOC(Home);
