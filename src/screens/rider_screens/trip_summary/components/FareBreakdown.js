import React from 'react';
import { View, Text } from 'react-native';
import strings from '../../../../units/CommonStrings';

const FARE_ROWS = [
    { label: strings.baseFareLabel,     value: strings.baseFareValue },
    { label: strings.distanceFeeLabel,  value: strings.distanceFeeValue },
    { label: strings.timeFeeLabel,      value: strings.timeFeeValue },
];

const FareBreakdown = ({ styles }) => (
    <View style={styles.fareCard}>
        <Text style={styles.fareCardLabel}>{strings.fareBreakdownLabel}</Text>

        {FARE_ROWS.map((row, index) => (
            <View key={index} style={styles.fareRow}>
                <Text style={styles.fareRowLabel}>{row.label}</Text>
                <Text style={styles.fareRowValue}>{row.value}</Text>
            </View>
        ))}

        <View style={styles.fareDivider} />

        <View style={styles.fareTotalRow}>
            <Text style={styles.fareTotalLabel}>{strings.totalPaidLabel}</Text>
            <Text style={styles.fareTotalValue}>{strings.totalPaidValue}</Text>
        </View>
    </View>
);

export default FareBreakdown;