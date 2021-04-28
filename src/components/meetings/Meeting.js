import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useLocation } from "react-router-dom";
import { constants } from "../../utils/constants";

import { MeetingsContext } from "../../contexts/MeetingsContext";
import { verifyMeeting, approveMeeting } from "../../services/MeetingService";

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
  setOpenDeleteDialog,
  setMeetingToDelete,
  setOpenForm,
}) {
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
        <CardActionArea>
          <CardContent
            onClick={() => {
              setSelectedMeeting(meeting);
              setSelectedCardMeeting(meeting.id);
              handleOpenForm();
              console.log(meeting);
            }}
          >
            <Grid container alignItems='center' justify='center'>
              <Grid item xs={12}>
                <Grid container alignItems='center'>
                  <Grid item xs={11}>
                    <Typography variant='h6'>{meeting.title}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <MoreVertIcon />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='caption'>
                      {new Date().toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
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
                            {new Date(meeting.startTime).toLocaleString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {new Date(meeting.endTime).toLocaleString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Grid>
                        </Grid>
                      </Typography>
                    </Grid>
                  }
                </Grid>
              </Grid>
            </Grid>

            <Grid container alignItems='center' spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant='caption'
                  color='textSecondary'
                ></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{meeting.status}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        {/* {location.pathname.includes("/app") && (
          <CardActions>
            <Button
              onClick={() => {
                setMeetingToDelete(meeting);
                setOpenDeleteDialog(true);
              }}
            >
              DELETE
            </Button>
            {location.pathname === UNVERIFIED_LINK && (
              <Button onClick={() => verifyMeeting(meeting.id)}>VERIFY</Button>
            )}
            {location.pathname === APPROVAL_LINK && (
              <Button onClick={() => approveMeeting(meeting.id)}>
                APPROVE
              </Button>
            )}
          </CardActions>
        )} */}
      </Card>
    </React.Fragment>
  );
}
