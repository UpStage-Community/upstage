import * as React from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../styles/colors';

interface FloatingLabelInputProps {
    label: string;
    onChangeText: (text: string) => void;
    value: string;
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.charcoal,
        fontSize: 16,
        height: 50,
        color: colors.noir,
        outlineColor: colors.blanc,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 12,
    },
    label: {
        position: 'absolute',
        zIndex: -1,
        left: 18,
        fontSize: 16,
        color: colors.iron,
    },
    inputFocused: {
        borderBottomColor: colors.brandPrimary,
    },
});

function FloatingLabelInput(props: FloatingLabelInputProps): JSX.Element {
    const { label, onChangeText, value } = props;
    const [isFocused, setIsFocused] = React.useState(false);

    const labelTopMin = 0;
    const labelTopMax = 18;
    const labelFontSizeMin = 12;
    const labelFontSizeMax = 16;
    const duration = 250;

    const labelTop = React.useRef(new Animated.Value(value ? labelTopMin : labelTopMax)).current;
    const labelFontSize = React.useRef(
        new Animated.Value(value ? labelFontSizeMin : labelFontSizeMax)
    ).current;

    function animateUp(): void {
        if (!value) {
            Animated.parallel([
                Animated.timing(labelTop, { toValue: labelTopMin, duration }),
                Animated.timing(labelFontSize, { toValue: labelFontSizeMin, duration }),
            ]).start();
        }
    }
    function animateDown(): void {
        if (!value) {
            Animated.parallel([
                Animated.timing(labelTop, { toValue: labelTopMax, duration }),
                Animated.timing(labelFontSize, { toValue: labelFontSizeMax, duration }),
            ]).start();
        }
    }
    function onFocus(): void {
        setIsFocused(true);
        animateUp();
    }
    function onBlur(): void {
        setIsFocused(false);
        animateDown();
    }

    return (
        <View>
            <Animated.Text
                style={[
                    styles.label,
                    {
                        top: labelTop,
                        fontSize: labelFontSize,
                    },
                ]}
            >
                {label}
            </Animated.Text>
            <TextInput
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChangeText}
                value={value}
                style={[styles.input, isFocused && styles.inputFocused]}
            />
        </View>
    );
}
export default FloatingLabelInput;
