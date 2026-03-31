import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const OTP_DIGITS = ['4', '8', '2', '7'];

const OtpCard = ({ styles, metrics }) => (
    <View style={styles.otpCard}>
        <View style={styles.otpLeft}>
            <View style={styles.otpIconBox}>
                <MaterialIcons
                    name="lock"
                    size={metrics.iconSize.medium}
                    color={CommonColors.white}
                />
            </View>
            <View>
                <Text style={styles.otpSubLabel}>{strings.otpSubLabel}</Text>
                <Text style={styles.otpTitle}>{strings.otpTitle}</Text>
            </View>
        </View>

        <View style={styles.otpDigits}>
            {OTP_DIGITS.map((digit, index) => (
                <View key={index} style={styles.otpDigit}>
                    <Text style={styles.otpDigitText}>{digit}</Text>
                </View>
            ))}
        </View>
    </View>
);

export default OtpCard;