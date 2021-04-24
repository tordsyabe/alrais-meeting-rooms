import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core";

import Meeting from "../meetings/Meeting";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import MeetingForm from "../forms/MeetingForm";
import MeetingsSkeleton from "../skeletons/MeetingsSkeleton";
import { deleteMeeting } from "../../services/MeetingService";

export default function Unverified() {
  const { unverified, loading } = useContext(MeetingsContext);
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
          <Typography variant='h4'>Unverified Meetings</Typography>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <MeetingsSkeleton />
          ) : (
            <Grid container spacing={2}>
              {unverified.length > 0 ? (
                unverified.map((meeting) => (
                  <Grid item xs={4} key={meeting.id}>
                    <Meeting
                      meeting={meeting}
                      onDashboard={true}
                      selectedCardMeeting={selectedCardMeeting}
                      setSelectedCardMeeting={setSelectedCardMeeting}
                      setSnackBarMessage={setSnackBarMessage}
                      setSnackBarOpen={setSnackBarOpen}
                      setOpenDeleteDialog={setOpenDeleteDialog}
                      setMeetingToDelete={setMeetingToDelete}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography variant='h5'>No Unverified Meetings</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* DIALOG MEETING FORM */}
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
                })
                .catch(() => {
                  setSnackBarMessage("Failed to delete meeting");
                  setSnackBarOpen(true);
                  setOpenDeleteDialog(false);
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
