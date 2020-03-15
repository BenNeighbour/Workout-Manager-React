import React, {  } from "react";
import { Route, Redirect } from 'react-router-dom';
import { store } from "../redux/store.js";

function PrivateRoute({ component: Component, theme, variant, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => store.getState().user.isAuthenticated === true
        ? <Component {...props} theme={theme} variant={variant} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
}

export default PrivateRoute;