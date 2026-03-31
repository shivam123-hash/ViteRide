import React from 'react';
import { View, Text } from 'react-native';

const formatTime = (seconds) => {
    const m = Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0');
    const s = (Math.abs(seconds) % 60).toString().padStart(2, '0');
    return `-${m}:${s}`;
};

const CountdownTimer = ({ secondsLeft, styles }) => (
    <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
    </View>
);

export default CountdownTimer;