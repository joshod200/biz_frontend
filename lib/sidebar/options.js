import React from "react";
import {List, ListItem, ListItemIcon, ListItemText, Divider} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar
}));

const options = [
  { name: "Home", path: "/", Icon: HomeIcon },
  { name: "Profile", path: "/profile", Icon: PersonIcon }
]

const Drawer = () => {
  //const classes = useStyles();

  const router = useRouter();

  const isActivePath = (path) => {
    var style = router.asPath === path ? {
      backgroundColor: "#3f51b5",
      color: "#fff"
    } : null
    return style;
  }

  return(
    <div>
      <div />
      <Divider />
      <List>
        {options.map(({name, Icon, path}, i) => (
          <ListItem button key={i} style={isActivePath(path)}>
            <ListItemIcon>
              <Icon color="inherit" />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </div>
  )
};

export default Drawer;
