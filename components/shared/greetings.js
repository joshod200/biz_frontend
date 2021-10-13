import React from "react";
import Typography from "@material-ui/core/Typography";


const Greetings = ({text}) => {
  return(
    <Typography variant="h6" align="center">
      {text}
    </Typography>
  )
}

export default Greetings;
