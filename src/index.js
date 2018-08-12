import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    // <Provider store={store}>
        <App />,
    // </Provider>,
    document.getElementById('root')
);
// disable ServiceWorker
// registerServiceWorker();
