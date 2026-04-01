import React from 'react';
import { View, Text } from 'react-native';
import strings from '../../../../units/CommonStrings';

const HourlyChart = ({ styles }) => (
    <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>{strings.hourlyActivityTitle}</Text>
            <Text style={styles.chartPeak}>{strings.hourlyActivityPeak}</Text>
        </View>

        <View style={styles.chartContainer}>
            {strings.hourlyBars.map((heightRatio, index) => {
                const isPeak = heightRatio === Math.max(...strings.hourlyBars);
                return (
                    <View
                        key={index}
                        style={[
                            styles.bar,
                            {
                                height: `${heightRatio * 100}%`,
                                opacity: isPeak ? 1 : Math.max(heightRatio, 0.15),
                            },
                        ]}
                    />
                );
            })}
        </View>
    </View>
);

export default HourlyChart;