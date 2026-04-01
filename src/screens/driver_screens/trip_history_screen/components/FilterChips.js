import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const FilterChips = ({ filters, activeIndex, onSelect, styles }) => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
    >
        {filters.map((filter, index) => (
            <TouchableOpacity
                key={filter}
                style={[styles.filterChip, activeIndex === index && styles.filterChipActive]}
                onPress={() => onSelect(index)}
                activeOpacity={0.8}
            >
                <Text style={[
                    styles.filterChipText,
                    activeIndex === index && styles.filterChipTextActive,
                ]}>
                    {filter}
                </Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
);

export default FilterChips;