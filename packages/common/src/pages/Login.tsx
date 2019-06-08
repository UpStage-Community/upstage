import { Location } from 'history';
import * as React from 'react';
import { Text, View } from 'react-native';
import { Router, Route, Link, Switch } from '../router';
import Button from '../elements/Button';
import Input from '../elements/Input';

interface LoginProps {
    location: Location;
}

function Login(): JSX.Element {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View>
            <Text>Log into your account</Text>
            <Text>Email</Text>
            <Input onChangeText={setEmail} value={email} />
            <Text>Password</Text>
            <Input onChangeText={setPassword} value={password} />
            <Button title="Submit" onPress={(): void => console.log('onPress')} />
            <Link
                to={{
                    pathname: '/register',
                }}
            >
                Register
            </Link>
            <Link
                to={{
                    pathname: '/forgot',
                }}
            >
                Forgot Password
            </Link>
        </View>
    );
}

function Register(): JSX.Element {
    return (
        <View>
            <Text>Register</Text>
        </View>
    );
}
function Forgot(): JSX.Element {
    return (
        <View>
            <Text>Forgot</Text>
        </View>
    );
}

function LoginFlow(props: LoginProps): JSX.Element | null {
    const { location } = props;

    if (location.state && location.state.loginModal) {
        return (
            <View>
                <Link
                    to={{
                        pathname: location.state.postLoginPath || '/',
                        state: { loginModal: false },
                    }}
                >
                    X
                </Link>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/forgot" component={Forgot} />
                    </Switch>
                </Router>
            </View>
        );
    }
    return null;
}

export default LoginFlow;
