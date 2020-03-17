import React, {  } from "react";
import { Route, Redirect } from 'react-router-dom';
import { store } from "../redux/store.js";

function ContextRoute({ component: Component, ...rest }) {
    return (
        <Route
        {...rest}
        render={(props) => store.getState().workout.currentWid != null
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />}
        />
    );
}

export default ContextRoute;