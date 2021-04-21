import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import MeetingForm from "../forms/MeetingForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  bg: {
    background: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url("https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80") no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "right center",
  },
}));

export default function FillUpPage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={5}>
        <Box p={5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='h4'>
                Fill up the form to book your meeting
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ flexGrow: 1 }}>
              <Card>
                <CardContent>
                  <Typography component='h5' variant='h5'>
                    Provide meeting information
                  </Typography>
                  <br></br>
                  <MeetingForm />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} alignSelf='flex-end'>
              <Typography variant='body2' color='textSecondary' align='center'>
                {"Alrais Meeting Room Booking System Copyright © "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={7} className={classes.bg}></Grid>
    </Grid>
  );
}
