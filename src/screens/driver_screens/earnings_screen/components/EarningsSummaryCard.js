import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const EarningsSummaryCard = ({ styles, metrics }) => (
    <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{strings.totalEarningsTabLabel}</Text>
        <Text style={styles.summaryAmount}>{strings.earningsTodayAmount}</Text>
        <View style={styles.summaryGrowthRow}>
            <MaterialIcons
                name="trending-up"
                size={metrics.iconSize.medium}
                color={CommonColors.success}
            />
            <Text style={styles.summaryGrowthText}>{strings.earningsGrowthToday}</Text>
        </View>
    </View>
);

export default EarningsSummaryCard;