import React from "react";
import {
  Card,
  Container,
  Grid,
  CardContent,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Box,
  Snackbar,
  makeStyles,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

import { useHistory } from "react-router-dom";

import AcUnitIcon from "@material-ui/icons/AcUnit";
import CloseIcon from "@material-ui/icons/Close";
import { signInValidation } from "../../utils/validationSchema";
import { login } from "../../services/AuthService";

const useStyles = makeStyles((theme) => ({
  margin: {
    textAlign: "center",
  },
}));

export default function Singin() {
  const [error, setError] = React.useState(null);
  const [snackBarError, setSnackBarError] = React.useState(false);
  const history = useHistory();
  const classes = useStyles();

  function closeSnackBarError() {
    setSnackBarError(false);
  }

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Container component='main' maxWidth='xs'>
          <Card className={classes.margin}>
            <CardContent>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={signInValidation}
                onSubmit={(data, { setSubmitting }) => {
                  setSubmitting(true);
                  setError(null);
                  login(data.email, data.password)
                    .then(() => {
                      setSubmitting(false);
                      history.push("/app/bookings");
                      console.log("PUSH TO /app/bookings");
                    })
                    .catch((error) => {
                      console.log(error);
                      setError("Invalid username and password");
                      setSnackBarError(true);
                      setSubmitting(false);
                    });
                }}
              >
                {({ values, errors, isSubmitting, isValid, dirty }) => (
                  <Form autoComplete='off'>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <AcUnitIcon fontSize='large' />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component='h1' variant='h5'>
                          Log in
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          required
                          name='email'
                          component={TextField}
                          label='Email Address'
                          variant='outlined'
                        ></Field>
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          required
                          name='password'
                          component={TextField}
                          label='Password'
                          variant='outlined'
                          type='password'
                        ></Field>
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          disabled={isSubmitting || !isValid || !dirty}
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='primary'
                          startIcon={
                            isSubmitting ? (
                              <CircularProgress size='0.9rem' />
                            ) : undefined
                          }
                        >
                          {isSubmitting ? "Logging in" : "Log in"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
          <Box mt={8}>
            <Typography variant='body2' color='textSecondary' align='center'>
              {"Alrais Meeting Room Booking System Copyright © "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={snackBarError}
            autoHideDuration={6000}
            onClose={closeSnackBarError}
            message={error}
            action={
              <React.Fragment>
                <IconButton
                  size='small'
                  aria-label='close'
                  color='inherit'
                  onClick={closeSnackBarError}
                >
                  <CloseIcon fontSize='small' />
                </IconButton>
              </React.Fragment>
            }
          />
        </Container>
      </Grid>
    </Grid>
  );
}
