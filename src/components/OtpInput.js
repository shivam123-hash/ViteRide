import React, { useMemo, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from '../common/ThemeContest';
import { RFValue } from "react-native-responsive-fontsize";

const OtpInput = ({ length = 6, value, onChange }) => {
    const inputs = useRef([]);

    const { fonts, metrics , colors} = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics, colors), [fonts, metrics, colors]);
    const handleChange = (text, index) => {
        let newOtp = value.split("");
        newOtp[index] = text;
        const finalOtp = newOtp.join("");
        onChange(finalOtp);

        if (text && index < length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleBackspace = (index) => {
        if (index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array.from({ length }).map((_, i) => (
                <TextInput
                    key={i}
                    ref={(ref) => (inputs.current[i] = ref)}
                    style={styles.input}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={value[i] || ""}
                    onChangeText={(text) => handleChange(text, i)}
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === "Backspace") {
                            handleBackspace(i);
                        }
                    }}
                />
            ))}
        </View>
    );
};

export default OtpInput;

const createStyles = (fonts, metrics, colors) => StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginVertical: metrics.margin.veryHigh,
    },
    input: {
        width: 40,
        height: 55,
        borderRadius: metrics.borderRadius.medium,
        backgroundColor: "#fff",
        textAlign: "center",
        fontSize: RFValue(18),
        fontFamily: fonts.bold,
        elevation: 2,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
        shadowRadius: 8,
    },
});