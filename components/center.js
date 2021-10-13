import React from "react";
import Grid from "@material-ui/core/Grid";

export default ({children, size = 6}) => (
  <>
    <Grid container justify="center" style={{marginTop: "20px"}}>
      <Grid item lg={size} style={{position: "relative"}}>
        {children}
      </Grid>
    </Grid>
  </>
)
