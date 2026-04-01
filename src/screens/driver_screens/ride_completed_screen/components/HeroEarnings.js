import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const HeroEarnings = ({ styles, metrics }) => (
    <View style={styles.heroSection}>
        <Text style={styles.heroLabel}>{strings.totalEarningsDriverLabel}</Text>
        <Text style={styles.heroAmount}>{strings.totalEarningsDriverValue}</Text>
        <View style={styles.processedBadge}>
            <MaterialIcons
                name="check-circle"
                size={metrics.iconSize.low}
                color={CommonColors.success}
            />
            <Text style={styles.processedText}>{strings.processedLabel}</Text>
        </View>
    </View>
);

export default HeroEarnings;