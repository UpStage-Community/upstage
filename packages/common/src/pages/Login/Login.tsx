import * as React from 'react';
import { Text, View } from 'react-native';
import { Environment } from 'relay-runtime';
import Button from '../../elements/Button';
import Input from '../../elements/Input';
import { loginMutationResponse } from './__generated__/loginMutation.graphql';
import loginHelpers from './loginHelpers';
import loginMutation from './loginMutation';

interface LoginProps {
    environment: Environment;
    goToRegister: () => void;
    goToForgotPassword: () => void;
    setLoginComplete: (complete: boolean) => void;
}

function Login(props: LoginProps): JSX.Element {
    const { environment, goToForgotPassword, goToRegister, setLoginComplete } = props;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    async function onSubmit(): Promise<void> {
        setIsLoading(true);
        loginMutation(environment, { email, password })
            .then(
                async (result: loginMutationResponse): Promise<void> => {
                    setErrorMessage('');
                    if (result && result.login && result.login.token) {
                        await loginHelpers.login(result.login.token);
                        setLoginComplete(true);
                    }
                }
            )
            .catch(
                (errors: Error[]): void => {
                    if (Array.isArray(errors)) {
                        setErrorMessage(errors.map((err): string => err.message).join(', '));
                    } else {
                        setErrorMessage('Something went wrong');
                    }
                    setIsLoading(false);
                }
            );
    }
    return (
        <View>
            <Text>Log into your account</Text>
            <Text>Email</Text>
            <Input onChangeText={setEmail} value={email} />
            <Text>Password</Text>
            <Input onChangeText={setPassword} value={password} />
            <Button title="Submit" onPress={onSubmit} />
            {isLoading && <Text>SPINNER</Text>}
            {!!errorMessage && <Text>{errorMessage}</Text>}
            <Text onPress={goToRegister}>Register</Text>
            <Text onPress={goToForgotPassword}>Forgot Password</Text>
        </View>
    );
}

export default Login;
