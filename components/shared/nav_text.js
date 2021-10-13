import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const NavText = ({text}) => {
  return(
    <Typography align="center">
      <Link href="/sign_up">
        {text}
      </Link>
    </Typography>
  )
}

export default NavText;
