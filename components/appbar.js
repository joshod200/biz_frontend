import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  IconButton,
  Typography
} from "@material-ui/core";
import { useRouter } from 'next/router';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default ({
  title,
}) => {

  const router = useRouter();

  const goBack = () => router.back();

  return(
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography>
          { title }
        </Typography>
      </Toolbar>
    </AppBar>
  )

}
