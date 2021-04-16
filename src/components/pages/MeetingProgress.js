import { Box, Grid, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { MeetingsContext } from "../../contexts/MeetingsContext";
import Meeting from "../meetings/Meeting";
import MeetingsSkeleton from "../skeletons/MeetingsSkeleton";
import Timer from "../utils/Timer";

export default function MeetingProgress() {
  const { meetings, loading, selectedMeeting } = useContext(MeetingsContext);

  return (
    <div>
      <Grid container style={{ height: "100vh" }}>
        <Grid item xs={7}>
          <div
            style={{
              background:
                "url('https://www.avepoint.com/blog/wp-content/uploads/2018/10/iStock-887882750.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
            }}
          >
            <div style={{ background: "rgb(0, 154, 83, 0.9)", height: "100%" }}>
              <Box p={6} height='100%'>
                <Grid
                  container
                  spacing={7}
                  alignItems='center'
                  justify='center'
                  style={{ height: "100%" }}
                >
                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "white" }}
                      align='center'
                      variant='h6'
                    >
                      "CLOCK"
                    </Typography>
                    <br></br>
                    <Typography
                      style={{ color: "white" }}
                      variant='h3'
                      align='center'
                    >
                      {selectedMeeting.status}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "white" }}
                      variant='h1'
                      align='center'
                    >
                      <Timer meeting={selectedMeeting} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "white" }}
                      variant='h5'
                      align='center'
                    >
                      {selectedMeeting.title}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </Grid>
        <Grid item xs={5}>
          <Box p={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Today</Typography>
              </Grid>
              {loading ? (
                <MeetingsSkeleton />
              ) : (
                <Grid container spacing={2}>
                  {meetings.length > 0 ? (
                    meetings.map((meeting) => (
                      <Grid item xs={12} key={meeting.id}>
                        <Meeting meeting={meeting} />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant='h5'>No Meetings</Typography>
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
