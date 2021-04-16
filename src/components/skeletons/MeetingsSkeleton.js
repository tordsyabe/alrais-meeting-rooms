import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

export default function MeetingsSkeleton() {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Skeleton variant='rect' height={60} animation='wave' />
        </Grid>

        <Grid item xs={4}>
          <Skeleton variant='rect' height={60} animation='wave' />
        </Grid>

        <Grid item xs={4}>
          <Skeleton variant='rect' height={60} animation='wave' />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
