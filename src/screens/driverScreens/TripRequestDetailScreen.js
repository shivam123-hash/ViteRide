import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../../common/ThemeContest';
import strings from '../../units/CommonStrings';
import CommonHeader from '../../components/CommonHeader';
import CommonButton from '../../components/CommonBtn';

const COUNTER_OFFERS = [
    { id: '1', amount: '₹360', subtitle: 'Driver nearby (1.2 km)', time: '2m ago', isPending: true },
    { id: '2', amount: '₹375', subtitle: 'Premium Service', time: '4m ago', isPending: false },
    { id: '3', amount: '₹355', subtitle: 'Standard Sedan', time: '7m ago', isPending: false },
];

const TripRequestDetailScreen = ({ navigation }) => {
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    return (
        <SafeAreaView style={styles.container}>
            
            <CommonHeader 
                title={strings.newTripRequestTitle} 
                onBackPress={() => navigation?.goBack()} 
            />

            <Text style={styles.headerSubtitle}>{strings.currentRequestOverline}</Text>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.mainCard}>
                    <View style={styles.mapArea}>
                        <Text style={styles.dummyMapText}>[ Map Area ]</Text>
                    </View>
                    <View style={styles.offerDetailsArea}>
                        <Text style={styles.passengerOfferLabel}>{strings.passengerOfferLabel}</Text>
                        <Text style={styles.mainOfferAmount}>{strings.dummyOfferAmount}</Text>
                        <View style={styles.divider} />
                        <View style={styles.secondaryDetailsRow}>
                            <View>
                                <Text style={styles.smallLabel}>{strings.suggestedFareLabel}</Text>
                                <Text style={styles.secondaryValue}>{strings.dummySuggestedFare}</Text>
                            </View>
                            <View style={styles.alignRight}>
                                <Text style={styles.smallLabel}>{strings.distanceLabel}</Text>
                                <Text style={styles.secondaryValue}>{strings.dummyDistanceValue}</Text>
                            </View>
                        </View>
                        <CommonButton
                            title={strings.btnAcceptOffer}
                            backgroundColor={colors.primary} 
                            textColor={colors.white}
                            height={metrics.windowHeight * 0.07}
                            borderRadius={metrics.borderRadius.medium}
                            elevation={4}
                            containerStyle={styles.btnSpacing}
                            textStyle={styles.boldBtnText}
                            onPress={() => console.log('Accept Offer')}
                        />
                        <CommonButton
                            title={strings.btnCounterOffer}
                            backgroundColor={colors.white} 
                            textColor={colors.textPrimary} 
                            height={metrics.windowHeight * 0.07}
                            borderRadius={metrics.borderRadius.medium}
                            elevation={0}
                            containerStyle={[styles.btnSpacing, styles.outlinedBtn]} 
                            textStyle={styles.boldBtnText}
                            onPress={() => console.log('Counter Offer')}
                        />
                        <CommonButton
                            title={strings.btnDeclineRequest}
                            backgroundColor="transparent" 
                            textColor={colors.textSecondary} 
                            height={metrics.windowHeight * 0.05}
                            borderRadius={metrics.borderRadius.none}
                            elevation={0}
                            marginTop={metrics.margin.tiny}
                            textStyle={styles.declineBtnText}
                            onPress={() => console.log('Decline Request')}
                        />
                    </View>
                </View>
                <View style={styles.recentOffersHeaderRow}>
                    <Text style={styles.sectionTitle}>{strings.recentCounterOffersTitle}</Text>
                    <View style={styles.liveIndicator}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>{strings.liveLabel}</Text>
                    </View>
                </View>
                <View style={styles.counterOffersContainer}>
                    {COUNTER_OFFERS.map((offer, index) => (
                        <View key={offer.id} style={styles.counterOfferItem}>
                            {offer.isPending && (
                                <View style={styles.awaitingBadgeWrapper}>
                                    <View style={styles.awaitingBadge}>
                                        <View style={styles.badgeDot} />
                                        <Text style={styles.badgeText}>{strings.awaitingDecision}</Text>
                                    </View>
                                </View>
                            )}
                            <View style={styles.carIconCircle}>
                                <Ionicons name="car" size={metrics.iconSize.medium} color={colors.textPrimary} />
                            </View>
                            <View style={styles.offerTextContainer}>
                                <Text style={styles.offerAmount}>{offer.amount}</Text>
                                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                            </View>
                            <Text style={styles.offerTime}>{offer.time}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.profileRow}>
                    <View style={styles.avatarBox}>
                        <Ionicons name="person" size={metrics.iconSize.veryHigh} color={colors.white} />
                    </View>
                    <View>
                        <Text style={styles.profileName}>{strings.dummyDriverName}</Text>
                        <View style={styles.profileStatsRow}>
                            <Text style={styles.ratingText}>★ 4.9</Text>
                            <Text style={styles.statDivider}> • </Text>
                            <Text style={styles.tripsText}>{strings.dummyTripsCount}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TripRequestDetailScreen;


// --- STRICTLY METRICS-BASED STYLES ---
const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.screenBg, 
    },
    headerSubtitle: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1.5,
        textAlign: 'center',
        marginTop: -metrics.margin.medium, 
        marginBottom: metrics.margin.low,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
    },

    // Main Card Styles
    mainCard: {
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.extraHigh,
        marginBottom: metrics.margin.massive,
        overflow: 'hidden', 
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 5,
    },
    mapArea: {
        height: metrics.windowHeight * 0.18, 
        backgroundColor: colors.border, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    dummyMapText: {
        color: colors.textSecondary,
        fontFamily: fonts.bold,
        letterSpacing: 1,
    },
    offerDetailsArea: {
        padding: metrics.padding.veryHigh,
        alignItems: 'center',
    },
    passengerOfferLabel: {
        fontSize: RFValue(10),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1.5,
        marginBottom: metrics.margin.tiny,
    },
    mainOfferAmount: {
        fontSize: RFValue(42),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginBottom: metrics.margin.medium,
        letterSpacing: -1,
    },
    divider: {
        width: '100%',
        height: StyleSheet.hairlineWidth, // Standard RN way to make a 1px line
        backgroundColor: colors.border,
        marginBottom: metrics.margin.high,
    },
    secondaryDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: metrics.margin.extraHigh,
    },
    alignRight: {
        alignItems: 'flex-end',
    },
    smallLabel: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: metrics.margin.tiny,
    },
    secondaryValue: {
        fontSize: RFValue(16),
        fontFamily: fonts.bold,
        color: colors.textSecondary, 
    },

    // Button Styles
    btnSpacing: {
        marginBottom: metrics.margin.low,
    },
    outlinedBtn: {
        borderWidth: 1.5,
        borderColor: colors.textPrimary,
    },
    boldBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(14),
    },
    declineBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(12),
        textDecorationLine: 'none',
    },

    // Recent Offers Styles
    recentOffersHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.margin.high,
        paddingHorizontal: metrics.padding.tiny,
    },
    sectionTitle: {
        fontSize: RFValue(11),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: -0.5,
    },
    liveIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveDot: {
        width: metrics.margin.low,
        height: metrics.margin.low,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.textSecondary,
        marginRight: metrics.margin.tiny,
    },
    liveText: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
    },
    counterOffersContainer: {
        paddingTop: metrics.margin.low,
    },
    counterOfferItem: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.chipInactive, 
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        marginBottom: metrics.margin.medium,
    },
    carIconCircle: {
        width: metrics.windowWidth * 0.1,
        height: metrics.windowWidth * 0.1,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.border, 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.medium,
    },
    offerTextContainer: {
        flex: 1,
    },
    offerAmount: {
        fontSize: RFValue(14),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginBottom: metrics.margin.tiny,
    },
    offerSubtitle: {
        fontSize: RFValue(11),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
    },
    offerTime: {
        fontSize: RFValue(9),
        fontFamily: fonts.regular,
        color: colors.textLight,
    },

    // Flexbox Centered Badge (No Hardcoding)
    awaitingBadgeWrapper: {
        position: 'absolute',
        top: -metrics.margin.medium,
        left: metrics.margin.none,
        right: metrics.margin.none,
        alignItems: 'center',
        zIndex: 10,
    },
    awaitingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E2329', 
        paddingVertical: metrics.padding.low,
        paddingHorizontal: metrics.padding.medium,
        borderRadius: metrics.borderRadius.circular,
    },
    badgeDot: {
        width: metrics.margin.low,
        height: metrics.margin.low,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.success, 
        marginRight: metrics.margin.tiny,
    },
    badgeText: {
        color: colors.white,
        fontSize: RFValue(8),
        fontFamily: fonts.bold,
        letterSpacing: 1,
    },

    // Bottom Profile Row
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: metrics.margin.extraHigh,
        paddingHorizontal: metrics.padding.tiny,
    },
    avatarBox: {
        width: metrics.windowWidth * 0.14,
        height: metrics.windowWidth * 0.14,
        borderRadius: metrics.borderRadius.medium,
        backgroundColor: '#1E2329', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.high,
    },
    profileName: {
        fontSize: RFValue(16),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginBottom: metrics.margin.tiny,
    },
    profileStatsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: RFValue(10),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    statDivider: {
        fontSize: RFValue(10),
        color: colors.textLight,
        marginHorizontal: metrics.margin.tiny,
    },
    tripsText: {
        fontSize: RFValue(10),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
        letterSpacing: 0.5,
    },
});