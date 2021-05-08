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
import React, { useContext, useEffect, useState, useRef } from "react";
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
import setDate from "date-fns/setDate";
import { Effect } from "formik-effect";

export default function MeetingForm(props) {
  const { rooms } = useContext(RoomsContext);
  const { currentUser } = useContext(AuthContext);
  const { selectedMeeting, setSelectedMeeting } = useContext(MeetingsContext);

  const [startTimeSelections, setStartTimeSelections] = useState([]);
  const [endTimeSelections, setEndTimeSelections] = useState([]);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [startTimeSelected, setStartTimeSelected] = useState("");

  const handleMeetingDateChange = (e, { value }, setFieldValue) => {
    setFieldValue("date", e);
    setDateSelected(e);
    setStartTimeSelected("");
    setStartTimeSelections([]);
    setEndTimeSelections([]);
  };

  const handleStartTime = (e, { value }, setFieldValue) => {
    setFieldValue("start", e.target.value);
    setStartTimeSelected(e.target.value);
  };

  useEffect(() => {
    setEndTimeSelections([]);
    let endTime12H = startTimeSelected.split(" ");
    let endTime = parseInt(endTime12H[0].split(":")[0]);
    console.log(endTime);
    let endDateSelected = new Date();
    endDateSelected.setDate(endDateSelected.getDate());
    if (dateSelected.toLocaleDateString() !== new Date().toLocaleDateString()) {
      endDateSelected.setHours(endTime - 12);
    }
    endDateSelected.setHours(endTime + 12);

    endDateSelected.setMinutes(0);
    endDateSelected.setMilliseconds(0);
    let minutesToAddToEndTime = 60;

    let endTimeSelection = [];
    let end = new Date(
      endDateSelected.getTime() + minutesToAddToEndTime * 60000
    );
    let endLast = new Date();
    endLast.setDate(dateSelected.getDate());
    endLast.setHours(22);
    endLast.setMinutes(0);
    endLast.setMilliseconds(0);

    while (end < endLast) {
      end = new Date(endDateSelected.getTime() + minutesToAddToEndTime * 60000);
      endTimeSelection.push(dateToLocalTime(end));
      minutesToAddToEndTime += 30;
    }

    setEndTimeSelections(endTimeSelection);
    console.log(endTimeSelection);
  }, [startTimeSelected]);

  useEffect(() => {
    setStartTimeSelections([]);
    let startDateSelected = new Date();
    startDateSelected.setDate(dateSelected.getDate());
    if (dateSelected.toLocaleDateString() !== new Date().toLocaleDateString()) {
      console.log("SAME");
      startDateSelected.setHours(8);
    }
    startDateSelected.setMinutes(0);
    startDateSelected.setMilliseconds(0);
    let minutesToAdd = 0;

    let startTimeSelection = [];

    let start = new Date(startDateSelected.getTime() + minutesToAdd * 60000);
    let startLast = new Date();
    startLast.setDate(dateSelected.getDate());
    startLast.setHours(22);
    startLast.setMinutes(0);
    startLast.setMilliseconds(0);

    while (start < startLast) {
      start = new Date(startDateSelected.getTime() + minutesToAdd * 60000);
      startTimeSelection.push(dateToLocalTime(start));
      minutesToAdd += 30;
    }

    setStartTimeSelections(startTimeSelection);
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
      {({ setFieldValue, values, errors, isSubmitting, isValid, dirty }) => (
        <Form autoComplete='off'>
          <Field type='hidden' name='id'></Field>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3} alignItems='center'>
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

              <Grid item xs={4}>
                <Field
                  component={KeyboardDatePicker}
                  disableToolbar
                  disablePast
                  variant='inline'
                  // format="MM/dd/yyyy"
                  margin='normal'
                  id='date'
                  label='Meeting Date'
                  name='date'
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  fullWidth
                  autoOk
                  inputVariant='outlined'
                  value={values.date}
                  onChange={(e, val) =>
                    handleMeetingDateChange(e, val, setFieldValue)
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <Field
                  component={TextField}
                  type='text'
                  name='start'
                  label='Start'
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  value={values.start}
                  fullWidth
                  required
                  onChange={(e, val) => handleStartTime(e, val, setFieldValue)}
                >
                  {startTimeSelections.map((startTime) => (
                    <MenuItem value={startTime} key={startTime}>
                      {startTime}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={4}>
                <Field
                  component={TextField}
                  type='text'
                  name='end'
                  label='End'
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  value={values.end}
                  fullWidth
                  required
                >
                  {endTimeSelections.map((endTime) => (
                    <MenuItem value={endTime} key={endTime}>
                      {endTime}
                    </MenuItem>
                  ))}
                </Field>
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
