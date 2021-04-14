import React, {useContext} from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

export default function Private({ component: Component, ...rest }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
