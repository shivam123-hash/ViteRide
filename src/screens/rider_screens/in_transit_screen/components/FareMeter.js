import React from 'react';
import { View, Text } from 'react-native';
import strings from '../../../../units/CommonStrings';

const FareMeter = ({ styles }) => (
    <View style={styles.fareMeterContainer}>
        <View style={styles.fareMeter}>
            <Text style={styles.fareMeterLabel}>{strings.currentFareLabel}</Text>
            <Text style={styles.fareMeterValue}>{strings.currentFareValue}</Text>
        </View>
    </View>
);

export default FareMeter;