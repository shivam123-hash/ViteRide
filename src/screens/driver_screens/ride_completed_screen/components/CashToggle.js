import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const CashToggle = ({ value, onToggle, styles, metrics }) => {
    const thumbPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

    const handleToggle = () => {
        const newVal = !value;
        Animated.spring(thumbPosition, {
            toValue: newVal ? 1 : 0,
            useNativeDriver: false,
            bounciness: 6,
        }).start();
        onToggle(newVal);
    };

    const thumbTranslate = thumbPosition.interpolate({
        inputRange:  [0, 1],
        outputRange: [0, 20],
    });

    return (
        <View style={styles.cashToggle}>
            <View style={styles.cashToggleLeft}>
                <MaterialIcons
                    name="payments"
                    size={metrics.iconSize.high}
                    color={CommonColors.white}
                />
                <View style={styles.cashToggleTextBlock}>
                    <Text style={styles.cashToggleTitle}>{strings.cashCollectedLabel2}</Text>
                    <Text style={styles.cashToggleSubtitle}>{strings.cashCollectedConfirm}</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={handleToggle}
                activeOpacity={0.85}
            >
                <View style={[styles.toggleTrack, value ? styles.toggleTrackOn : styles.toggleTrackOff]}>
                    <Animated.View
                        style={[
                            styles.toggleThumb,
                            { transform: [{ translateX: thumbTranslate }] },
                        ]}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CashToggle;