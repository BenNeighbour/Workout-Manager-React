import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import Loading from "./components/loading/loading.js";
import { Provider } from 'react-redux';
import { store, persistor } from "./redux/store.js";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(

    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </PersistGate>
    </Provider>,

    document.getElementById('root')
);
    
serviceWorker.unregister();
