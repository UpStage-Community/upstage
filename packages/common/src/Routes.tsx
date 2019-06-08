import React from 'react';
import { View } from 'react-native';
import Home from './pages/Home';
import Login from './pages/Login';
import { Router, Switch, Route } from './router/index';

export function Routes(): JSX.Element {
    return (
        <Router>
            <View>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
                <Route exact path="/login" component={Login} />
            </View>
        </Router>
    );
}
