
const initalstate = {
    submitted: false,
    granted: false,
    todoList: []
}

export default function reducer(state = initalstate, action) {
    switch (action.type) {
        case "GET_TODOS_PENDING": {
            return {
                ...state, submitted: true
            }
        }
        case "GET_TODOS_REJECTED": {
            return {
                ...state, submitted: true, granted: false
            }
        }
        case "GET_TODOS_FULFILLED": {
            return {
                ...state, submitted: true, granted: true, todoList: action.payload.data
            }
        }
            
        default: { 
            break;
        }
    }

    return state;
}