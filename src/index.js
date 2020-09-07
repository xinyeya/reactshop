/*eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import "babel-polyfill";
import 'url-search-params-polyfill';
import "whatwg-fetch"; // 解决兼容性
import * as serviceWorker from './serviceWorker';
import "./assets/css/common/public.css";
import reducers from "./reducers";

let store = createStore(reducers);

class App extends React.Component{
    render() {
        return (
            <React.Fragment>
                <Provider store={store}>
                    <Router />
                </Provider>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
