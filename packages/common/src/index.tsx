import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Routes } from './Routes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    wrapper: {
        backgroundColor: '#fafafa',
        width: '100%',
        maxWidth: 425,
        flex: 1,
    },
});

function App(): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Routes />
            </View>
        </View>
    );
}

export default App;
