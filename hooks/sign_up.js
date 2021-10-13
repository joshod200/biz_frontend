import React from "react";
import useForm from "lib/form";
import {ActivityDialogContext} from "lib/activity";
import {SnackbarContext} from "react-snackbar";

const useSignUpHook = () => {

  const signUpForm = useForm({
    init: {
      email: "",
      password: ""
    }
  });

  const {
    onValidate,
    formState,
    onChange,
    formHelper,
    errors
  } = signUpForm;

  const {
    showActivity,
    hideActivity
  } = React.useContext(ActivityDialogContext);

  const {
    showMessage,
  } = React.useContext(SnackbarContext);

  const onSignUp = (e) => {
    const headers = {
      current: ""
    };
    e.preventDefault();
    if(!onValidate()) return;
    showActivity("SignUpg in");
    fetch(`http://localhost:3001/auth.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    })
    .then((res) => {
      if(res.status === 200){
        headers.current = {
          headers: res.headers,
          status: res.status
        };
        return res;
      }else if (res.status === 422) {
        res.json()
        .then((res) => {
          console.log(res.errors);
        })
      }else {
        throw "An unknown error occured";
      }
    })
    .then((res) => res.json())
    .then((res) => {
      const {headers, currentUser} = body;
      const {expiry} = headers;
      const auth_headers = {
        "access-token": headers.get("access-token"),
        "client": headers.get("client"),
        "uid": headers.get("uid"),
        "expiry": headers.get("expiry")
      };
      setCookie("iu4", JSON.stringify(auth_headers), expiry); // set cookie on client side because server side requires reload
      showMessage("Signed in");
      history.push("/");
    })
    .catch((err) => {
      showMessage(err)
    })
    .finally(() => hideActivity())
  };


  return{
    signUpForm,
    onSignUp
  }
}

export default useSignUpHook;
