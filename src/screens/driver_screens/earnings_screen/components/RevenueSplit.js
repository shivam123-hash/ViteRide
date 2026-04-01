import React from 'react';
import { View, Text } from 'react-native';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const DIGITAL_PERCENT = 79;
const CASH_PERCENT    = 21;

const RevenueSplit = ({ styles }) => (
    <View style={styles.splitSection}>
        <View style={styles.splitHeader}>
            <Text style={styles.splitTitle}>{strings.revenueSplitTitle}</Text>
            <View style={styles.splitLegend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: CommonColors.primary }]} />
                    <Text style={styles.legendText}>{strings.digitalLabel}</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: CommonColors.border }]} />
                    <Text style={styles.legendText}>{strings.cashLabel}</Text>
                </View>
            </View>
        </View>

        <View style={styles.splitBarTrack}>
            <View style={[styles.splitBarDigital, { width: `${DIGITAL_PERCENT}%` }]} />
            <View style={[styles.splitBarCash,    { width: `${CASH_PERCENT}%` }]} />
        </View>

        <View style={styles.splitValuesRow}>
            <View style={styles.splitValueBlock}>
                <Text style={styles.splitValueLabel}>{strings.digitalPaymentsLabel}</Text>
                <Text style={styles.splitValueAmount}>{strings.digitalPaymentsValue}</Text>
            </View>
            <View style={[styles.splitValueBlock, { alignItems: 'flex-end' }]}>
                <Text style={styles.splitValueLabel}>{strings.cashCollectedLabel}</Text>
                <Text style={styles.splitValueAmount}>{strings.cashCollectedValue}</Text>
            </View>
        </View>
    </View>
);

export default RevenueSplit;