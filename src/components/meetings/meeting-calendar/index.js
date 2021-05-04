import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import {
  ButtonBase,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Popper,
  Typography,
  Fade,
  Box,
} from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { MeetingsContext } from "../../../contexts/MeetingsContext";
import {
  secondsToLocalTime,
  secondsToLongDate,
} from "../../../utils/dateFormatter";
import Meeting from "../Meeting";

const useStyles = makeStyles((theme) => ({
  selectedCard: {
    background: theme.palette.primary.main,
    height: 120,
    color: "white",
    padding: 10,
    margin: 2,
  },
  card: {
    height: 120,
    padding: 10,
    margin: 2,
  },
}));
export default function MeetingCalendar() {
  const { allMeetings } = useContext(MeetingsContext);
  const classes = useStyles();
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  const [selectedMeeting, setSelectedMeeting] = useState({});

  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMeeting = (meeting) => (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setSelectedMeeting(meeting);
  };

  const openMeetingDetails = Boolean(anchorEl);

  useEffect(() => {
    const day = startDay.clone().subtract(1, "day");

    const a = [];

    while (day.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

    setCalendar(a);
  }, [value]);

  return (
    <React.Fragment>
      <Grid container spacing={4} alignItems="center" justify="center">
        <Grid item xs={1}>
          <IconButton
            onClick={() => setValue(value.clone().subtract(1, "month"))}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" align="center">
            {value.format("MMMM")} {value.format("YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={() => setValue(value.clone().add(1, "month"))}>
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
            }}
          >
            <Typography variant="h5" align="center">
              Sun
            </Typography>
            <Typography variant="h5" align="center">
              Mon
            </Typography>
            <Typography variant="h5" align="center">
              Tue
            </Typography>
            <Typography variant="h5" align="center">
              Wed
            </Typography>

            <Typography variant="h5" align="center">
              Thu
            </Typography>
            <Typography variant="h5" align="center">
              Fri
            </Typography>
            <Typography variant="h5" align="center">
              Sat
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          {calendar.map((week) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 14.27%)",
              }}
            >
              {week.map((day) => (
                <div>
                  {/* <ButtonBase fullwidth> */}
                  <Paper
                    square
                    // onClick={() => setValue(day)}
                    className={
                      value.isSame(day, "day")
                        ? classes.selectedCard
                        : classes.card
                    }
                  >
                    <Typography align="justify" variant="caption">
                      {day.format("D")}
                    </Typography>
                    <br></br>
                    {allMeetings
                      .filter((meeting) =>
                        day.isSame(
                          new Date(meeting.startTime.seconds * 1000),
                          "day"
                        )
                      )
                      .map((filteredMeeting) => (
                        <div
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                          key={filteredMeeting.id}
                        >
                          <Typography
                            onClick={handleClickMeeting(filteredMeeting)}
                            variant="caption"
                            noWrap
                            style={{ cursor: "pointer" }}
                          >
                            {secondsToLocalTime(
                              filteredMeeting.startTime.seconds
                            )}
                            {" - "}{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {filteredMeeting.title}
                            </span>
                          </Typography>

                          <br></br>
                        </div>
                      ))}
                  </Paper>
                  {/* </ButtonBase> */}
                </div>
              ))}
            </div>
          ))}
        </Grid>
      </Grid>

      <Popper
        open={openMeetingDetails}
        anchorEl={anchorEl}
        placement="left"
        transition
        style={{ zIndex: 1500 }}
      >
        {({ TransitionProps }) => (
          // <Fade {...TransitionProps} timeout={350}>
          <Paper elevation={10}>
            <Meeting
              meeting={selectedMeeting}
              // onDashboard={true}
              // selectedCardMeeting={selectedCardMeeting}
              // setSelectedCardMeeting={setSelectedCardMeeting}
              // setSnackBarMessage={setSnackBarMessage}
              // setSnackBarOpen={setSnackBarOpen}
              // setOpenForm={setOpenForm}
            />
          </Paper>
          // </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
}
