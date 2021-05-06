import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useLocation } from "react-router-dom";

import { MeetingsContext } from "../../contexts/MeetingsContext";
import { dateToLocalTime, dateToLongDate } from "../../utils/dateFormatter";
import { MeetingCardContext } from "../../contexts/MeetingCardContext";
import { approveMeeting, approveStatus } from "../../services/MeetingService";
import { TimerContext } from "../../contexts/TimerContext";

const useStyles = makeStyles(() => ({
  card: {
    cursor: "pointer",
  },

  notSelectedCard: {
    pointerEvents: "none",
    cursor: "default",
  },
}));

export default function Meeting({ meeting }) {
  const {
    setOpenFormDrawer,
    setOpenDeleteDialog,
    setMeetingToDelete,
    setOpenPopperMeetingDetails,
    setSnackBarMessage,
    setSnackBarOpen,
  } = useContext(MeetingCardContext);
  const { setSelectedMeeting, selectedMeeting } = useContext(MeetingsContext);
  const { isActive, selectedCardMeeting, setSelectedCardMeeting } = useContext(
    TimerContext
  );
  const location = useLocation();

  const [isApproving, setIsApproving] = useState(false);

  // const handleOpenForm = () => {
  //   location.pathname.includes("/app") ? setOpenForm(true) : console.log();
  // };

  const classes = useStyles();
  return (
    <React.Fragment>
      <Card
        onClick={() => {
          setSelectedMeeting(meeting);
          setSelectedCardMeeting(meeting.id);
          console.log(meeting);
        }}
        className={
          isActive && selectedCardMeeting !== meeting.id
            ? classes.notSelectedCard
            : classes.card
        }
        raised={meeting.id === selectedMeeting.id ? true : false}
      >
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={9}>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h6">{meeting.title}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="caption">
                    {dateToLongDate(meeting.startTime)}
                  </Typography>
                </Grid>

                {
                  <Grid item xs={12}>
                    <Typography color="textSecondary" variant="caption">
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <AccessTimeIcon fontSize="small" />
                        </Grid>
                        <Grid item>
                          {dateToLocalTime(meeting.startTime)} -{" "}
                          {dateToLocalTime(meeting.endTime)}
                        </Grid>
                      </Grid>
                    </Typography>
                  </Grid>
                }
              </Grid>
            </Grid>
            {!location.pathname.includes("/app") && (
              <Grid item={3}>
                <Typography variant="subtitle1">{meeting.status}</Typography>
              </Grid>
            )}
          </Grid>

          {location.pathname.includes("/app") && (
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                ></Typography>
              </Grid>
              <Grid item xs={8}>
                {meeting.isApproved ? (
                  <Typography>{meeting.status}</Typography>
                ) : (
                  <Button
                    startIcon={
                      isApproving ? (
                        <CircularProgress size="0.9rem" />
                      ) : undefined
                    }
                    disabled={isApproving}
                    variant="contained"
                    onClick={() => {
                      setIsApproving(true);
                      approveMeeting(meeting.id).then(() =>
                        approveStatus(meeting.id).then(() => {
                          setIsApproving(false);
                          setOpenPopperMeetingDetails(false);
                          setSnackBarMessage("Meeting has been approved");
                          setSnackBarOpen(true);
                        })
                      );
                    }}
                  >
                    Approve
                  </Button>
                )}
              </Grid>

              <Grid item xs={4}>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setOpenDeleteDialog(true);
                    setMeetingToDelete(meeting);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setOpenFormDrawer(true);
                    setSelectedMeeting(meeting);
                    setOpenPopperMeetingDetails(false);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
