import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import firebase from "../firebase";
import { logout } from "../services/AuthService";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const history = useHistory();

  const handleLogout = () => {
    logout()
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoading(false);
      }

      if (user === null) {
        setCurrentUser(null);
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const values = {
    currentUser,
    isLoading,
    handleLogout,
  };
  return (
    <AuthContext.Provider value={values}>
      {isLoading ? (
        <Grid
          container
          style={{ height: "100vh" }}
          justify='center'
          alignItems='center'
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}