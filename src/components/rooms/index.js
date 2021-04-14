import { Box, Fab, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Room from "./Room";

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Rooms() {
  const rooms = [
    { id: 1, name: "Meeting Room 1", capacity: 12 },
    { id: 2, name: "Mr. Ali's Room", capacity: 6 },
    { id: 3, name: "Ms. Rania's Room", capacity: 6 },
  ];

  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant='h4'>Meeting Rooms</Typography>
      <Box py={3}>
        {rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </Box>
      <Fab color='primary' aria-label='add' className={classes.fab}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
