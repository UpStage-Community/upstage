import * as React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
interface InputProps {
    onChangeText: (text: string) => void;
    value: string;
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.noir,
        fontSize: 16,
        height: 30,
    },
});

function Input(props: InputProps): JSX.Element {
    const { onChangeText, value } = props;
    return <TextInput onChangeText={onChangeText} value={value} style={styles.input} />;
}
export default Input;
