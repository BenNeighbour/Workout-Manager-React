
const initalstate = {
    submitted: false,
    granted: false,
    error: 200,
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
            
        case "ADD_TODO_PENDING": {
            return {
                ...state, submitted: true
            }
        }
        case "ADD_TODO_REJECTED": {
            return {
                ...state, submitted: true, granted: false, error: action.payload.data.status
            }
        }
        case "ADD_TODO_FULFILLED": {
            return {
                ...state, submitted: true, granted: true
            }
        }
            
        default: { 
            break;
        }
    }

    return state;
}