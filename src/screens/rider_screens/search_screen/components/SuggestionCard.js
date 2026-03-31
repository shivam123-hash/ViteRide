// src/screens/rider_screens/home_screen/DestinationSearchScreen.js
import React, {  useRef,useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import { useTheme } from "../../../../common/ThemeContest";
import { RFValue } from 'react-native-responsive-fontsize';

const SuggestionCard = ({ item, onPress }) => {
     const { fonts, metrics } = useTheme();
        const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);
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
                    <MaterialIcons name="location-on" size={metrics.iconSize.high} color={CommonColors.primary} />
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

const createStyles = (fonts, metrics) =>StyleSheet.create({
    suggestionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.padding.high,
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        shadowColor: CommonColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: metrics.borderRadius.medium,
        elevation: 2,
    },
    suggestionIcon: {
        width: metrics.windowWidth * 0.12,
        height:metrics.windowWidth * 0.12,
        borderRadius: metrics.borderRadius.medium,
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
       
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: CommonColors.primary,
        marginBottom: metrics.margin.tiny,
    },
    suggestionAddress: {
        fontSize: RFValue(10),
        fontFamily: fonts.regular,
        color: CommonColors.textSecondary,
    },

});