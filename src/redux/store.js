import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';
import promise from "redux-promise-middleware";
import reducer from "./reducers/combinedReducers.js";

const persistConfig = {
    key: 'User',
    storage: storage,
    whitelist: ['user', 'workout', 'themeReducer'] 
};
const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = applyMiddleware(promise, thunk, logger);
const store = createStore(persistedReducer, middleware);

const persistor = persistStore(store);

export { 
    store,
    persistor
};