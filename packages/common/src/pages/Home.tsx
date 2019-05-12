import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        padding: 10,
    },
});

function Home(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
}

export default Home;
