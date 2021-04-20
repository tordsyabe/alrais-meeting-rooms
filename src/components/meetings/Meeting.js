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

import { undoCancelledMeeting } from "../../services/MeetingService";
import { MeetingsContext } from "../../contexts/MeetingsContext";

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "pointer",
  },

  notSelectedCard: {
    pointerEvents: "none",
    cursor: "default",
  },

  hideCardActions: {
    display: "none",
  },
}));

export default function Meeting({
  meeting,
  isActive,
  onDashboard,
  selectedCardMeeting,
  setSelectedCardMeeting,
}) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { setSelectedMeeting, selectedMeeting } = useContext(MeetingsContext);
  

  const classes = useStyles();

  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);
  };
  return (
    <React.Fragment>
      <Card
        className={
          isActive && selectedCardMeeting !== meeting.id
            ? classes.notSelectedCard
            : classes.card
        }
        raised={meeting.id === selectedMeeting.id ? true : false}
      >
        <CardContent
          onClick={() => {
            setSelectedMeeting(meeting);
            setSelectedCardMeeting(meeting.id);
          }}
        >
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    color={
                      isActive && selectedCardMeeting !== meeting.id
                        ? "textSecondary"
                        : undefined
                    }
                  >
                    {meeting.title}
                  </Typography>
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
          </Grid>

          <Grid container alignItems="center">
            <Grid item xs={8}>
              <Typography variant="caption" color="textSecondary">
                Meeting Duration: {meeting.duration}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Chip
                avatar={<Avatar>{<DoneIcon />}</Avatar>}
                label={meeting.status}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          className={onDashboard && selectedCardMeeting === meeting.id ? undefined : classes.hideCardActions}
        >
          <Button>EDIT</Button>
          <Button>DELETE</Button>
        </CardActions>
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
