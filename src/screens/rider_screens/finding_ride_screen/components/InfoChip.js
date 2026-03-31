import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';

const InfoChip = ({ icon, label, value, styles, metrics }) => (
    <View style={styles.chip}>
        <MaterialIcons
            name={icon}
            size={metrics.iconSize.high}
            color={CommonColors.primary}
        />
        <View style={styles.chipTextBlock}>
            <Text style={styles.chipLabel}>{label}</Text>
            <Text style={styles.chipValue}>{value}</Text>
        </View>
    </View>
);

export default InfoChip;