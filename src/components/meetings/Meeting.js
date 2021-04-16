import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";

import {
  cancelMeeting,
  undoCancelledMeeting,
  startMeeting,
  stopMeeting,
} from "../../services/MeetingService";
import { MeetingsContext } from "../../contexts/MeetingsContext";

export default function Meeting({ meeting }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { setSelectedMeeting } = useContext(MeetingsContext);

  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);
  };
  return (
    <React.Fragment>
      <Card
        onClick={() => {
          setSelectedMeeting(meeting);
          console.log(meeting);
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='body1'>{meeting.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='caption' color='textSecondary'>
                {new Date(meeting.startDate.seconds * 1000).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(meeting.endDate.seconds * 1000).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Grid>
          </Grid>

          <CardActions>
            <Grid container alignItems='center' justify='center'>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => startMeeting(meeting.id)}
                  disabled={
                    meeting.status === "CANCELLED" ||
                    meeting.status === "ON_GOING" ||
                    meeting.status === "FINISHED"
                  }
                >
                  <PlayCircleFilledIcon />
                </IconButton>
              </Grid>

              <Grid item xs={2}>
                <IconButton
                  onClick={() =>
                    cancelMeeting(meeting.id).then(() => {
                      setSnackBarOpen(true);
                    })
                  }
                  disabled={
                    meeting.status === "CANCELLED" ||
                    meeting.status === "ON_GOING" ||
                    meeting.status === "FINISHED"
                  }
                >
                  <CancelIcon />
                </IconButton>
              </Grid>

              <Grid item xs={4}>
                <IconButton
                  onClick={() => stopMeeting(meeting.id)}
                  disabled={
                    meeting.status === "BOOKED" ||
                    meeting.status === "CANCELLED" ||
                    meeting.status === "FINISHED"
                  }
                >
                  <DoneIcon />
                </IconButton>
              </Grid>

              <Grid item xs={4}>
                <Chip
                  avatar={<Avatar>{<DoneIcon />}</Avatar>}
                  label={meeting.status}
                />
              </Grid>
            </Grid>
            {meeting.duration}
          </CardActions>
        </CardContent>
      </Card>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message='Cancelled Meeting'
        action={
          <React.Fragment>
            <Button
              color='primary'
              size='small'
              onClick={() =>
                undoCancelledMeeting(meeting.id).then(() => {
                  setSnackBarOpen(false);
                })
              }
            >
              UNDO
            </Button>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}
