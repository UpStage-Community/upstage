import { graphql, commitMutation } from 'react-relay';
import { Environment } from 'relay-runtime';
import { LoginInputType, loginMutationResponse } from './__generated__/loginMutation.graphql';

const mutation = graphql`
    mutation loginMutation($input: LoginInputType) {
        login(input: $input) {
            token
        }
    }
`;

const loginMutation = (
    environment: Environment,
    body: LoginInputType
): Promise<loginMutationResponse> => {
    return new Promise(
        (resolve, reject): void => {
            commitMutation(environment, {
                mutation,
                variables: {
                    input: body,
                },
                onCompleted: (payload: loginMutationResponse, errors: Error[]): void => {
                    /* istanbul ignore next */
                    if (errors) {
                        reject(errors);
                    }
                    resolve(payload);
                },
                onError: reject,
            });
        }
    );
};

export default loginMutation;
