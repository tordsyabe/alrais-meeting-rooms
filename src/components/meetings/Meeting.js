import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

import CancelIcon from "@material-ui/icons/Cancel";

import {
  cancelMeeting,
  undoCancelledMeeting,
} from "../../services/MeetingService";
import { MeetingsContext } from "../../contexts/MeetingsContext";

const useStyles = makeStyles((theme) => ({
  selectedCard: {
    borderColor: theme.palette.primary.main,
    borderWidth: "2px",
    borderStyle: "solid"
  },
}));

export default function Meeting({ meeting }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { setSelectedMeeting, selectedMeeting } = useContext(MeetingsContext);

  const classes = useStyles();

  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);
  };
  return (
    <React.Fragment>
      <Card className={meeting.id === selectedMeeting.id ? classes.selectedCard : undefined}
        onClick={() => {
          setSelectedMeeting(meeting);
          console.log(meeting);
        }}
      >
        <CardContent>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={11}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="body1">{meeting.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(meeting.startDate.seconds * 1000).toLocaleString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}{" "}
                    -{" "}
                    {new Date(meeting.endDate.seconds * 1000).toLocaleString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={1}>
              <IconButton
                onClick={() =>
                  cancelMeeting(meeting.id).then(() => {
                    setSnackBarOpen(true);
                  })
                }
              >
                <CancelIcon />
              </IconButton>
            </Grid>
          </Grid>

          <CardActions>
            <Grid container>
              <Grid item xs={8}></Grid>
              <Grid item xs={4}>
                <Chip
                  avatar={<Avatar>{<DoneIcon />}</Avatar>}
                  label={meeting.status}
                />
                {meeting.duration}
              </Grid>
            </Grid>
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
        message="Cancelled Meeting"
        action={
          <React.Fragment>
            <Button
              color="primary"
              size="small"
              onClick={() =>
                undoCancelledMeeting(meeting.id).then(() => {
                  setSnackBarOpen(false);
                })
              }
            >
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}
