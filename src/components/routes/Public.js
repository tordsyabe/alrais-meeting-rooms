import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

export default function Public({component: Component, restricted, ...rest }) {
  const { currentUser } = useContext(AuthContext);

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
