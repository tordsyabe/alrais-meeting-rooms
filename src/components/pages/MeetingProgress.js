import { Box, Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import { todayToLongDate } from "../../utils/dateFormatter";
import Meeting from "../meetings/Meeting";
import MeetingsSkeleton from "../skeletons/MeetingsSkeleton";
import Timer from "../utils/Timer";

export default function MeetingProgress() {
  const { meetings, loading, selectedMeeting, setSelectedMeeting } = useContext(
    MeetingsContext
  );
  const [isActive, setIsActive] = useState(false);

  const [selectedCardMeeting, setSelectedCardMeeting] = useState("");

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => {
    setSelectedMeeting({ title: "FREE" });
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={7}>
          <div
            style={{
              background: `linear-gradient(to left, rgba(245, 246, 252, 0.8), rgba(117, 19, 93, 0.9)), url("https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100vh",
              backgroundPosition: "80% center",
            }}
          >
            <div style={{ height: "100%" }}>
              <Box p={6} height='100%'>
                <Grid
                  container
                  alignItems='center'
                  justify='center'
                  style={{ height: "100%" }}
                >
                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "white" }}
                      align='center'
                      variant='body1'
                    >
                      {`${todayToLongDate()} ${time}`}
                    </Typography>
                    <br></br>
                    <Grid item xs={12}>
                      <Typography
                        style={{ color: "white" }}
                        variant='h4'
                        align='center'
                      >
                        {selectedMeeting.title}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "white" }}
                      variant='h1'
                      align='center'
                    >
                      <Timer
                        isActive={isActive}
                        setIsActive={setIsActive}
                        selectedCardMeeting={selectedCardMeeting}
                        setSelectedCardMeeting={setSelectedCardMeeting}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </Grid>
        <Grid item xs={5}>
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography color='textSecondary'>
                  Scheduled Meeting Today
                </Typography>
              </Grid>
              {loading ? (
                <MeetingsSkeleton />
              ) : (
                <Grid container spacing={2}>
                  {meetings.length > 0 ? (
                    meetings.map((meeting) => (
                      <Grid item xs={12} key={meeting.id}>
                        <Meeting
                          onDashboard={false}
                          meeting={meeting}
                          isActive={isActive}
                          selectedCardMeeting={selectedCardMeeting}
                          setSelectedCardMeeting={setSelectedCardMeeting}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography
                        variant='h5'
                        align='center'
                        color='textSecondary'
                      >
                        No Meetings
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
