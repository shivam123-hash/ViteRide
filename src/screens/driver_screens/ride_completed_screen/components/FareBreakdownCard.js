import React from 'react';
import { View, Text } from 'react-native';
import strings from '../../../../units/CommonStrings';

const FARE_ROWS = [
    { label: strings.grossFareLabel,   value: strings.grossFareValue },
    { label: strings.commissionLabel,  value: strings.commissionValue },
];

const FareBreakdownCard = ({ styles }) => (
    <View style={styles.fareCard}>
        {FARE_ROWS.map((row, index) => (
            <View key={index} style={styles.fareRow}>
                <Text style={styles.fareRowLabel}>{row.label}</Text>
                <Text style={styles.fareRowValue}>{row.value}</Text>
            </View>
        ))}

        <View style={styles.fareDivider} />

        <View style={styles.fareNetRow}>
            <Text style={styles.fareNetLabel}>{strings.netEarningsLabel}</Text>
            <Text style={styles.fareNetValue}>{strings.netEarningsValue}</Text>
        </View>
    </View>
);

export default FareBreakdownCard;