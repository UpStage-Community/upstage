import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import Routes from './Routes';
import getEnvironment from './getRelayEnv';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

function RootQueryRenderer(): JSX.Element {
    const environment = getEnvironment();

    return (
        <QueryRenderer
            environment={environment}
            variables={{}}
            query={graphql`
                query RootQueryRendererQuery {
                    currentUser {
                        ...Routes_currentUser
                    }
                }
            `}
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
                return <Routes currentUser={props.currentUser} />;
            }}
        />
    );
}

export default RootQueryRenderer;
