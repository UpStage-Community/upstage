import React from 'react';
import Home from './pages/Home';
import { Router, Switch, Route } from './router/index';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
};
