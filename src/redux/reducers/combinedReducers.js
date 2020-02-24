import { combineReducers } from "redux";
import exercise from "./exerciseReducer.js";
import workout from "./workoutReducer.js";
import user from "./userLoginReducer.js";
import { reducer as formReducer } from "redux-form";

const reducer = combineReducers({
    exercise, 
    user,
    workout,
    form: formReducer
});

const rootReducer = (state, action) => { 
    if (action.type === "USER_LOGOUT") { 
        state = undefined;
    }

    return reducer(state, action)
}

export default rootReducer;
