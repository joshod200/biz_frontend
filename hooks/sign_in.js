import React from "react";
import useForm from "lib/form";
import {ActivityDialogContext} from "lib/activity";
import {SnackbarContext} from "react-snackbar";
import {setCookie} from "lib/cookies";
import { useRouter } from 'next/router';

const useSignInHook = () => {

  const sessionsForm = useForm({
    init: {
      email: "",
      password: ""
    }
  });

  const router = useRouter();

  const {
    onValidate,
    formState,
    onChange,
    formHelper,
    errors
  } = sessionsForm;

  const {
    showActivity,
    hideActivity
  } = React.useContext(ActivityDialogContext);

  const {
    showMessage,
  } = React.useContext(SnackbarContext);

  const onSignIn = (e) => {
    const headers = {
      current: ""
    };
    e.preventDefault();
    if(!onValidate()) return;
    showActivity("Signing in");
    fetch(`http://localhost:3001/auth/sign_in.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
    .then((res) => {
      if(res.status === 200){
        headers.current = res.headers;
        return res;
      }else if (res.status === 401) {
        throw "Invalid login credentials";
      }else {
        throw "An unknown error occured";
      }
    })
    .then((res) => res.json())
    .then((res) => {
      const {expiry} = headers.current;
      const auth_headers = {
        "accessToken": headers.current.get("access-token"),
        "client": headers.current.get("client"),
        "uid": headers.current.get("uid"),
        "expiry": headers.current.get("expiry")
      };
      setCookie("session", JSON.stringify(auth_headers), expiry); // set cookie on client side because server side requires reload
      showMessage("Signed in");
      router.replace("/");
    })
    .catch((err) => {
      showMessage(err)
    })
    .finally(() => hideActivity())
  };


  return {
    sessionsForm,
    onSignIn
  };

};

export default useSignInHook;
