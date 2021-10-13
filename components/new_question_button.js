import React from "react";
import ButtonLink from "components/button_link";
import {AuthContext} from "lib/auth";
import {
  Button
} from "@material-ui/core";

const NewQuestionButton = () => {

  const {
    currentUser
  } = React.useContext(AuthContext);

  return(
    <div>
      {
        currentUser?
        <Button component={ButtonLink} href="/questions/new" variant="contained" color="primary">
          Ask a question
        </Button>
        :(
          <Button component={ButtonLink} href="/sign_in" variant="contained" color="primary">
            Sign in to ask a question
          </Button>
        )
      }
    </div>
  )
}

export default NewQuestionButton;
