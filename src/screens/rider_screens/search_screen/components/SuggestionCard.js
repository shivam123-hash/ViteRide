// src/screens/rider_screens/home_screen/DestinationSearchScreen.js
import React, {  useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';

const SuggestionCard = ({ item, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () =>
        Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
    const handlePressOut = () =>
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
                style={styles.suggestionCard}
                onPress={() => onPress?.(item)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <View style={styles.suggestionIcon}>
                    <MaterialIcons name="location-on" size={22} color={CommonColors.primary} />
                </View>
                <View style={styles.suggestionText}>
                    <Text style={styles.suggestionName} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={styles.suggestionAddress} numberOfLines={1}>
                        {item.address}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default SuggestionCard;

const styles = StyleSheet.create({
    // Suggestion Cards
   
    suggestionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: CommonColors.white,
        borderRadius: 16,
        padding: 18,
        shadowColor: CommonColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
    },
    suggestionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: CommonColors.screenBg,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    suggestionText: {
        flex: 1,
        overflow: 'hidden',
    },
    suggestionName: {
        fontFamily: 'Manrope-Bold',
        fontWeight: '700',
        fontSize: 15,
        color: CommonColors.primary,
        marginBottom: 2,
    },
    suggestionAddress: {
        fontFamily: 'Inter',
        fontSize: 13,
        color: CommonColors.textSecondary,
    },

});