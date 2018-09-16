import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import configStore from './configStore';

const store = configStore();
=======
// import { createStore } from 'redux';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';
>>>>>>> afb17d10b0b333ab53534465bc5b9e542628bb12

ReactDOM.render(
    // <Provider store={store}>
        <App />,
    // </Provider>,
    document.getElementById('root')
);
// disable ServiceWorker
// registerServiceWorker();
