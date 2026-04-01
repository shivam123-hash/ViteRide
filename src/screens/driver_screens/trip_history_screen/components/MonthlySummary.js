import React from 'react';
import { View, Text } from 'react-native';
import strings from '../../../../units/CommonStrings';

const MonthlySummary = ({ styles }) => (
    <View style={styles.monthlySummary}>
        <View style={styles.monthlyBadgeRow}>
            <View style={styles.monthlyDot} />
            <Text style={styles.monthlyLabel}>{strings.monthlySummaryLabel}</Text>
        </View>
        <Text style={styles.monthlyAmount}>{strings.monthlyTotalAmount}</Text>
        <Text style={styles.monthlyNote}>{strings.monthlyTripsNote}</Text>
    </View>
);

export default MonthlySummary;