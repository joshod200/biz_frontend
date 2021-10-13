import React from "react";
import {TextField} from "@material-ui/core";

export default ({onChange, value, formHelper, errors}) => {

  const error = formHelper(value, "email", "required|email", { errorField: errors.email });

  return(
    <TextField
      onChange={onChange}
      value={value}
      margin="normal"
      name={"email"}
      type="email"
      label="Email"
      helperText={error}
      error={Boolean(error)}
      fullWidth
    />
  )
}
