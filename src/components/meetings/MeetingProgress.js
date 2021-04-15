import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import React from "react";
import Meeting from "../meetings/Meeting";

export default function MeetingProgress() {
  return (
    <div>
      {/* <AppBar position='static' style={{ background: "black" }}>
        <Toolbar>
          <Typography variant='h6' color='default'>
            Meeting Room 1
          </Typography>
        </Toolbar>
      </AppBar> */}
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
              <Box p={6}>
                <Grid
                  container
                  spacing={7}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <Typography style={{ color: "white" }} align="center">
                      19:31 Wednesday, April 12th
                    </Typography>
                    <Typography
                      style={{ color: "white" }}
                      variant="h2"
                      align="center"
                    >
                      ON GOING
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "white" }}
                      variant="h1"
                      align="center"
                    >
                      60:00
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      style={{ color: "white" }}
                      variant="body1"
                      align="center"
                    >
                      Accounts meeting with IT
                    </Typography>
                    <Typography
                      style={{ color: "white" }}
                      variant="subtitle"
                      align="center"
                    >
                      Organizer: Donato
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
              <Grid item xs={12}>
                <Meeting />
              </Grid>
              <Grid item xs={12}>
                <Meeting />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
