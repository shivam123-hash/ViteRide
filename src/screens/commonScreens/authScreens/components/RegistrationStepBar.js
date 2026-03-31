import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../../../../common/ThemeContest';
import strings from '../../../../units/CommonStrings';
import GlobalMetrics from '../../../../units/GlobalMetricsStyles';

const RegistrationStepBar = ({ currentStep = 1, totalSteps = 4 }) => {
    const { colors, fonts } = useTheme();
    const styles = useMemo(() => createStyles(colors, fonts), [colors, fonts]);

    const percentage = Math.round((currentStep / totalSteps) * 100);

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Text style={styles.stepText}>
                    {strings.registrationStep} {currentStep} {strings.registrationOf} {totalSteps}
                </Text>

                <Text style={styles.percentText}>{percentage}%</Text>
            </View>

            <View style={styles.track}>
                <View style={[styles.fill, { width: `${percentage}%` }]} />
            </View>
        </View>
    );
};

const createStyles = (colors, fonts) =>
    StyleSheet.create({
        container: {
            paddingTop: GlobalMetrics.padding.low,
        },
        topRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: GlobalMetrics.margin.medium,
        },
        stepText: {
            fontSize: RFValue(10),
            fontFamily: fonts.bold,
            color: colors.textSecondary,
            letterSpacing: 1,
        },
        percentText: {
            fontSize: RFValue(12),
            fontFamily: fonts.bold,
            color: colors.textPrimary,
        },
        track: {
            height: 4,
            borderRadius: GlobalMetrics.borderRadius.circular,
            backgroundColor: '#DDDDDD',
            overflow: 'hidden',
        },
        fill: {
            height: '100%',
            backgroundColor: colors.textPrimary,
            borderRadius: GlobalMetrics.borderRadius.circular,
        },
    });

export default RegistrationStepBar;