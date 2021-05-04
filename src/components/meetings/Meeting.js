import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useLocation } from "react-router-dom";
import { constants } from "../../utils/constants";

import { MeetingsContext } from "../../contexts/MeetingsContext";
import { dateToLocalTime, dateToLongDate } from "../../utils/dateFormatter";
import { MeetingCardContext } from "../../contexts/MeetingCardContext";
import { approveMeeting, approveStatus } from "../../services/MeetingService";

const useStyles = makeStyles((theme) => ({
  card: {},

  notSelectedCard: {
    pointerEvents: "none",
    cursor: "default",
  },
}));

export default function Meeting({
  meeting,
  isActive,
  onDashboard,
  selectedCardMeeting,
  setSelectedCardMeeting,
  setOpenForm,
}) {
  const {
    setOpenFormDrawer,
    setOpenDeleteDialog,
    setMeetingToDelete,
    setOpenPopperMeetingDetails,
    setSnackBarMessage,
    setSnackBarOpen,
  } = useContext(MeetingCardContext);
  const { setSelectedMeeting, selectedMeeting } = useContext(MeetingsContext);
  const location = useLocation();
  const { UNVERIFIED_LINK, APPROVAL_LINK } = constants;

  const handleOpenForm = () => {
    location.pathname.includes("/app") ? setOpenForm(true) : console.log();
  };

  const classes = useStyles();
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
        <CardContent>
          <Grid container alignItems='center' justify='center'>
            <Grid item xs={12}>
              <Grid container alignItems='center'>
                <Grid item xs={12}>
                  <Typography variant='h6'>{meeting.title}</Typography>
                </Grid>
                {/* <Grid item xs={1}>
                    <MoreVertIcon />
                  </Grid> */}
                <Grid item xs={12}>
                  <Typography variant='caption'>
                    {dateToLongDate(meeting.startTime)}
                  </Typography>
                </Grid>

                {
                  <Grid item xs={12}>
                    <Typography color='textSecondary' variant='caption'>
                      <Grid container alignItems='center' spacing={1}>
                        <Grid item>
                          <AccessTimeIcon fontSize='small' />
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
          </Grid>

          {location.pathname.includes("/app") && (
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant='caption'
                  color='textSecondary'
                ></Typography>
              </Grid>
              <Grid item xs={8}>
                {meeting.isApproved ? (
                  <Typography>{meeting.status}</Typography>
                ) : (
                  <Button
                    variant='contained'
                    onClick={() =>
                      approveMeeting(meeting.id).then(() =>
                        approveStatus(meeting.id).then(() => {
                          setOpenPopperMeetingDetails(false);
                          setSnackBarMessage("Meeting has been approved");
                          setSnackBarOpen(true);
                        })
                      )
                    }
                  >
                    Approve
                  </Button>
                )}
              </Grid>

              <Grid item xs={4}>
                <IconButton
                  onClick={() => {
                    setOpenDeleteDialog(true);
                    setMeetingToDelete(meeting);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setOpenFormDrawer(true);
                    setSelectedMeeting(meeting);
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
