import React from "react";
import Paper from "components/paper";
import Editor from "components/editor";
import {
  Button,
  Typography,
} from "@material-ui/core";
import { useRouter } from 'next/router'
import useForm from "lib/form";
import {ActivityDialogContext} from "lib/activity";
import {SnackbarContext} from "react-snackbar";
import authFetch from "lib/auth_fetch";


const Answer = () => {

  const router = useRouter();

  const {id} = router.query;

  const answersForm = useForm({
    init: {
      body: ""
    }
  });

  const {
    onValidate,
    formState,
    onChange,
    formHelper,
    errors
  } = answersForm;

  const {
    showActivity,
    hideActivity
  } = React.useContext(ActivityDialogContext);

  const {
    showMessage,
  } = React.useContext(SnackbarContext);

  const onCreateAnswer = (e) => {
    e.preventDefault();
    if(!onValidate()) return;
    showActivity("Creating answer");
    authFetch(`http://localhost:3001/api/v1/questions/${id}/answers.json`, {
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
          showMessage("Answer created");
          //router.push("/");
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
    body
  } = formState;


  return(
    <Paper>
      <Typography>
        Answer
      </Typography>
      <Editor
        name="body"
        onChange={onChange}
      />
      <Button variant="contained" color="primary" onClick={onCreateAnswer}>
        Answer
      </Button>
    </Paper>
  )
}

export default Answer;
