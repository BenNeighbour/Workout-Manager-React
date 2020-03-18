import React, {  } from "react";
import { Route, Redirect } from 'react-router-dom';
import { store } from "../redux/store.js";

function ContextRoute({ component: Component, theme, variant, ...rest }) {
    return (
        <Route
        {...rest}
        render={(props) => store.getState().workout.currentWid != null
            ? <Component {...props} theme={theme} variant={variant} />
            : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />}
        />
    );
}

export default ContextRoute;