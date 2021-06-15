import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Fab,
  Grid,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import React, { useContext, useState } from "react";

import AddIcon from "@material-ui/icons/Add";

import { MeetingsContext } from "../../contexts/MeetingsContext";
import MeetingForm from "../forms/MeetingForm";

import { deleteMeeting } from "../../services/MeetingService";
import MeetingCalendar from "./meeting-calendar";
import { MeetingCardContext } from "../../contexts/MeetingCardContext";
import { sendRejectedEmail } from "../../services/SendEmailVerificationService";

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

  const { allMeetings, loading, setSelectedMeeting } =
    useContext(MeetingsContext);
  const {
    openFormDrawer,
    openDeleteDialog,
    handleCloseDeleteDialog,
    meetingToDelete,
    setSnackBarMessage,
    setSnackBarOpen,
    setOpenDeleteDialog,
    snackBarOpen,
    handleCloseSnackbar,
    setOpenFormDrawer,
    snackBarMessage,
    setMeetingToDelete,
    setOpenPopperMeetingDetails,
  } = useContext(MeetingCardContext);

  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MeetingCalendar meetings={allMeetings} loading={loading} />
        </Grid>
      </Grid>

      <Drawer anchor='right' open={openFormDrawer}>
        <div style={{ width: 700 }}>
          <Box p={4}>
            <MeetingForm />
          </Box>
        </div>
      </Drawer>

      {/* DIALOG DELETE MEETING CONFIRMATION */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        style={{ zIndex: 1600 }}
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
          <Button
            onClick={() => {
              handleCloseDeleteDialog();
              setMeetingToDelete({});
            }}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            startIcon={
              isDeleting ? <CircularProgress size='0.9rem' /> : undefined
            }
            disabled={isDeleting}
            onClick={() => {
              setIsDeleting(true);
              setOpenPopperMeetingDetails(false);
              deleteMeeting(meetingToDelete.id)
                .then(() => {
                  setSnackBarMessage("Successfully deleted meeting");
                  setSnackBarOpen(true);
                  setOpenDeleteDialog(false);
                  setIsDeleting(false);
                })
                .catch(() => {
                  setSnackBarMessage("Failed to delete meeting");
                  setSnackBarOpen(true);
                  setOpenDeleteDialog(false);
                  setOpenPopperMeetingDetails(false);
                });
            }}
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

      <Fab
        color='primary'
        aria-label='add'
        className={classes.fab}
        onClick={() => {
          setSelectedMeeting({});
          setOpenPopperMeetingDetails(false);
          setOpenFormDrawer(true);
          console.log(new Date().toISOString().split("T")[0]);
        }}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
