import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import AddIcon from "@material-ui/icons/Add";
import Meeting from "./Meeting";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import MeetingForm from "../forms/MeetingForm";
import MeetingsSkeleton from "../skeletons/MeetingsSkeleton";

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

  const [openForm, setOpenForm] = React.useState(false);

  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container alignItems='center' justify='center'>
            <Grid item xs={1}>
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='h5' align='center'>
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
          {loading ? (
            <MeetingsSkeleton />
          ) : (
            <Grid container spacing={2}>
              {meetings.length > 0 ? (
                meetings.map((meeting) => (
                  <Grid item xs={4} key={meeting.id}>
                    <Meeting meeting={meeting} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant='h5'>No Meetings</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Fab
        color='primary'
        aria-label='add'
        className={classes.fab}
        onClick={() => setOpenForm(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog open={openForm} onClose={() => {}}>
        <DialogTitle id='form-dialog-title'>New Meeting</DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <DialogContentText>
            Please provide meeting information.
          </DialogContentText>
          <MeetingForm
            setSnackBarOpen={setSnackBarOpen}
            setOpenForm={setOpenForm}
            setSnackBarMessage={setSnackBarMessage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackbar}
        message={snackBarMessage}
      />
    </React.Fragment>
  );
}
