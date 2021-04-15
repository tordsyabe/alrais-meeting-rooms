import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DoneIcon from "@material-ui/icons/Done";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

export default function Booking({booking}) {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1">
              Meeting Name
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              10:00 - 11:00
            </Typography>
          </Grid>
        </Grid>

        <CardActions>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={2}>
              <IconButton>
                <PlayArrowIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <IconButton>
                <CancelPresentationIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <Chip
                avatar={<Avatar>{<DoneIcon />}</Avatar>}
                label="On Going"
              />
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
}
