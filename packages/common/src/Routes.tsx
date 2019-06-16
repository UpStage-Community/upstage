import React from 'react';
import { View } from 'react-native';
import { createFragmentContainer, graphql, RelayProp } from 'react-relay';
import Home, { homePath } from './pages/Home';
import LoginFlow, { loginFlowPath } from './pages/Login/LoginFlow';
import { Router, Switch, Route } from './router/index';
import Header from './Header';
import { Routes_currentUser } from './__generated__/Routes_currentUser.graphql';

interface RoutesProps {
    currentUser: Routes_currentUser;
    relay: RelayProp;
}

function Routes(props: RoutesProps): JSX.Element {
    const { relay } = props;
    return (
        <Router>
            <View>
                <Header currentUser={props.currentUser} />
                <Switch>
                    <Route exact path={homePath} component={Home} />
                    <Route
                        exact
                        path={loginFlowPath}
                        render={(routeProps): JSX.Element => (
                            <LoginFlow {...routeProps} environment={relay.environment} />
                        )}
                    />
                </Switch>
            </View>
        </Router>
    );
}

export default createFragmentContainer(Routes, {
    currentUser: graphql`
        fragment Routes_currentUser on User {
            ...Header_currentUser
        }
    `,
});
