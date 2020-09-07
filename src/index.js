/*eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import 'url-search-params-polyfill';
import Router from './router';
import "whatwg-fetch"; // 解决兼容性
import * as serviceWorker from './serviceWorker';
import "./assets/css/common/public.css"

ReactDOM.render(
    <Router />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
