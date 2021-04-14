import React from 'react'
import { Redirect, Route } from 'react-router';

export default function Public({component: Component, restricted, ...rest }) {
const currentUser = true;

    return (
      <Route
      {...rest}
      render={(props) => {
        return currentUser && restricted ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        );
      }}
    ></Route>
    )
}
