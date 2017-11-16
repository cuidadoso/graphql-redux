/**
 * @author Alexander Pyreev
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from "redux-thunk";

import { queryReducer } from './app/reducers';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

class Main extends Component {
    render() {
        return (
            <div>
                <p>hello react!</p>
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(queryReducer)}>
        <Main />
    </Provider>,
    document.getElementById("example")
);
