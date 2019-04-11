import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteComponentProps } from 'react-router';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        padding: 10,
    },
});
interface HomeProps extends RouteComponentProps {}

const Home: React.FC<HomeProps> = () => {
    return <View style={styles.container}>Home</View>;
};

export default Home;
