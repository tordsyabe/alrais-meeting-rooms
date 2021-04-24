import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import { Route, Switch } from "react-router";
import Meetings from "../meetings/index";
import Rooms from "../rooms/index";

import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import { Badge } from "@material-ui/core";
import Approvals from "../approvals";
import Unverified from "../unverified";
import { constants } from "../../utils/constants";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const history = useHistory();
  const location = useLocation();

  const {
    APPROVAL_LINK,
    MEETINGS_LINK,
    ROOMS_LINK,
    UNVERIFIED_LINK,
  } = constants;

  const { handleLogout } = useContext(AuthContext);
  const { toggleTheme, isDark } = useContext(ThemeContext);
  const { forApprovals } = useContext(MeetingsContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar variant='dense'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap className={classes.title}>
            Alrais Meeting Rooms
          </Typography>
          <IconButton
            aria-label='display more actions'
            edge='end'
            color='inherit'
            onClick={toggleTheme}
            className={classes.menuButton}
          >
            {isDark ? (
              <Brightness5Icon fontSize='small' />
            ) : (
              <Brightness7Icon fontSize='small' />
            )}
          </IconButton>
          <IconButton
            aria-label='display more actions'
            edge='end'
            color='inherit'
            onClick={handleLogout}
            className={classes.menuButton}
          >
            <ExitToAppIcon fontSize='small' />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            selected={location.pathname === MEETINGS_LINK}
            button
            onClick={() => history.push(MEETINGS_LINK)}
          >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary='Meetings' />
          </ListItem>

          <ListItem
            selected={location.pathname === ROOMS_LINK}
            button
            onClick={() => history.push(ROOMS_LINK)}
          >
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary='Rooms' />
          </ListItem>

          <ListItem
            selected={location.pathname === APPROVAL_LINK}
            button
            onClick={() => history.push(APPROVAL_LINK)}
          >
            <ListItemIcon>
              <Badge badgeContent={forApprovals.length} color='secondary'>
                <EventSeatIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary='For Approvals' />
          </ListItem>

          <ListItem
            selected={location.pathname === UNVERIFIED_LINK}
            button
            onClick={() => history.push(UNVERIFIED_LINK)}
          >
            <ListItemIcon>
              <Badge badgeContent={6} color='secondary'>
                <AssignmentLateIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary='Unverified' />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path={MEETINGS_LINK} component={Meetings} />
          <Route path={ROOMS_LINK} component={Rooms} />
          <Route path={APPROVAL_LINK} component={Approvals} />
          <Route path={UNVERIFIED_LINK} component={Unverified} />
        </Switch>
      </main>
    </div>
  );
}
