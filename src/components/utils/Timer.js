import { Grid, IconButton, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import {
  cancelMeeting,
  pauseMeeting,
  updateDuration,
} from "../../services/MeetingService";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";

import PauseIcon from "@material-ui/icons/Pause";

import { startMeeting, stopMeeting } from "../../services/MeetingService";

export default function Timer({
  isActive,
  setIsActive,
  selectedCardMeeting,
  setSelectedCardMeeting,
}) {
  const { selectedMeeting, setSelectedMeeting } = useContext(MeetingsContext);
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
          <Typography variant='h1'>
            {minute} : {second}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <IconButton
            onClick={() => {
              startMeeting(selectedMeeting.id);
              setIsActive(true);
            }}
            disabled={
              selectedCardMeeting === "" ||
              isActive ||
              selectedMeeting.status === "FINISHED" ||
              selectedMeeting.status === "CANCELLED"
            }
          >
            <PlayCircleFilledIcon fontSize='large' />
          </IconButton>
          <IconButton
            onClick={() => {
              pauseMeeting(selectedMeeting.id);
              setIsActive(false);
            }}
            disabled={
              selectedCardMeeting === "" ||
              !isActive ||
              selectedMeeting.status === "FINISHED" ||
              selectedMeeting.status === "CANCELLED"
            }
          >
            <PauseIcon fontSize='large' />
          </IconButton>

          <IconButton
            onClick={() => {
              stopMeeting(selectedMeeting.id);
              stopTimer();
              setSelectedMeeting({ title: "FREE" });
              setSelectedCardMeeting("");
            }}
            disabled={
              selectedCardMeeting === "" ||
              selectedMeeting.status === "FINISHED" ||
              selectedMeeting.status === "CANCELLED"
            }
          >
            <DoneIcon />
          </IconButton>

          <IconButton
            onClick={() =>
              cancelMeeting(selectedMeeting.id).then(() => {
                setSelectedCardMeeting("");
              })
            }
            disabled={
              selectedCardMeeting === "" ||
              isActive ||
              selectedMeeting.status === "FINISHED" ||
              selectedMeeting.status === "CANCELLED"
            }
          >
            <CancelIcon />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
