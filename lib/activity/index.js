import React from "react";
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Typography
} from "@material-ui/core";

export const ActivityDialogContext = React.createContext();

const ActivityDialog = () => {

  const activityDialogState = React.useContext(ActivityDialogContext);

  const {open, message} = activityDialogState;

  return (
    <React.Fragment>
      <Dialog {...{open}}>
        <DialogContent style={{display: "flex", alignItems: "center"}}>
          <CircularProgress />
          <Typography style={{marginLeft: "20px"}}>
            {message}
          </Typography>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );

};

export default (Component) => (props) => {

  const [activityDialogState, setActivityDialogState] = React.useState({
    open: false,
    message: ""
  });

  const hideActivity = () => setActivityDialogState({ ...activityDialogState, open: false });

  const showActivity = (message) => setActivityDialogState({ message, open: true });

  const activityContext = {
    activityDialogState,
    hideActivity,
    showActivity
  };

  return (
    <ActivityDialogContext.Provider value={activityContext}>
      <Component {...props} />
      <ActivityDialog />
    </ActivityDialogContext.Provider>
  );

};
