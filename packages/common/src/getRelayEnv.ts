import { Environment, Network, RecordSource, Store, Variables } from 'relay-runtime';
import loginHelpers from './pages/Login/loginHelpers';

async function fetchQuery(operation: any, variables: Variables): Promise<Response> {
    const authToken = await loginHelpers.getAuthToken();

    const requestObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: '',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    };
    if (authToken) {
        requestObj.headers.Authorization = `Bearer ${authToken}`;
    }
    return fetch('http://localhost:4000/', requestObj).then(
        (response): any => {
            return response.json();
        }
    );
}

function getEnvironment(): Environment {
    return new Environment({
        network: Network.create(fetchQuery),
        store: new Store(new RecordSource()),
    });
}

export default getEnvironment;
