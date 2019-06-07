import { Environment, Network, RecordSource, Store, Variables } from 'relay-runtime';

function fetchQuery(operation: any, variables: Variables): Promise<Response> {
    return fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(
        (response): any => {
            console.log('response: ', response);
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
