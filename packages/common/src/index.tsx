import React from 'react';
import { StyleSheet, View } from 'react-native';
import RootQueryRenderer from './RootQueryRenderer';
import { colors } from './styles/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    wrapper: {
        backgroundColor: colors.alabaster,
        width: '100%',
        flex: 1,
    },
});

function App(): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <RootQueryRenderer />
            </View>
        </View>
    );
}

export default App;
