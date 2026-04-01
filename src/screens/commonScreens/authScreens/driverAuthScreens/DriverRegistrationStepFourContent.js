import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../../../../common/ThemeContest';
import strings from '../../../../units/CommonStrings';
import CommonBtn from '../../../../components/CommonBtn';
import CommonInput from '../../../../components/CommonInput';
import GlobalMetrics from '../../../../units/GlobalMetricsStyles';

const DriverRegistrationStepFourContent = ({
    data,
    onChangeField,
    onSubmit,
}) => {
    const { colors, fonts } = useTheme();
    const styles = useMemo(() => createStyles(colors, fonts), [colors, fonts]);

    return (
        <View>
            <Text style={styles.title}>{strings.bankPayoutTitle}</Text>
            <Text style={styles.subtitle}>{strings.bankPayoutSubtitle}</Text>

            <View style={styles.formCard}>
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings.bankNameLabel}</Text>
                    <View style={styles.inputShell}>
                        <CommonInput
                            value={data.bankName}
                            onChangeText={(value) => onChangeField('bankName', value)}
                            placeholder={strings.bankNamePlaceholder}
                            placeholderTextColor={colors.textLight}
                            style={styles.inputContainerOverride}
                            textInput={styles.inputText}
                        />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings.accountNumberLabel}</Text>
                    <View style={styles.inputShell}>
                        <CommonInput
                            value={data.accountNumber}
                            onChangeText={(value) => onChangeField('accountNumber', value)}
                            placeholder={strings.accountNumberPlaceholder}
                            placeholderTextColor={colors.textLight}
                            keyboardType="number-pad"
                            style={styles.inputContainerOverride}
                            textInput={styles.inputText}
                        />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings.ifscCodeLabel}</Text>
                    <View style={styles.inputShell}>
                        <CommonInput
                            value={data.ifscCode}
                            onChangeText={(value) => onChangeField('ifscCode', value)}
                            placeholder={strings.ifscCodePlaceholder}
                            placeholderTextColor={colors.textLight}
                            autoCapitalize="characters"
                            style={styles.inputContainerOverride}
                            textInput={styles.inputText}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.infoCard}>
                <Ionicons
                    name="shield-checkmark"
                    size={GlobalMetrics.iconSize.medium}
                    color={colors.textSecondary}
                    style={styles.infoIcon}
                />
                <Text style={styles.infoText}>{strings.bankSecurityInfo}</Text>
            </View>

            <CommonBtn
                title={strings.verifyAndSubmit}
                backgroundColor={colors.textPrimary}
                textColor={colors.white}
                height={56}
                borderRadius={GlobalMetrics.borderRadius.high}
                textStyle={styles.btnText}
                rightComponent={
                    <Ionicons
                        name="chevron-forward"
                        size={GlobalMetrics.iconSize.low}
                        color={colors.white}
                        style={styles.rightIcon}
                    />
                }
                onPress={onSubmit}
            />

            <Text style={styles.supportText}>
                {strings.needHelpText}{' '}
                <Text style={styles.supportLink}>{strings.contactSupportText}</Text>
            </Text>
        </View>
    );
};

const createStyles = (colors, fonts) =>
    StyleSheet.create({
        title: {
            fontSize: RFValue(28),
            lineHeight: RFValue(32),
            fontFamily: fonts.bold,
            color: colors.textPrimary,
            marginBottom: GlobalMetrics.margin.medium,
        },
        subtitle: {
            fontSize: RFValue(13),
            lineHeight: RFValue(20),
            fontFamily: fonts.regular,
            color: colors.textSecondary,
            marginBottom: GlobalMetrics.margin.extraHigh,
        },
        formCard: {
            backgroundColor: colors.white,
            borderRadius: GlobalMetrics.borderRadius.extraHigh,
            padding: GlobalMetrics.padding.veryHigh,
            marginBottom: GlobalMetrics.margin.high,
            elevation:5,
              shadowColor: colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
        },
        fieldGroup: {
            marginBottom: GlobalMetrics.margin.high,
        },
        label: {
            fontSize: RFValue(12),
            fontFamily: fonts.bold,
            color: colors.textSecondary,
            letterSpacing: 1,
            marginBottom: GlobalMetrics.margin.medium,
        },
        inputShell: {
            height: 54,
            borderRadius: GlobalMetrics.borderRadius.high,
            backgroundColor: colors.inputBg,
            justifyContent: 'center',
            paddingHorizontal: GlobalMetrics.padding.high,
            elevation:5,
             shadowColor: colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
        },
        inputContainerOverride: {
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            borderWidth: 0,
            paddingHorizontal: 0,
        },
        inputText: {
            width: '100%',
            fontSize: RFValue(12),
            fontFamily: fonts.medium,
            color: colors.textPrimary,
        },
        infoCard: {
            backgroundColor: '#EFEFEF',
            borderRadius: GlobalMetrics.borderRadius.veryHigh,
            padding: GlobalMetrics.padding.high,
            marginBottom: GlobalMetrics.margin.extraHigh,
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        infoIcon: {
            marginRight: GlobalMetrics.margin.medium,
            marginTop: 2,
        },
        infoText: {
            flex: 1,
            fontSize: RFValue(12),
            lineHeight: RFValue(18),
            fontFamily: fonts.regular,
            color: colors.textSecondary,
        },
        btnText: {
            fontSize: RFValue(14),
            fontFamily: fonts.semiBold,
        },
        rightIcon: {
            marginLeft: GlobalMetrics.margin.low,
        },
        supportText: {
            textAlign: 'center',
            marginTop: GlobalMetrics.margin.high,
            fontSize: RFValue(11),
            fontFamily: fonts.medium,
            color: colors.textSecondary,
        },
        supportLink: {
            color: colors.textPrimary,
            fontFamily: fonts.bold,
            textDecorationLine: 'underline',
        },
    });

export default DriverRegistrationStepFourContent;