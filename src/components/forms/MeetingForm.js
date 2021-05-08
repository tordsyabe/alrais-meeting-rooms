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
import React, { useContext, useEffect, useState } from "react";
import { meetingValidation } from "../../utils/validationSchema";

import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "formik-material-ui-pickers";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { RoomsContext } from "../../contexts/RoomsContext";
import { saveMeeting } from "../../services/MeetingService";
import { sendEmailVerification } from "../../services/SendEmailVerificationService";
import { AuthContext } from "../../contexts/AuthContext";

import CloseIcon from "@material-ui/icons/Close";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import { MeetingCardContext } from "../../contexts/MeetingCardContext";
import { dateToLocalTime } from "../../utils/dateFormatter";

export default function MeetingForm(props) {
  const { rooms } = useContext(RoomsContext);
  const { currentUser } = useContext(AuthContext);
  const { selectedMeeting, setSelectedMeeting } = useContext(MeetingsContext);

  const [startTimeSelection, setStartTimeSelection] = useState([]);
  const [dateSelected, setDateSelected] = useState(new Date());

  useEffect(() => {
    dateSelected.setDate(dateSelected.getDate());
    if (dateSelected.toLocaleDateString() !== new Date().toLocaleDateString()) {
      dateSelected.setHours(8);
    }
    dateSelected.setMinutes(0);
    dateSelected.setMilliseconds(0);
    var minutesToAdd = 30;

    const last = new Date();
    last.setDate(dateSelected.getDate());
    last.setHours(17);
    last.setMinutes(0);
    last.setMilliseconds(0);

    const startTimeSelection = [];

    let time = new Date(dateSelected.getTime() + minutesToAdd * 60000);

    console.log("DATE SELECTED", dateSelected.toLocaleDateString());
    console.log("TODAY", new Date().toLocaleDateString());

    while (time < last) {
      time = new Date(dateSelected.getTime() + minutesToAdd * 60000);
      startTimeSelection.push(dateToLocalTime(time));
      minutesToAdd += 30;
    }

    setStartTimeSelection(startTimeSelection);
    console.log(startTimeSelection);
  }, [dateSelected]);

  const {
    setOpenFormDrawer,
    setSnackBarMessage,
    setSnackBarOpen,
    setOpenPopperMeetingDetails,
  } = useContext(MeetingCardContext);

  function initialValues() {
    if (selectedMeeting.startTime) {
      return selectedMeeting;
    } else {
      return {
        createdAt: new Date(),
        duration: 0,
        title: "",
        roomId: "",
        meetingDate: new Date().toISOString().split("T")[0],
        endTime: new Date(),
        startTime: new Date(),
        status: "UNVERIFIED",
        isStarted: false,
        isApproved: false,
        organizer: "",
        isWholeDay: false,
        isEveryWeek: false,
        start: "",
        end: "",
        date: new Date(),
      };
    }
  }

  return (
    <Formik
      initialValues={initialValues()}
      validationSchema={meetingValidation}
      onSubmit={(data, { setSubmitting }) => {
        const meetingToSave = {
          ...data,
          meetingDate: data.startTime.toISOString().split("T")[0],
        };

        console.log(meetingToSave);

        setSubmitting(true);

        saveMeeting(meetingToSave)
          .then((docRef) => {
            if (docRef && meetingToSave.isApproved === false) {
              docRef.get().then((doc) => {
                const meeting = {
                  id: docRef.id,
                  ...doc.data(),
                };
                console.log("RETURNED", meeting);
                sendEmailVerification(meeting);
                setSnackBarMessage(
                  "Please check your email to verify your booking"
                );
              });
            }

            setSubmitting(false);
            setOpenFormDrawer(false);
            setSnackBarMessage("Meeting saved successfully");
            setSelectedMeeting({});
            setSnackBarOpen(true);
            setOpenPopperMeetingDetails(false);
          })
          .catch((error) => {
            console.log(error);
            setSnackBarMessage("Failed to save meeting");
            setSnackBarOpen(true);
            setSubmitting(false);
            setOpenPopperMeetingDetails(false);
          });
      }}
    >
      {({ values, errors, isSubmitting, isValid, dirty }) => (
        <Form autoComplete="off">
          <Field type="hidden" name="id"></Field>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={9}>
                {currentUser && (
                  <IconButton
                    onClick={() => {
                      setOpenFormDrawer(false);
                      // setSelectedMeeting({});
                      // setOpenPopperMeetingDetails(false);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
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
                <Typography variant="h6">Details</Typography>
                <br></br>
                <Field
                  fullWidth
                  required
                  name="title"
                  component={TextField}
                  label="Title"
                  variant="outlined"
                ></Field>
              </Grid>

              {/* <Grid item xs={4}>
                <Field
                  component={TextField}
                  label="Meeting Date"
                  name="meetingDate"
                  variant="outlined"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </Grid> */}

              <Grid item xs={6}>
                <Field
                  component={KeyboardDateTimePicker}
                  disablePast
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
                  disablePast
                  format="yyyy/MM/dd hh:mm a"
                  autoOk
                  label="End"
                  name="endTime"
                  minutesStep={30}
                  inputVariant="outlined"
                />
              </Grid>

              <Grid item xs={5}>
                <Field
                  component={KeyboardDatePicker}
                  disableToolbar
                  variant="inline"
                  // format="MM/dd/yyyy"
                  margin="normal"
                  id="date"
                  label="Meeting Date"
                  name="date"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  fullWidth
                  autoOk
                  onChange={setDateSelected(values.date)}
                  inputVariant="outlined"
                />
              </Grid>

              <Grid item xs={3}>
                <Field
                  component={TextField}
                  type="text"
                  name="start"
                  label="Start"
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={values.start}
                  fullWidth
                  required
                  // onChange={setEndTimings()}
                >
                  {startTimeSelection.map((startTime) => (
                    <MenuItem value={startTime} key={startTime}>
                      {startTime}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={3}>
                <Field
                  component={TextField}
                  type="text"
                  name="end"
                  label="End"
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={values.end}
                  fullWidth
                  required
                >
                  {startTimeSelection.map((startTime) => (
                    <MenuItem value={startTime} key={startTime}>
                      {startTime}
                    </MenuItem>
                  ))}
                </Field>
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
                    name="isApproved"
                    Label={{ label: "Verify this meeting" }}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                {JSON.stringify(values, null, 4)}
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Form>
      )}
    </Formik>
  );
}
