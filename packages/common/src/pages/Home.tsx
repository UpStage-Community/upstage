import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from '../router';
import { QueryRenderer, graphql } from 'react-relay';
import getEnvironment from '../getRelayEnv';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

function Home(): JSX.Element {
    const environment = getEnvironment();

    return (
        <QueryRenderer
            environment={environment}
            query={graphql`
                query HomeQuery {
                    me {
                        id
                        firstName
                    }
                }
            `}
            variables={{}}
            render={({ error, props }: { error: Error; props: any }): JSX.Element => {
                if (error) {
                    return (
                        <View style={styles.container}>
                            <Text>Error! {error.message}</Text>
                        </View>
                    );
                }
                if (!props) {
                    return (
                        <View>
                            <Text>Loading...</Text>
                        </View>
                    );
                }
                return (
                    <View>
                        <Link
                            to={{
                                pathname: `/login`,
                                state: { loginModal: true, postLoginPath: '/' },
                            }}
                        >
                            Log In
                        </Link>
                        <Text>User ID: {props.me ? props.me.id : 'nope'}</Text>
                    </View>
                );
            }}
        />
    );
}

export default Home;
