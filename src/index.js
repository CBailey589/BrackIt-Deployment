import React from 'react';
import ReactDOM from 'react-dom';
import './BrackIt.css';
import BrackIt from './BrackIt';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import Auth from "./Auth/Auth"

const auth = new Auth();

let state = {}

//
window.setState = (changes) => {
    state = Object.assign({}, state, changes)

    ReactDOM.render(
        <BrowserRouter>
            <BrackIt {...state} />
        </BrowserRouter>

        , document.getElementById('root'));
}

// gets username if user is logged in for display in welcome message, or uses "BrackIteer" if not logged in
let username = auth.getProfile().given_name || "BrackIteer"
// gets unique ID from auth0 token payload sub if user is logged in
let userId = 1;
if (auth.getProfile().sub !== undefined) {
    userId = auth.getProfile().sub.split("|")[1]
}

// sets initial state with users "first name" in auth0, unique user id,
let initialState = {
    name: username,
    userId: userId,
    location: window.location.pathname.replace(/^\/?|\/$/g, ""),
    auth
}
window.setState(initialState)

serviceWorker.unregister();
