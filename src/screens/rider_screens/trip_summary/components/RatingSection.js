import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const TOTAL_STARS = 5;

const RatingSection = ({ rating, onRate, selectedChips, onToggleChip, styles }) => (
    <View style={styles.ratingSection}>
        <Text style={styles.ratingTitle}>{strings.ratingQuestion}</Text>

        <View style={styles.starsRow}>
            {Array.from({ length: TOTAL_STARS }).map((_, i) => (
                <TouchableOpacity
                    key={i}
                    onPress={() => onRate(i + 1)}
                    activeOpacity={0.7}
                >
                    <MaterialIcons
                        name={i < rating ? 'star' : 'star-border'}
                        size={40}
                        color={CommonColors.primary}
                    />
                </TouchableOpacity>
            ))}
        </View>

        <View style={styles.chipWrap}>
            {strings.feedbackChips.map((chip) => {
                const isSelected = selectedChips.includes(chip);
                return (
                    <TouchableOpacity
                        key={chip}
                        style={[styles.chip, isSelected && styles.chipSelected]}
                        onPress={() => onToggleChip(chip)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                            {chip}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    </View>
);

export default RatingSection;