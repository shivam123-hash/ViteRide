import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const VehicleCard = ({ styles, metrics }) => (
    <View style={styles.detailCard}>
        <View style={styles.detailCardIconBox}>
            <MaterialIcons
                name="directions-car"
                size={metrics.iconSize.veryHigh}
                color={CommonColors.primary}
            />
        </View>
        <View>
            <Text style={styles.detailCardSubLabel}>{strings.vehicleLabel}</Text>
            <Text style={styles.detailCardTitle}>{strings.vehiclePlate}</Text>
        </View>
    </View>
);

export default VehicleCard;