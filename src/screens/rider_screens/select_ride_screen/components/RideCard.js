
import React, { useRef ,useMemo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import { useTheme } from "../../../../common/ThemeContest";
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');
const RideCard = ({ item, isSelected, onPress }) => {

    const { fonts, metrics } = useTheme();
    // Wrap styles in useMemo so it efficiently injects global theme objects 
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);
    const scale = useRef(new Animated.Value(1)).current;
    
    const handlePressIn = () =>
        Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
    const handlePressOut = () =>
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => onPress(item.id)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                {/* Icon */}
                <View style={[styles.cardIconWrapper, isSelected && styles.cardIconWrapperSelected]}>
                    <MaterialIcons
                        name={item.icon}
                        size={metrics.iconSize.veryHigh}
                        color={isSelected ? CommonColors.white : CommonColors.primary}
                    />
                </View>

                {/* Info */}
                <View style={styles.cardInfo}>
                    <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                        {item.label}
                    </Text>
                    <Text style={[styles.cardDescription, isSelected && styles.cardDescriptionSelected]}>
                        {item.description}
                    </Text>
                </View>

                {/* Right side */}
                <View style={styles.cardRight}>
                    <Text style={[styles.cardPrice, isSelected && styles.cardPriceSelected]}>
                        {item.price}
                    </Text>
                    <View style={[styles.etaBadge, isSelected && styles.etaBadgeSelected]}>
                        <MaterialIcons
                            name="access-time"
                            size={metrics.iconSize.tiny}
                            color={isSelected ? CommonColors.primary : CommonColors.textSecondary}
                        />
                        <Text style={[styles.etaText, isSelected && styles.etaTextSelected]}>
                            {item.eta}
                        </Text>
                    </View>
                </View>

                {/* Selected indicator dot */}
                {isSelected && <View style={styles.selectedDot} />}
            </TouchableOpacity>
        </Animated.View>
    );
};


export default RideCard;

const createStyles = (fonts, metrics) => ({
    // Ride Card
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        gap: metrics.margin.medium,
        borderWidth: 2,
        borderColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
    },
    cardSelected: {
        backgroundColor: CommonColors.primary,
        borderColor: CommonColors.primary,
    },
    cardIconWrapper: {
        width: 52,
        height: 52,
        borderRadius: metrics.borderRadius.medium,
        backgroundColor: CommonColors.white,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    cardIconWrapperSelected: {
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    cardInfo: {
        flex: 1,
    },
    cardLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(15),
        color: CommonColors.primary,
        marginBottom: 2,
    },
    cardLabelSelected: {
        color: CommonColors.white,
    },
    cardDescription: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },
    cardDescriptionSelected: {
        color: 'rgba(255,255,255,0.65)',
    },
    cardRight: {
        alignItems: 'flex-end',
        gap: metrics.margin.tiny,
    },
    cardPrice: {
        fontFamily: fonts.bold,
        fontSize: RFValue(17),
        color: CommonColors.primary,
        letterSpacing: -0.3,
    },
    cardPriceSelected: {
        color: CommonColors.white,
    },
    etaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: CommonColors.white,
        paddingHorizontal: metrics.padding.low,
        paddingVertical: 3,
        borderRadius: metrics.borderRadius.veryHigh,
    },
    etaBadgeSelected: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    etaText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(11),
        color: CommonColors.textSecondary,
    },
    etaTextSelected: {
        color: CommonColors.white,
    },
    selectedDot: {
        position: 'absolute',
        top: 12,
        left: 12,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },

});