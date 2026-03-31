import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import strings from '../../../../units/CommonStrings';

const BookingToggle = ({ value, onToggle, styles }) => {
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
        outputRange: [0, 22],
    });

    return (
        <View style={styles.toggleCard}>
            <View style={styles.toggleTextBlock}>
                <Text style={styles.toggleTitle}>{strings.bookingForSomeoneElse}</Text>
                <Text style={styles.toggleSubtitle}>{strings.bookingToggleSubtitle}</Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleToggle}
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

export default BookingToggle;