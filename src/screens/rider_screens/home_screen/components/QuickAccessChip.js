// src/components/QuickAccessChips.js
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import CommonColors from '../../../../units/CommonColor';

// Minimal vector icons as custom components
const HomeIcon = ({ size = 14 }) => (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: size, height: size * 0.6, backgroundColor: CommonColors.primary, borderRadius: 2, position: 'absolute', bottom: 0 }} />
        <View
            style={{
                width: 0,
                height: 0,
                borderLeftWidth: size * 0.6,
                borderRightWidth: size * 0.6,
                borderBottomWidth: size * 0.55,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: CommonColors.primary,
                position: 'absolute',
                top: 0,
            }}
        />
    </View>
);

const WorkIcon = ({ size = 14 }) => (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <View
            style={{
                width: size * 0.85,
                height: size * 0.65,
                backgroundColor: CommonColors.primary,
                borderRadius: 2,
                position: 'absolute',
                bottom: 0,
            }}
        />
        <View
            style={{
                width: size * 0.5,
                height: size * 0.3,
                borderWidth: 2,
                borderBottomWidth: 0,
                borderColor: CommonColors.primary,
                borderRadius: 2,
                position: 'absolute',
                top: 0,
            }}
        />
    </View>
);

const HistoryIcon = ({ size = 14 }) => (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 2,
                borderColor: CommonColors.primary,
            }}
        />
        <View
            style={{
                width: 2,
                height: size * 0.35,
                backgroundColor: CommonColors.primary,
                position: 'absolute',
                top: size * 0.12,
                left: size / 2 - 1,
                borderRadius: 1,
            }}
        />
        <View
            style={{
                width: size * 0.3,
                height: 2,
                backgroundColor: CommonColors.primary,
                position: 'absolute',
                top: size / 2 - 1,
                left: size / 2 - 1,
                borderRadius: 1,
            }}
        />
    </View>
);

const chips = [
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'work', label: 'Work', Icon: WorkIcon },
    { id: 'recent', label: 'Recent', Icon: HistoryIcon },
];

const QuickAccessChips = ({ onChipPress, activeChip }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {chips.map((chip) => {
                const isActive = activeChip === chip.id;
                return (
                    <TouchableOpacity
                        key={chip.id}
                        style={[
                            styles.chip,
                            isActive && styles.chipActive,
                        ]}
                        onPress={() => onChipPress?.(chip.id)}
                        activeOpacity={0.7}
                    >
                        <chip.Icon size={14} />
                        <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
                            {chip.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexDirection: 'row',
        gap: 10,
        paddingRight: 4,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: CommonColors.background,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
    },
    chipActive: {
        backgroundColor: CommonColors.primary,
    },
    chipLabel: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 13,
        color: CommonColors.primary,
    },
    chipLabelActive: {
        color: CommonColors.white,
    },
});

export default QuickAccessChips;