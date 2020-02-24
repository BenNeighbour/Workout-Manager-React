
const initalstate = {
    posting: false,
    posted: false,
    exercises: [],
    error: null
}

export default function reducer(state = initalstate, action) { 
    switch (action.type) { 
        case "EXERCISE_PENDING": { 
            return { ...state, posting: true };
        }
        case "EXERCISE_REJECTED": { 
            return { ...state, posting: false, error: action.payload.status };
        }
        case "EXERCISE_FULFILLED": { 
            return {
                ...state, posting: false, posted: true,
                exercises: [
                    action.payload.data
                ]
            };
        }
        default: { 
            break;
        }
    }
    return state;
}