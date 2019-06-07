import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import getEnvironment from '../getRelayEnv';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
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
                        <Text>User ID: {props.viewer.id}</Text>
                    </View>
                );
            }}
        />
    );
}

export default Home;
