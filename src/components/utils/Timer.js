import { Avatar, Chip, Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import { pauseMeeting, updateDuration } from "../../services/MeetingService";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import DoneIcon from "@material-ui/icons/Done";
import PauseIcon from "@material-ui/icons/Pause";

import { startMeeting, stopMeeting } from "../../services/MeetingService";

export default function Timer({ isActive, setIsActive }) {
  const { selectedMeeting } = useContext(MeetingsContext);
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");

  const [counter, setCounter] = useState(selectedMeeting.duration);

  useEffect(() => {}, [selectedMeeting]);

  function stopTimer() {
    setIsActive(false);
    updateDuration(selectedMeeting.id).update({
      isStarted: false,
    });
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  useEffect(() => {
    let intervalId;

    console.log("CALLED FROM TIMER USEEFFECT");

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
        updateDuration(selectedMeeting.id).update({ duration: counter });
      }, 1000);
    } else {
      setCounter(selectedMeeting.duration);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter, selectedMeeting]);
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">
            {minute} : {second}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <IconButton
            onClick={() => {
              startMeeting(selectedMeeting.id);
              setIsActive(true);
            }}
          >
            <PlayCircleFilledIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => {
              pauseMeeting(selectedMeeting.id);
              setIsActive(false);
            }}
          >
            <PauseIcon fontSize="large" />
          </IconButton>

          <IconButton
            onClick={() => {
              stopMeeting(selectedMeeting.id);
              stopTimer();
            }}
          >
            <DoneIcon />
          </IconButton>

          {/* <Chip
            avatar={<Avatar>{<DoneIcon />}</Avatar>}
            label={selectedMeeting.status}
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
