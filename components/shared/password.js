import React from "react";
import {TextField, IconButton, InputAdornment} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default ({onChange, value, formHelper, errors, confirmation = false}) => {

  const [show, setShow] = React.useState(false);

  const handleSetShow = () => setShow(!show);

  const name = confirmation? "password_confirmation" : "password";
  const label = confirmation? "Password Confirmation" : "Password";
  const field = confirmation? "password confirmation" : "password";
  const errorField = confirmation? errors.password_confirmation : errors.password;

  const error = formHelper(value, field, "required|min:8", {errorField});

  return (
    <TextField
      onChange={onChange}
      value={value}
      margin="normal"
      name={name}
      label={label}
      type={show? "text" : "password"}
      helperText={error}
      error={Boolean(error)}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleSetShow}
            >
              {show ?  <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}
