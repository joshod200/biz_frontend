import React from "react";
import Head from 'next/head';
import AuthHOC from "lib/auth";
import {
  Button,
  TextField,
  IconButton,
  Typography
} from "@material-ui/core";
import {AuthContext} from "lib/auth";
import { useRouter } from 'next/router'
import Editor from "components/editor";
import useForm from "lib/form";
import {ActivityDialogContext} from "lib/activity";
import {SnackbarContext} from "react-snackbar";
import authFetch from "lib/auth_fetch";
import AppBar from "components/appbar";
import Center from "components/center";
import Paper from "components/paper";

const New = () => {

  const {
    currentUser
  } = React.useContext(AuthContext);

  const router = useRouter();

  const questionsForm = useForm({
    init: {
      title: "",
      body: ""
    }
  });

  const {
    onValidate,
    formState,
    onChange,
    formHelper,
    errors
  } = questionsForm;

  const {
    showActivity,
    hideActivity
  } = React.useContext(ActivityDialogContext);

  const {
    showMessage,
  } = React.useContext(SnackbarContext);

  const onCreateQuestion = (e) => {
    e.preventDefault();
    if(!onValidate()) return;
    showActivity("Creating question");
    authFetch(`http://localhost:3001/api/v1/questions.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
    .then((res) => {
      if(res.status === 201){
        res.json()
        .then((res) => {
          showMessage("Question created");
          router.push("/");
        })
      }else {
        throw "An unknown error occured";
      }
    })
    .catch((err) => {
      showMessage(err)
    })
    .finally(() => hideActivity())
  };

  const {
    title,
    body
  } = formState;

  return (
    <div>
      <Head>
        <title>Biz | New Question</title>
      </Head>
      <AppBar
        title="New Question"
      />
      <Center>
        <Paper>
          <TextField
            label="Title"
            value={title}
            onChange={onChange}
            name="title"
            rows={2}
            multiline
            fullWidth
          />
          <Editor
            name="body"
            onChange={onChange}
            placeholder="Type question here"
          />
          <Button variant="contained" color="primary" onClick={onCreateQuestion}>
            Create Question
          </Button>
        </Paper>
      </Center>
    </div>
  )
}

export default AuthHOC(New);
