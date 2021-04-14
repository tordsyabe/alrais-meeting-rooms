import React from "react";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Room({ room }) {
  return (
    <Card style={{ marginBottom: 10 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant='h5'>{room.name}</Typography>
            <Box py={1}>
              <Chip
                label={`Room capacity: ${room.capacity}`}
                color='default'
                size='small'
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <IconButton>
              <EditIcon color='disabled' />
            </IconButton>
            <IconButton>
              <DeleteIcon color='disabled' />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
