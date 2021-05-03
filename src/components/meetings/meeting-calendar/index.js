import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import {
  ButtonBase,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { MeetingsContext } from "../../../contexts/MeetingsContext";
import { secondsToLocalTime } from "../../../utils/dateFormatter";

const useStyles = makeStyles((theme) => ({
  selectedCard: {
    background: theme.palette.primary.main,
    height: 120,
    color: "white",
    padding: 10,
    margin: 2,
    cursor: "pointer",
  },
  card: {
    height: 120,
    padding: 10,
    margin: 2,
    cursor: "pointer",
  },
}));
export default function MeetingCalendar() {
  const { allMeetings } = useContext(MeetingsContext);
  const classes = useStyles();
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");

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

  console.log(allMeetings);

  return (
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
                  onClick={() => setValue(day)}
                  className={
                    value.isSame(day, "day")
                      ? classes.selectedCard
                      : classes.card
                  }
                >
                  <Typography
                    align="justify"
                    variant="caption"
                    color="textSecondary"
                  >
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
                      >
                        <Typography
                          variant="caption"
                          noWrap
                          key={filteredMeeting.id}
                          onClick={() => console.log(filteredMeeting)}
                        >
                          {secondsToLocalTime(
                            filteredMeeting.startTime.seconds
                          )}
                          {" - "} {filteredMeeting.title}
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
  );
}
