
const initalstate = {
    pending: false,
    fulfilled: false,
    allWorkouts: [],
    error: null,
    currentWid: null
}

export default function reducer(state = initalstate, action) { 
    switch (action.type) { 
        case "WORKOUT_PENDING": { 
            return { ...state, pending: true };
        }
        case "WORKOUT_REJECTED": { 
            return { ...state, pending: false, error: action.payload.status };
        }
        case "WORKOUT_FULFILLED": { 
            return {
                ...state, pending: false, fulfilled: true
            };
        }
        
        case "GET_WORKOUT_PENDING": { 
            return {
                ...state, pending: true
            }; 
        }
        case "GET_WORKOUT_REJECTED": { 
            return {
                ...state, pending: false, fulfilled: false, error: action.payload.status
            }; 
        }
        case "GET_WORKOUT_FULFILLED": { 
            return {
                ...state, pending: false, fulfilled: true, allWorkouts: action.payload.data.workouts
            }; 
        }
            
        case "APPEND_EXERCISE": { 
            return {
                ...state, allWorkouts: action.payload.data.workouts
            }; 
        }
            
        case "POST_CURRENT_WID": { 
            return { ...state, currentWid: action.payload }; 
        }
        default: { 
            break;
        }
    }
    return state;
}