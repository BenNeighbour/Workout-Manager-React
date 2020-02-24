
const initalstate = {
    submitted: false,
    granted: false,
    user: null,
    uid: null,
    email: null,
    serverError: false,
    error: 200,
    isAuthenticated: false,  
    refreshToken: null,
    accessToken: null,
    signedUp: false,
}

export default function reducer(state = initalstate, action) { 
    switch (action.type) { 
        case "USER_GRANT_PENDING": { 
            return { ...state, submitted: true };
        }
        case "USER_GRANT_REJECTED": { 
            return {
                ...state, submitted: false, error: action.payload.response.data.error_description,
                isAuthenticated: false, serverError: true
            };
        }
        case "USER_GRANT_FULFILLED": { 
            return {
                ...state, submitted: true, granted: true, isAuthenticated: true,
                refreshToken: action.payload.data.refresh_token, 
                accessToken: action.payload.data.access_token, error: 200
            };
        }
        
        case "USER_UID_PENDING": {
            return {
                ...state
            };
        }
        case "USER_UID_REJECTED": {
            return {
                ...state, error: action.payload.status, isAuthenticated: false
            };
        }
        case "USER_UID_FULFILLED": {
            return {
                ...state, uid: action.payload.data.uid, email: action.payload.data.email
            };
        }  
        case "ADD_USERNAME": { 
            return {...state, user: action.payload}
        }
            
        case "USER_TOKEN_REFRESH_PENDING": { 
            return { ...state, submitted: true };
        }
        case "USER_TOKEN_REFRESH_REJECTED": { 
            return {
                ...state, refreshToken: null, accessToken: null, isAuthenticated: false,
                error: action.payload.response.data.error_description
            };
        }
        case "USER_TOKEN_REFRESH_FULFILLED": { 
            return {
                ...state, refreshToken: action.payload.data.refresh_token, 
                accessToken: action.payload.data.access_token, error: 200
            };
        }
            
        case "USER_SIGNUP_PENDING": { 
            return { ...state };
        }
        case "USER_SIGNUP_REJECTED": { 
            return { ...state, error: action.payload.data, submitted: true };
        }
        case "USER_SIGNUP_FULFILLED": { 
            return { ...state, error: false, success: true, submitted: true, isAuthenticated: true, signedUp: true };
        }
            
        case "UNMOUNT_EMAIL_MESSAGE": { 
            return { ...state, signedUp: false };
        }
            
        default: { 
            break;
        }
    }
    return state;
}