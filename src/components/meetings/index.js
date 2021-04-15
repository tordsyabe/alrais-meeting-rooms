import {
  Fab,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import AddIcon from "@material-ui/icons/Add";
import Meeting from "./Meeting";
import { MeetingsContext } from "../../contexts/MeetingsContext";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Meetings() {
  const classes = useStyles();

  const { meetings, loading } = useContext(MeetingsContext);
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={1}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h5" align="center">
                Today
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton>
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {meetings.map((meeting) => (
              <Grid item xs={4} key={meeting.id}>
                <Meeting meeting={meeting} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
