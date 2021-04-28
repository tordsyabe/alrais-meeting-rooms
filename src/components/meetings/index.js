import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
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
import { deleteMeeting } from "../../services/MeetingService";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  drawer: {
    width: "600px",
  },
}));

export default function Meetings() {
  const classes = useStyles();

  const { meetings, loading } = useContext(MeetingsContext);
  const [meetingToDelete, setMeetingToDelete] = useState({});

  const [openForm, setOpenForm] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [selectedCardMeeting, setSelectedCardMeeting] = useState("");

  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
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
                    <Meeting
                      meeting={meeting}
                      onDashboard={true}
                      selectedCardMeeting={selectedCardMeeting}
                      setSelectedCardMeeting={setSelectedCardMeeting}
                      setSnackBarMessage={setSnackBarMessage}
                      setSnackBarOpen={setSnackBarOpen}
                      setOpenForm={setOpenForm}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant='h5' align='center' color='textSecondary'>
                    No Meetings
                  </Typography>
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

      <Drawer anchor='right' open={openForm}>
        <div style={{ width: 700 }}>
          <Box p={4}>
            <MeetingForm
              setSnackBarOpen={setSnackBarOpen}
              setOpenForm={setOpenForm}
              setSnackBarMessage={setSnackBarMessage}
              setOpenDeleteDialog={setOpenDeleteDialog}
              setMeetingToDelete={setMeetingToDelete}
            />
          </Box>
          <Button fullWidth>Verify</Button>
        </div>
      </Drawer>

      {/* DIALOG DELETE MEETING CONFIRMATION */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {`Delete meeting "${meetingToDelete.title}"`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this meeting?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() =>
              deleteMeeting(meetingToDelete.id)
                .then(() => {
                  setSnackBarMessage("Successfully deleted meeting");
                  setSnackBarOpen(true);
                  setOpenDeleteDialog(false);
                  setOpenForm(false);
                })
                .catch(() => {
                  setSnackBarMessage("Failed to delete meeting");
                  setSnackBarOpen(true);
                  setOpenDeleteDialog(false);
                  setOpenForm(false);
                })
            }
            color='primary'
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBARS */}
      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackbar}
        message={snackBarMessage}
      />
    </React.Fragment>
  );
}
