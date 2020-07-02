import * as React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import ContactList from './components/ContactList';
import Auth from './components/Auth';


const container = document.querySelector('#app');
const app = (
    <Router>
        <Switch>
            <Route exact path="/">
                <Auth></Auth>
            </Route>

            <Route path="/contacts">
                <ContactList />
            </Route>
        </Switch>
    </Router>
);

render(app, container);
