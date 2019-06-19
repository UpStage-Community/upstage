import { Location } from 'history';
import * as React from 'react';
import { Text, View } from 'react-native';
import { Environment } from 'relay-runtime';
import { Link, Redirect } from '../../router';
import { homePath } from '../Home';
import Login from './Login';

const Register = React.lazy(
    (): Promise<any> => import(/* webpackChunkName: "Register" */ './Register')
);
const ForgotPassword = React.lazy(
    (): Promise<any> => import(/* webpackChunkName: "ForgotPassword" */ './ForgotPassword')
);

interface LoginFlowProps {
    location: Location;
    environment: Environment;
}

function LoginFlow(props: LoginFlowProps): JSX.Element | null {
    const { location, environment } = props;

    const [loginComplete, setLoginComplete] = React.useState(false);
    const [stack, setStack] = React.useState(['login']);

    const currentLoginScreen = stack[stack.length - 1];

    if (loginComplete) {
        // need refresh for login
        window.location = location.state.postLoginPath || homePath;
        return null;
    }
    if (location.state && location.state.loginModal) {
        return (
            <View>
                <Link
                    to={{
                        pathname: location.state.postLoginPath || homePath,
                        state: { loginModal: false },
                    }}
                >
                    X
                </Link>
                {stack.length > 1 && (
                    <Text onPress={(): void => setStack(stack.slice(0, stack.length - 1))}>
                        Back
                    </Text>
                )}
                {currentLoginScreen === 'login' && (
                    <Login
                        environment={environment}
                        setLoginComplete={setLoginComplete}
                        goToForgotPassword={(): void => setStack([...stack, 'forgotPassword'])}
                        goToRegister={(): void => setStack([...stack, 'register'])}
                    />
                )}
                <React.Suspense
                    fallback={
                        <View>
                            <Text>Loading...</Text>
                        </View>
                    }
                >
                    {currentLoginScreen === 'forgotPassword' && <ForgotPassword />}
                    {currentLoginScreen === 'register' && <Register />}
                </React.Suspense>
            </View>
        );
    }
    return (
        <Redirect
            to={{
                pathname: homePath,
                state: { loginModal: false },
            }}
        />
    );
}

export const loginFlowPath = '/login';

export default LoginFlow;
