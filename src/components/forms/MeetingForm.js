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

export default function MeetingForm({
  setOpenForm,
  setSnackBarOpen,
  setSnackBarMessage,
}) {
  const { rooms } = useContext(RoomsContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <Formik
      initialValues={{
        createdAt: new Date(),
        duration: 0,
        title: "",
        roomId: "",
        meetingDate: new Date(),
        endTime: new Date(),
        startTime: new Date(),
        status: "UNVERIFIED",
        isStarted: false,
        isVerified: false,
        isApproved: false,
        organizer: "",
        isWholeDay: false,
        isEveryWeek: false,
      }}
      validationSchema={meetingValidation}
      onSubmit={(data, { setSubmitting }) => {
        const meetingToSave = {
          meetingDateString: data.startTime.toLocaleDateString(),
          ...data,
        };

        setSubmitting(true);
        saveMeeting(meetingToSave)
          .then((docRef) => {
            setSubmitting(false);
            setOpenForm(false);
            setSnackBarMessage(
              "Please check your email to verify your booking"
            );
            setSnackBarOpen(true);
            docRef.get().then((doc) => {
              const meeting = {
                id: docRef.id,
                ...doc.data(),
              };

              // sendEmailVerification(meeting);
            });
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
        <Form autoComplete="off">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={8}>
                <IconButton onClick={() => setOpenForm(false)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <Button
                  disabled={isSubmitting || !isValid || !dirty}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size="0.9rem" />
                    ) : undefined
                  }
                >
                  {isSubmitting ? "Saving" : "Save"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  required
                  name="title"
                  component={TextField}
                  label="Title"
                  variant="outlined"
                ></Field>
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={KeyboardDateTimePicker}
                  format="yyyy/MM/dd hh:mm a"
                  autoOk
                  label="Start"
                  name="startTime"
                  minutesStep={30}
                  inputVariant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={KeyboardDateTimePicker}
                  format="yyyy/MM/dd hh:mm a"
                  autoOk
                  label="End"
                  name="endTime"
                  minutesStep={30}
                  inputVariant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="isWholeDay"
                  Label={{ label: "Make the whole day" }}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="isEveryWeek"
                  Label={{ label: "Repeat everyweek" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Location</Typography>
                <br></br>
                <Field
                  component={TextField}
                  type="text"
                  name="roomId"
                  label="Select Meeting Room"
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
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
                  name="organizer"
                  component={TextField}
                  label="Provide your email"
                  variant="outlined"
                ></Field>
              </Grid>
              {currentUser && (
                <Grid item xs={12}>
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name="isVerified"
                    Label={{ label: "Verify and approve this meeting" }}
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
