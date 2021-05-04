import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import React, { useContext, useState } from "react";
import { meetingValidation } from "../../utils/validationSchema";

import { KeyboardDateTimePicker } from "formik-material-ui-pickers";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { RoomsContext } from "../../contexts/RoomsContext";
import { saveMeeting } from "../../services/MeetingService";
import { sendEmailVerification } from "../../services/SendEmailVerificationService";
import { AuthContext } from "../../contexts/AuthContext";

import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { MeetingsContext } from "../../contexts/MeetingsContext";

export default function MeetingForm({
  setOpenForm,
  setSnackBarOpen,
  setSnackBarMessage,
  setMeetingToDelete,
  setOpenDeleteDialog,
}) {
  const { rooms } = useContext(RoomsContext);
  const { currentUser } = useContext(AuthContext);
  const { selectedMeeting, setSelectedMeeting } = useContext(MeetingsContext);

  function initialValues() {
    if (selectedMeeting.startTime) {
      return selectedMeeting;
    } else {
      return {
        createdAt: new Date(),
        duration: 0,
        title: "",
        roomId: "",
        meetingDate: new Date(),
        endTime: new Date(),
        startTime: new Date(),
        status: "UNVERIFIED",
        isStarted: false,
        isApproved: false,
        organizer: "",
        isWholeDay: false,
        isEveryWeek: false,
      };
    }
  }

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={meetingValidation}
      onSubmit={(data, { setSubmitting }) => {
        const meetingToSave = {
          meetingDateString: data.startTime.toLocaleDateString(),
          ...data,
        };

        setSubmitting(true);
        saveMeeting(meetingToSave)
          .then((docRef) => {
            if (docRef) {
              docRef.get().then((doc) => {
                const meeting = {
                  id: docRef.id,
                  ...doc.data(),
                };
                console.log("RETURNED", meeting);
                sendEmailVerification(meeting);
              });
            }

            setSubmitting(false);
            setOpenForm(false);
            setSnackBarMessage(
              "Please check your email to verify your booking"
            );
            setSelectedMeeting({});
            setSnackBarOpen(true);
          })
          .catch((error) => {
            console.log(error);
            setSnackBarMessage("Failed to save meeting");
            setSnackBarOpen(true);
            setSubmitting(false);
          });
      }}
    >
      {({ values, errors, isSubmitting, isValid, dirty }) => (
        <Form autoComplete='off'>
          <Field type='hidden' name='id'></Field>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3} alignItems='center'>
              <Grid item xs={8}>
                {currentUser && (
                  <IconButton
                    onClick={() => {
                      setOpenForm(false);
                      setSelectedMeeting({});
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={1}>
                {currentUser && (
                  <IconButton
                    onClick={() => {
                      setOpenDeleteDialog(true);
                      setMeetingToDelete(selectedMeeting);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={3}>
                <Button
                  disabled={isSubmitting || !isValid || !dirty}
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size='0.9rem' />
                    ) : undefined
                  }
                >
                  {isSubmitting ? "Saving" : "Save"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>Details</Typography>
                <br></br>
                <Field
                  fullWidth
                  required
                  name='title'
                  component={TextField}
                  label='Title'
                  variant='outlined'
                ></Field>
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={KeyboardDateTimePicker}
                  disablePast
                  format='yyyy/MM/dd hh:mm a'
                  autoOk
                  label='Start'
                  name='startTime'
                  minutesStep={30}
                  inputVariant='outlined'
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={KeyboardDateTimePicker}
                  disablePast
                  format='yyyy/MM/dd hh:mm a'
                  autoOk
                  label='End'
                  name='endTime'
                  minutesStep={30}
                  inputVariant='outlined'
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h6'>Location</Typography>
                <br></br>
                <Field
                  component={TextField}
                  type='text'
                  name='roomId'
                  label='Select Meeting Room'
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  value={values.roomId}
                  fullWidth
                  required
                >
                  {rooms.map((room) => (
                    <MenuItem value={room.id} key={room.id}>
                      {room.name}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Field
                  fullWidth
                  required
                  name='organizer'
                  component={TextField}
                  label='Provide your email'
                  variant='outlined'
                ></Field>
              </Grid>
              {currentUser && (
                <Grid item xs={12}>
                  <Field
                    component={CheckboxWithLabel}
                    type='checkbox'
                    name='isApproved'
                    Label={{ label: "Verify this meeting" }}
                  />
                </Grid>
              )}

              <Grid item xs={12}></Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Form>
      )}
    </Formik>
  );
}
