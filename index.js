import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './Containers/Login/index.js'
import SignIn from './Containers/SignIn/index.js'
import Admin from './Containers/Admin/index.js'
import 'bootstrap/dist/css/bootstrap.css';



ReactDOM.render(
                <App/>
                ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
