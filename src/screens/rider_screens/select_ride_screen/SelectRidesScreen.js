// src/screens/rider_screens/home_screen/SelectRideScreen.js
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Image,
    Animated,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Ionicons from '@react-native-vector-icons/ionicons';
import CommonColors from '../../../units/CommonColor';
import CommonBtn from '../../../components/CommonBtn';
import CommonStrings from "../../../units/CommonStrings";
import { useTheme } from "../../../common/ThemeContest";
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const RIDE_TYPES = [
    {
        id: 'economy',
        label: 'Economy',
        price: '$12.50',
        eta: '3 min',
        icon: 'directions-car',
        description: 'Affordable everyday rides',
    },
    {
        id: 'premium',
        label: 'Premium',
        price: '$24.00',
        eta: '5 min',
        icon: 'star',
        description: 'Luxury comfort & style',
        isDefault: true,
    },
    {
        id: 'suv',
        label: 'SUV',
        price: '$35.20',
        eta: '7 min',
        icon: 'airport-shuttle',
        description: 'Extra space for groups',
    },
    {
        id: 'electric',
        label: 'Electric',
        price: '$15.75',
        eta: '4 min',
        icon: 'electric-car',
        description: 'Eco-friendly zero emission',
    },
];


const RideCard = ({ item, isSelected, onPress }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const { fonts, metrics } = useTheme();
    const styles = style(fonts, CommonColors,metrics);
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
                        size={32}
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
                            size={11}
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


const SelectRideScreen = ({ navigation }) => {
    const { fonts, metrics } = useTheme();
    const styles = style(fonts, CommonColors,metrics);
    const [selectedRide, setSelectedRide] = useState('premium');
    const confirmScale = useRef(new Animated.Value(1)).current;

    const selectedData = RIDE_TYPES.find((r) => r.id === selectedRide);

    const handleConfirmPressIn = () =>
        Animated.spring(confirmScale, { toValue: 0.97, useNativeDriver: true }).start();
    const handleConfirmPressOut = () =>
        Animated.spring(confirmScale, { toValue: 1, useNativeDriver: true }).start();

    const handleConfirm = () => {
        // Navigate to next screen
        // navigation.navigate('RideConfirmed', { ride: selectedData });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation?.goBack()}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name="arrow-back" size={24} color={CommonColors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Ride</Text>
                <View style={styles.headerRight} />
            </View>

            {/* ── Map Preview ── */}
            <View style={styles.mapContainer}>
                <Image
                    source={{
                        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmrWdngJFRkmm3BETQYBcWOOl_3UknouWOsqdj-KdqjB2NsfujRznetVcZAHf-XhvuJm4LPa-FIj6zhvuHsuJOlzZ_IfIX7mcOtaats_kZFJ-PaUpTn9Lfm8kjZA9eD3fqy-qiqbTlPA1_9Sgz2xKtw4aAuATezC9t7ScI7oSH0JVaWCUEzW8TgA5x3Lu9CEk9ba2MVcSXCNo9lgdq3o92aLlRyvcHZRX366A34NdbH8RtJFJZVELMu97CpavnByr5tVvk5nuurKSy',
                    }}
                    style={styles.mapImage}
                    resizeMode="cover"
                />
                {/* Grayscale overlay */}
                <View style={styles.mapOverlay} />

                {/* Route line decoration */}
                <View style={styles.routeLine} />

                {/* Origin pin */}
                <View style={[styles.pin, styles.pinOrigin]}>
                    <View style={styles.pinInner} />
                    <View style={styles.pinRing} />
                </View>

                {/* Destination pin */}
                <View style={[styles.pin, styles.pinDest]}>
                    <MaterialIcons name="location-on" size={28} color={CommonColors.primary} />
                </View>

                {/* Trip info chip */}
                <View style={styles.tripChip}>
                    <MaterialIcons name="straighten" size={14} color={CommonColors.textSecondary} />
                    <Text style={styles.tripChipText}>4.2 km · ~18 min</Text>
                </View>
            </View>

            {/* ── Bottom Sheet ── */}
            <View style={styles.bottomSheet}>
                {/* Handle */}
                <View style={styles.sheetHandle} />

                {/* Section Label */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionLabel}>Vehicle Types</Text>
                    <Text style={styles.sectionSub}>{RIDE_TYPES.length} options available</Text>
                </View>

                {/* Ride List */}
                <ScrollView
                    style={styles.rideList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.rideListContent}
                >
                    {RIDE_TYPES.map((item) => (
                        <RideCard
                            key={item.id}
                            item={item}
                            isSelected={selectedRide === item.id}
                            onPress={setSelectedRide}
                        />
                    ))}
                </ScrollView>

                {/* Price Summary */}
                <View style={styles.priceSummary}>
                    <View>
                        <Text style={styles.priceSummaryLabel}>Total Fare</Text>
                        <Text style={styles.priceSummaryValue}>{selectedData?.price}</Text>
                    </View>
                    <View style={styles.priceSummaryRight}>
                        <MaterialIcons name="credit-card" size={16} color={CommonColors.textSecondary} />
                        <Text style={styles.priceSummaryPayment}>••••  4242</Text>
                    </View>
                </View>

                {/* Confirm Button */}
                <CommonBtn
                    title={CommonStrings.btnSendCode}
                    backgroundColor={CommonColors.primary}
                    textColor={CommonColors.white}
                    height={metrics.windowHeight * 0.065}
                    borderRadius={metrics.borderRadius.high}
                    marginTop={metrics.margin.veryHigh}
                    elevation={2}
                    textStyle={styles.btnTextStyle}

                    rightComponent={
                        <Ionicons name="chevron-forward" size={metrics.iconSize.regular} color={CommonColors.primary} style={styles.btnIcon} />
                    }
                    onPress={() => console.log("Send Code Pressed")}
                />

            </View>
        </SafeAreaView>
    );
};


const style = (fonts, CommonColors,metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },

    btnTextStyle: {
        fontSize: RFValue(14),
        fontFamily: fonts.semiBold,
    },
    btnIcon: {
        marginLeft: metrics.margin.low,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: CommonColors.background,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: CommonColors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    headerTitle: {
        fontFamily: 'Manrope-Bold',
        fontWeight: '700',
        fontSize: 20,
        letterSpacing: -0.4,
        color: CommonColors.primary,
    },
    headerRight: {
        width: 40,
    },

    // Map
    mapContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 0,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: CommonColors.screenBg,
        minHeight: 180,
        maxHeight: 220,
    },
    mapImage: {
        width: '100%',
        height: '100%',
        opacity: 0.25,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(245,245,245,0.3)',
    },
    routeLine: {
        position: 'absolute',
        width: 2,
        height: 80,
        backgroundColor: CommonColors.primary,
        opacity: 0.3,
        top: '20%',
        left: '50%',
        borderRadius: 1,
    },
    pin: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pinOrigin: {
        top: '25%',
        left: '46%',
    },
    pinDest: {
        bottom: '20%',
        left: '43%',
    },
    pinInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: CommonColors.primary,
    },
    pinRing: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: `${CommonColors.primary}30`,
    },
    tripChip: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: CommonColors.white,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    tripChipText: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 12,
        color: CommonColors.textSecondary,
    },

    // Bottom Sheet
    bottomSheet: {
        backgroundColor: CommonColors.white,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingTop: 12,
        paddingHorizontal: 20,
        paddingBottom: 24,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.06,
        shadowRadius: 30,
        elevation: 20,
        marginTop: 12,
    },
    sheetHandle: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: CommonColors.border,
        alignSelf: 'center',
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    sectionLabel: {
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 11,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
    },
    sectionSub: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: CommonColors.textLight,
    },

    // Ride List
    rideList: {
        maxHeight: 280,
    },
    rideListContent: {
        gap: 10,
        paddingBottom: 4,
    },

    // Ride Card
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CommonColors.screenBg,
        borderRadius: 16,
        padding: 16,
        gap: 14,
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
        borderRadius: 14,
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
        fontFamily: 'Manrope-Bold',
        fontWeight: '700',
        fontSize: 15,
        color: CommonColors.primary,
        marginBottom: 2,
    },
    cardLabelSelected: {
        color: CommonColors.white,
    },
    cardDescription: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: CommonColors.textSecondary,
    },
    cardDescriptionSelected: {
        color: 'rgba(255,255,255,0.65)',
    },
    cardRight: {
        alignItems: 'flex-end',
        gap: 6,
    },
    cardPrice: {
        fontFamily: 'Manrope-ExtraBold',
        fontWeight: '800',
        fontSize: 17,
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
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
    },
    etaBadgeSelected: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    etaText: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 11,
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

    // Price Summary
    priceSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        marginTop: 4,
        borderTopWidth: 1,
        borderTopColor: CommonColors.border,
        marginBottom: 14,
    },
    priceSummaryLabel: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: CommonColors.textLight,
        marginBottom: 2,
    },
    priceSummaryValue: {
        fontFamily: 'Manrope-ExtraBold',
        fontWeight: '800',
        fontSize: 22,
        color: CommonColors.primary,
        letterSpacing: -0.5,
    },
    priceSummaryRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: CommonColors.screenBg,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
    },
    priceSummaryPayment: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 13,
        color: CommonColors.textSecondary,
    },

    // Confirm Button
    confirmButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CommonColors.primary,
        height: 60,
        borderRadius: 16,
        shadowColor: CommonColors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 8,
        position: 'relative',
    },
    confirmButtonText: {
        fontFamily: 'Manrope-Bold',
        fontWeight: '700',
        fontSize: 16,
        color: CommonColors.white,
        letterSpacing: 0.2,
    },
    confirmArrow: {
        position: 'absolute',
        right: 20,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: CommonColors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SelectRideScreen;