import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import MeetingForm from "../forms/MeetingForm";

import CloseIcon from "@material-ui/icons/Close";
import MeetingCalendar from "../meetings/meeting-calendar";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import { MeetingCardContext } from "../../contexts/MeetingCardContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  bg: {
    background: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url("https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80") no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "right center",
  },

  quote: {
    borderLeft: ".9rem solid #dc4a4a",
    paddingLeft: "2rem",
    fontWeight: "bold",
    color: "#ffffff"
  },

  inspire: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));

export default function FillUpPage() {
  const classes = useStyles();

  const { approvedMeetings } = useContext(MeetingsContext);

  const { setOpenPopperMeetingDetails } = useContext(MeetingCardContext);

  const [setOpenForm] = useState(false);

  const [openCalendar, setOpenCalendar] = useState(false);


  const handleCloseCalendar = () => {
    setOpenCalendar(false);
  };

  const {
    snackBarOpen,
    handleCloseSnackbar,
    snackBarMessage,
  } = useContext(MeetingCardContext);

  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={5}>
          <Box px={5} py={3}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12}>
                <Typography variant='h4'>
                  Fill up the form to book your meeting
                </Typography>
              </Grid> */}
              <Grid item xs={12} style={{ flexGrow: 1 }}>
                <Box>
                  <Typography variant="h5">
                    Provide meeting information
                  </Typography>
                  <br></br>
                  <MeetingForm />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {"Alrais Meeting Room Booking System, developed and maintaned by Alrais IT Department. Copyright © "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={7} className={classes.bg}>
          <Box p={5} fontWeight="bold" className={classes.inspire}>
            <Typography variant="h2" className={classes.quote}>
              "Whoever is happy will make others happy too."
            </Typography>
            <br></br>
            <br></br>
            <Typography variant="h5" align="right" color="textSecondary">
              - Anne Frank
            </Typography>
            <br></br>
            <br></br>
            <Button
              onClick={() => setOpenCalendar(true)}
              variant="contained"
              color="secondary"
            >
              Check Calendar
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackBarOpen}
        onClose={handleCloseSnackbar}
        message={snackBarMessage}
      />

      <Dialog
        fullScreen
        disableEnforceFocus
        open={openCalendar}
        onClose={handleCloseCalendar}
        // TransitionComponent={Transition}
      >
        <Box p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  handleCloseCalendar();
                  setOpenPopperMeetingDetails(false);
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12}>
              <MeetingCalendar meetings={approvedMeetings} />
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
