import * as React from 'react';
import { Button as RNButton } from 'react-native';
import { colors } from '../styles/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
}

function Button(props: ButtonProps): JSX.Element {
    const { title, onPress } = props;
    return <RNButton onPress={onPress} title={title} color={colors.dolphin} />;
}
export default Button;
