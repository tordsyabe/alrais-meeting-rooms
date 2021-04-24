import React from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    "& .MuiGrid-grid-xs-2": {
      display: "none",
    },
    "& .MuiCardContent-root:hover .MuiGrid-grid-xs-2": {
      display: "block",
    },
  },
}));

export default function Room({ room }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => history.push(`/${room.id}`)}>
        <CardContent>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={10}>
              <Typography variant='h5'>{room.name}</Typography>
              <Typography variant='caption' color='textSecondary'>
                Room Capacity: {room.capacity}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
