import { Box, Fab, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Room from "./Room";

import AddIcon from "@material-ui/icons/Add";
import { RoomsContext } from "../../contexts/RoomsContext";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Rooms() {
  const { rooms, loading } = useContext(RoomsContext);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6">Meeting Rooms</Typography>
      <Box py={3}>
        {loading ? (
          <Skeleton animation="wave" variant="rect" height={50} width="70%" />
        ) : (
          <Grid container spacing={2}>
            {rooms.map((room) => (
              <Grid item xs={8} key={room.id}>
                <Room room={room} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
