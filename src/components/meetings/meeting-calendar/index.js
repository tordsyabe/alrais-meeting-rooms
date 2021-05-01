import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  selectedCard: {
    background: theme.palette.primary.main,
    height: 100,
    color: "white",
  },
  card: {
    height: 100,
  },
}));
export default function MeetingCalendar() {
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

  console.log(calendar);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          {value.format("MMMM")} {value.format("YYYY")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {calendar.map((week) => (
          <Grid container spacing={2} justify="center">
            {week.map((day) => (
              <Grid item xs={1}>
                <Card
                  onClick={() => setValue(day)}
                  className={
                    value.isSame(day, "day")
                      ? classes.selectedCard
                      : classes.card
                  }
                >
                  <CardActionArea className={classes.card}>
                    <CardContent>
                      <Typography align="justify">{day.format("D")}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
