import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';

const CAR_POSITIONS = [
    { top: '30%', left: '25%', rotation: '12deg',   opacity: 0.8, size: 20 },
    { top: '45%', right: '20%', rotation: '-45deg',  opacity: 0.6, size: 18 },
    { bottom: '40%', left: '15%', rotation: '90deg', opacity: 0.4, size: 22 },
    { top: '15%', right: '35%', rotation: '160deg',  opacity: 0.7, size: 20 },
];

const CarMarkers = () => (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {CAR_POSITIONS.map((pos, index) => {
            const { rotation, opacity, size, ...position } = pos;
            return (
                <View
                    key={index}
                    style={[
                        styles.carMarker,
                        position,
                        { opacity, transform: [{ rotate: rotation }] },
                    ]}
                >
                    <MaterialIcons
                        name="directions-car"
                        size={size}
                        color={CommonColors.primary}
                    />
                </View>
            );
        })}
    </View>
);

const styles = StyleSheet.create({
    carMarker: {
        position: 'absolute',
    },
});

export default CarMarkers;