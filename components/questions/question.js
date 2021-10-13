import React from "react";
import {
  Typography
} from "@material-ui/core";
import Paper from "components/paper";

const Question = ({question}) => {

  return(
    <Paper>
      <div style={{textAlign: "left"}}>
        <Typography variant="h5">
          {question.title}
        </Typography>
        <Typography variant="caption">
          {`by ${question.user.name} - ${question.created_at}`}
        </Typography>
      </div>
    </Paper>
  )

}

export default Question;
