import React, {  } from "react";
import { Route, Redirect } from 'react-router-dom';
import { store } from "../redux/store.js";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => store.getState().user.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
}

export default PrivateRoute;