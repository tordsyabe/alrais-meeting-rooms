import { Box, Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import Meeting from "../meetings/Meeting";
import MeetingsSkeleton from "../skeletons/MeetingsSkeleton";
import Timer from "../utils/Timer";

export default function MeetingProgress() {
  const { meetings, loading, selectedMeeting } = useContext(MeetingsContext);
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

  return (
    <div>
      <Grid container>
        <Grid item xs={7}>
          <div
            style={{
              background:
                "url('https://www.avepoint.com/blog/wp-content/uploads/2018/10/iStock-887882750.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100vh",
            }}
          >
            <div style={{ background: "rgb(0, 154, 83, 0.9)", height: "100%" }}>
              <Box p={6} height="100%">
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  style={{ height: "100%" }}
                >
                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "white" }}
                      align="center"
                      variant="body1"
                    >
                      {`${new Date().toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} ${time}`}
                    </Typography>
                    <br></br>
                    <Grid item xs={12}>
                      <Typography
                        style={{ color: "white" }}
                        variant="h4"
                        align="center"
                      >
                        {selectedMeeting.title}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "white" }}
                      variant="h1"
                      align="center"
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
                <Typography color="textSecondary">
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
                          meeting={meeting}
                          isActive={isActive}
                          selectedCardMeeting={selectedCardMeeting}
                          setSelectedCardMeeting={setSelectedCardMeeting}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="h5">No Meetings</Typography>
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
