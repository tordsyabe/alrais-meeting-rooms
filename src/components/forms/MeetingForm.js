import { Button, CircularProgress, Grid, MenuItem } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useContext } from "react";
import { meetingValidation } from "../../utils/validationSchema";

import { DateTimePicker } from "formik-material-ui-pickers";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { RoomsContext } from "../../contexts/RoomsContext";
import { saveMeeting } from "../../services/MeetingService";

export default function MeetingForm({
  setOpenForm,
  setSnackBarOpen,
  setSnackBarMessage,
}) {
  const { rooms } = useContext(RoomsContext);

  return (
    <Formik
      initialValues={{
        createdAt: new Date(),
        duration: 0,
        endDate: new Date(),
        title: "",
        roomId: "",
        startDate: new Date(),
        status: "BOOKED",
        meetingDate: new Date(),
        isStarted: false,
      }}
      validationSchema={meetingValidation}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        saveMeeting(data)
          .then(() => {
            setSubmitting(false);
            setOpenForm(false);
            setSnackBarMessage("Meeting saved successfully");
            setSnackBarOpen(true);
          })
          .catch((error) => {
            console.log(error);
            setSnackBarMessage("Failed to save meeting");
            setSnackBarOpen(true);
            setSubmitting(false);
          });
        console.log(data);
      }}
    >
      {({ values, errors, isSubmitting, isValid, dirty }) => (
        <Form autoComplete='off'>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  required
                  name='title'
                  component={TextField}
                  label='Title'
                ></Field>
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={DateTimePicker}
                  label='Start Time'
                  name='startDate'
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={DateTimePicker}
                  label='End Time'
                  name='endDate'
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  component={TextField}
                  type='text'
                  name='roomId'
                  label='Select Meeting Room'
                  select
                  //   InputLabelProps={{
                  //     shrink: true,
                  //   }}
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
            </Grid>
          </MuiPickersUtilsProvider>
        </Form>
      )}
    </Formik>
  );
}
