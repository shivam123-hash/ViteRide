import React from 'react';
import { View } from 'react-native';

const ProgressBar = ({ progress, styles }) => (
    <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
    </View>
);

export default ProgressBar;