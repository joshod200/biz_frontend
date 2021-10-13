import React from "react";
import Paper from "@material-ui/core/Paper";

const PaddedPaper = ({children}) => (
  <Paper style={{padding: "20px"}}>
    {children}
  </Paper>
);

export default PaddedPaper;
