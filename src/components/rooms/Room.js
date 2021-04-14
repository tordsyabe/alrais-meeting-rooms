import React from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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
              <Box pt={2}>
                <Chip
                  label={`Room capacity: ${room.capacity}`}
                  color='default'
                  size='small'
                />
              </Box>
            </Grid>
            <Grid item xs={2}>
              <IconButton>
                <EditIcon fontSize='small' />
              </IconButton>
              <IconButton>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
