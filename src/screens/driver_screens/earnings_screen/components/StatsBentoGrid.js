import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const StatsBentoGrid = ({ styles, metrics }) => (
    <View style={styles.bentoGrid}>
        <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>{strings.completedTripsLabel}</Text>
            <View style={styles.bentoValueRow}>
                <Text style={styles.bentoValue}>{strings.completedTripsValue}</Text>
                <MaterialIcons
                    name="directions-car"
                    size={metrics.iconSize.medium}
                    color={CommonColors.primary}
                />
            </View>
        </View>

        <View style={styles.bentoCard}>
            <Text style={styles.bentoLabel}>{strings.timeOnlineLabel}</Text>
            <View style={styles.bentoValueRow}>
                <Text style={styles.bentoValue}>{strings.timeOnlineValue}</Text>
                <Text style={styles.bentoUnit}>{strings.timeOnlineUnit}</Text>
            </View>
        </View>
    </View>
);

export default StatsBentoGrid;