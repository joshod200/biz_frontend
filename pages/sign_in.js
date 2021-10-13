import React from "react";
import {
  Button,
} from "@material-ui/core";
import Email from "components/shared/email";
import Password from "components/shared/password";
import Centered from "components/shared/centered";
import NavText from "components/shared/nav_text";
import Greetings from "components/shared/greetings";
import useSignInHook from "hooks/sign_in";

const SignIn = () => {

  const {
    sessionsForm,
    onSignIn
  } = useSignInHook();

  const {
    formState,
    onChange,
    formHelper,
    errors
  } = sessionsForm;

  const {
    email,
    password
  } = formState;

  return(
    <>
      <Centered size={3}>
        <Greetings text="Welcome back" />
        <Email
          onChange={onChange}
          value={email}
          formHelper={formHelper}
          errors={errors}
        />
        <Password
          onChange={onChange}
          value={password}
          formHelper={formHelper}
          errors={errors}
        />
        <Button variant="contained" color="primary" fullWidth onClick={onSignIn} style={{marginBottom: "20px"}}>
          Sign In
        </Button>
        <NavText text="Not a member? Sign up" />
      </Centered>
    </>
  )
}

export default SignIn;
