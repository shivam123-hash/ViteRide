// src/components/QuickAccessChips.js
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import CommonColors from '../../../../units/CommonColor';
import { useTheme } from '../../../../common/ThemeContest';
import { RFValue } from 'react-native-responsive-fontsize';

const HomeIcon = ({ size = 14, color = CommonColors.primary }) => (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
            width: size,
            height: size * 0.6,
            backgroundColor: color,
            borderRadius: 2,
            position: 'absolute',
            bottom: 0,
        }} />
        <View style={{
            width: 0,
            height: 0,
            borderLeftWidth: size * 0.6,
            borderRightWidth: size * 0.6,
            borderBottomWidth: size * 0.55,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: color,
            position: 'absolute',
            top: 0,
        }} />
    </View>
);

const WorkIcon = ({ size = 14, color = CommonColors.primary }) => (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
            width: size * 0.85,
            height: size * 0.65,
            backgroundColor: color,
            borderRadius: 2,
            position: 'absolute',
            bottom: 0,
        }} />
        <View style={{
            width: size * 0.5,
            height: size * 0.3,
            borderWidth: 2,
            borderBottomWidth: 0,
            borderColor: color,
            borderRadius: 2,
            position: 'absolute',
            top: 0,
        }} />
    </View>
);

const HistoryIcon = ({ size = 14, color = CommonColors.primary }) => (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: color,
        }} />
        <View style={{
            width: 2,
            height: size * 0.35,
            backgroundColor: color,
            position: 'absolute',
            top: size * 0.12,
            left: size / 2 - 1,
            borderRadius: 1,
        }} />
        <View style={{
            width: size * 0.3,
            height: 2,
            backgroundColor: color,
            position: 'absolute',
            top: size / 2 - 1,
            left: size / 2 - 1,
            borderRadius: 1,
        }} />
    </View>
);

const chips = [
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'work', label: 'Work', Icon: WorkIcon },
    { id: 'recent', label: 'Recent', Icon: HistoryIcon },
];

const QuickAccessChips = ({ onChipPress, activeChip }) => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {chips.map((chip) => {
                const isActive = activeChip === chip.id;
                const iconColor = isActive ? CommonColors.white : CommonColors.primary;

                return (
                    <TouchableOpacity
                        key={chip.id}
                        style={[styles.chip, isActive && styles.chipActive]}
                        onPress={() => onChipPress?.(chip.id)}
                        activeOpacity={0.7}
                    >
                        <chip.Icon
                            size={metrics.iconSize.low}
                            color={iconColor}
                        />
                        <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
                            {chip.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    scrollContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
        paddingHorizontal: metrics.padding.low,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.low,
        backgroundColor: CommonColors.chipInactive,
        paddingHorizontal: metrics.padding.high,
        paddingVertical: metrics.padding.low,
        borderRadius: metrics.borderRadius.medium,
    },
    chipActive: {
        backgroundColor: CommonColors.chipActive,
    },
    chipLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textPrimary,
    },
    chipLabelActive: {
        color: CommonColors.white,
        fontFamily: fonts.medium,
    },
});

export default QuickAccessChips;