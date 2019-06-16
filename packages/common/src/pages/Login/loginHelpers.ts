import { AsyncStorage } from 'react-native';

async function login(authToken: string): Promise<void> {
    await AsyncStorage.setItem('userToken', authToken);
}

async function logout(): Promise<void> {
    await AsyncStorage.setItem('userToken', '');
}

async function getAuthToken(): Promise<string> {
    try {
        const userToken = await AsyncStorage.getItem('userToken');
        return userToken || '';
    } catch (error) {
        console.error(error);
        return '';
    }
}

export default {
    login,
    logout,
    getAuthToken,
};
