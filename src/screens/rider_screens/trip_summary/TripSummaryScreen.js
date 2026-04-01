import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../../common/ThemeContest';
import CommonColors from '../../../units/CommonColor';
import { RFValue } from 'react-native-responsive-fontsize';
import strings from '../../../units/CommonStrings';
import DriverSnapshot from './components/DriverSnapshot';
import FareBreakdown from './components/FareBreakdown';
import RatingSection from './components/RatingSection';
import RouteBanner from './components/RouteBanner';
import CommonHeader from '../../../components/CommonHeader';

const TripSummaryScreen = ({ navigation }) => {
    const [rating, setRating] = useState(4);
    const [selectedChips, setSelectedChips] = useState([]);

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const toggleChip = (chip) => {
        setSelectedChips((prev) =>
            prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
        );
    };

    const handleRateDriver = () => console.log('Rate driver:', { rating, selectedChips });
    const handleSkip = () => navigation?.goBack();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.screenBg} />

            <CommonHeader
                title={strings.tripSummaryHeader}
                onBackPress={() => navigation?.goBack()}
                rightComponent={
                    <View style={styles.moreBtn}>
                        <MaterialIcons
                            name="more-vert"
                            size={metrics.iconSize.high}
                            color={CommonColors.primary}
                        />
                    </View>
                }
            />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroSection}>
                    <Text style={styles.heroLabel}>{strings.arrivalCompleteLabel}</Text>
                    <Text style={styles.heroTitle}>{strings.rideCompletedTitle}</Text>
                </View>

                <DriverSnapshot styles={styles} metrics={metrics} />

                <FareBreakdown styles={styles} />

                <RatingSection
                    rating={rating}
                    onRate={setRating}
                    selectedChips={selectedChips}
                    onToggleChip={toggleChip}
                    styles={styles}
                    metrics={metrics}
                />

                <RouteBanner styles={styles} />

                <View style={styles.bottomSpacer} />
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.rateBtn}
                    activeOpacity={0.88}
                    onPress={handleRateDriver}
                >
                    <Text style={styles.rateBtnText}>{strings.rateDriverBtn}</Text>
                    <MaterialIcons
                        name="arrow-forward"
                        size={metrics.iconSize.medium}
                        color={CommonColors.white}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={handleSkip}
                    activeOpacity={0.7}
                >
                    <Text style={styles.skipBtnText}>{strings.skipFeedbackBtn}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: metrics.padding.high,
        height: 64,
        backgroundColor: CommonColors.screenBg,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
    },
    closeBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        letterSpacing: -0.3,
        color: CommonColors.primary,
    },
    headerBrand: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        letterSpacing: -0.5,
        color: CommonColors.primary,
    },

    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.high,
        paddingTop: metrics.padding.veryHigh,
    },

    heroSection: {
        marginBottom: metrics.margin.veryHigh,
    },
    heroLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
        marginBottom: metrics.margin.low,
    },
    heroTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(42),
        lineHeight: RFValue(46),
        letterSpacing: -0.8,
        color: CommonColors.primary,
    },

    driverSnapshot: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.veryHigh,
        marginBottom: metrics.margin.veryHigh,
    },
    driverAvatar: {
        width: 72,
        height: 72,
        borderRadius: metrics.borderRadius.circular,
    },
    driverName: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        color: CommonColors.primary,
        marginBottom: 3,
    },
    driverVehicle: {
        fontFamily: fonts.regular,
        fontSize: RFValue(13),
        color: CommonColors.textSecondary,
    },

    fareCard: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.veryHigh,
        marginBottom: metrics.margin.veryHigh,
        borderWidth: 1,
        borderColor: CommonColors.border,
    },
    fareCardLabel: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(9),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
        marginBottom: metrics.margin.high,
    },
    fareRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.margin.medium,
    },
    fareRowLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(13),
        color: CommonColors.textSecondary,
    },
    fareRowValue: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(13),
        color: CommonColors.primary,
    },
    fareDivider: {
        height: 1,
        backgroundColor: CommonColors.border,
        marginVertical: metrics.margin.high,
    },
    fareTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fareTotalLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.primary,
    },
    fareTotalValue: {
        fontFamily: fonts.bold,
        fontSize: RFValue(22),
        letterSpacing: -0.5,
        color: CommonColors.primary,
    },

    ratingSection: {
        marginBottom: metrics.margin.veryHigh,
        alignItems: 'center',
    },
    ratingTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        color: CommonColors.primary,
        marginBottom: metrics.margin.veryHigh,
        textAlign: 'center',
    },
    starsRow: {
        flexDirection: 'row',
        gap: metrics.margin.medium,
        marginBottom: metrics.margin.veryHigh,
    },
    chipWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: metrics.margin.low,
    },
    chip: {
        paddingHorizontal: metrics.padding.high,
        paddingVertical: metrics.padding.low,
        borderRadius: metrics.borderRadius.circular,
        borderWidth: 1,
        borderColor: CommonColors.primary,
    },
    chipSelected: {
        backgroundColor: CommonColors.primary,
    },
    chipText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.primary,
    },
    chipTextSelected: {
        color: CommonColors.white,
    },

    routeBanner: {
        height: 220,
        borderRadius: metrics.borderRadius.high,
        overflow: 'hidden',
        marginBottom: metrics.margin.veryHigh,
        opacity: 0.55,
    },
    routeImage: {
        width: '100%',
        height: '100%',
    },
    routeGradient: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },

    bottomSpacer: {
        height: metrics.margin.massive,
    },

    bottomBar: {
        paddingHorizontal: metrics.padding.high,
        paddingVertical: metrics.padding.high,
        paddingBottom: metrics.padding.veryHigh,
        backgroundColor: CommonColors.background,
        borderTopWidth: 1,
        borderTopColor: CommonColors.border,
        gap: metrics.margin.medium,
    },
    rateBtn: {
        height: 56,
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.high,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: metrics.padding.veryHigh,
        elevation: 4,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
    },
    rateBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.white,
        letterSpacing: 0.2,
    },
    skipBtn: {
        alignItems: 'center',
        paddingVertical: metrics.padding.low,
    },
    skipBtnText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(10),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
    },
});

export default TripSummaryScreen;