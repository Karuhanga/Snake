import {createStore} from "redux";

const css = require('./styles/custom.css');

import App from './components/app';
import snakeReducer from './state/reducers'
import {Provider} from "react-redux";
import {render} from 'react-dom';
import React from "react";

const store = createStore(snakeReducer);

render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('app')
);