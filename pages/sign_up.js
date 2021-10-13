import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import Email from "components/shared/email";
import Password from "components/shared/password";
import Centered from "components/shared/centered";
import useSignUpHook from "hooks/sign_up";
import Greetings from "components/shared/greetings";
import NavText from "components/shared/nav_text";

const SignUp = () => {

  const {
    signUpForm,
    onSignUp
  } = useSignUpHook();

  const {
    formState,
    formHelper,
    onChange,
    errors
  } = signUpForm;

  const {
    email,
    password,
    name,
    password_confirmation
  } = formState;

  const nameError = formHelper(name, "name", "required", {errorField: errors.name});

  return(
    <>
      <Centered size={3}>
        <Greetings text="Welcome to Biz" />
        <TextField
          onChange={onChange}
          value={name}
          margin="normal"
          name="name"
          label="Name"
          helperText={nameError}
          error={Boolean(nameError)}
          fullWidth
        />
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
        <Password
          onChange={onChange}
          value={password_confirmation}
          formHelper={formHelper}
          errors={errors}
          confirmation
        />
        <Button variant="contained" color="primary" fullWidth onClick={onSignUp}>
          Sign Up
        </Button>
        <NavText text="Already a member? Sign in" />
      </Centered>
    </>
  )
}

export default SignUp;
