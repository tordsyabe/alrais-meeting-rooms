import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { dateToLocalTime } from "../../../utils/dateFormatter";
import Meeting from "../Meeting";
import { MeetingCardContext } from "../../../contexts/MeetingCardContext";
import { MeetingsContext } from "../../../contexts/MeetingsContext";

const useStyles = makeStyles((theme) => ({
  selectedCard: {
    background: theme.palette.primary.main,
    height: 130,
    color: "white",
    padding: 10,
    margin: 2,
  },
  card: {
    height: 130,
    padding: 10,
    margin: 2,
  },
  approvedMeetingText: {
    background: theme.palette.info.light,
  },

  unverifiedMeetingText: {
    background: theme.palette.error.light,
  },
}));
export default function MeetingCalendar({ meetings, loading }) {
  const classes = useStyles();
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  const { selectedMeeting, setSelectedMeeting } = useContext(MeetingsContext);

  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");

  const [anchorEl, setAnchorEl] = useState(null);

  const { openPopperMeetingDetails, setOpenPopperMeetingDetails } = useContext(
    MeetingCardContext
  );

  const handleClickMeeting = (meeting) => (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedMeeting(meeting);
    setOpenPopperMeetingDetails(!openPopperMeetingDetails);
  };

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
      <Grid container spacing={4} alignItems='center' justify='center'>
        <Grid item xs={1}>
          <IconButton
            onClick={() => setValue(value.clone().subtract(1, "month"))}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <Typography variant='h5' align='center'>
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
            <Typography variant='h5' align='center'>
              Sun
            </Typography>
            <Typography variant='h5' align='center'>
              Mon
            </Typography>
            <Typography variant='h5' align='center'>
              Tue
            </Typography>
            <Typography variant='h5' align='center'>
              Wed
            </Typography>

            <Typography variant='h5' align='center'>
              Thu
            </Typography>
            <Typography variant='h5' align='center'>
              Fri
            </Typography>
            <Typography variant='h5' align='center'>
              Sat
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          {calendar.map((week, index) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 14.27%)",
              }}
              key={index}
            >
              {week.map((day, index) => (
                <div key={index}>
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
                    <Typography align='justify' variant='caption'>
                      {day.format("D")}
                    </Typography>
                    <br></br>
                    {meetings
                      .filter((meeting) =>
                        day.isSame(new Date(meeting.startTime), "day")
                      )
                      .map((filteredMeeting) => (
                        <div
                          className={
                            filteredMeeting.isApproved
                              ? classes.approvedMeetingText
                              : classes.unverifiedMeetingText
                          }
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            borderRadius: "5px",
                            margin: "2px 0",
                            padding: "0 2px",
                          }}
                          key={filteredMeeting.id}
                        >
                          <Typography
                            onClick={handleClickMeeting(filteredMeeting)}
                            variant='caption'
                            noWrap
                            style={{ cursor: "pointer" }}
                          >
                            {dateToLocalTime(filteredMeeting.startTime)}
                            {" - "}{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {filteredMeeting.title}
                            </span>
                          </Typography>
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
        open={openPopperMeetingDetails}
        anchorEl={anchorEl}
        placement='left'
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
