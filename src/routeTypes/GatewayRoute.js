import React, {  } from "react";
import { Route, Redirect } from 'react-router-dom';
import { store } from "../redux/store.js";

function GatewayRoute({ component: Component, ...rest }) {
    return (
        <Route
        {...rest}
        render={(props) => store.getState().user.isAuthenticated === false || store.getState().user.refreshToken === null || store.getState().user.user === null
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />}
        />
    );
}

export default GatewayRoute;