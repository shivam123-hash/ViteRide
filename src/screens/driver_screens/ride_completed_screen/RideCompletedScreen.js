import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../../common/ThemeContest';
import CommonColors from '../../../units/CommonColor';
import { RFValue } from 'react-native-responsive-fontsize';
import strings from '../../../units/CommonStrings';
import HeroEarnings from './components/HeroEarnings';
import FareBreakdownCard from './components/FareBreakdownCard';
import RouteMiniCard from './components/RouteMiniCard';
import CashToggle from './components/CashToggle';
import CommonHeader from '../../../components/CommonHeader';

const RideCompletedScreen = ({ navigation }) => {
    const [cashCollected, setCashCollected] = useState(false);

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const handleRatePassenger = () => console.log('Rate passenger pressed');
    const handleBackToDashboard = () => navigation?.goBack();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            <CommonHeader title="Ride Completed"
                onBackPress={() => { }}
            />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <HeroEarnings styles={styles} metrics={metrics} />

                <View style={styles.fareSection}>
                    <Text style={styles.fareSectionTitle}>{strings.fareBreakdownDriverTitle}</Text>
                    <FareBreakdownCard styles={styles} />
                    <RouteMiniCard styles={styles} metrics={metrics} />
                </View>

                <CashToggle
                    value={cashCollected}
                    onToggle={setCashCollected}
                    styles={styles}
                    metrics={metrics}
                />


                <TouchableOpacity
                    style={styles.dashboardBtn}
                    onPress={handleBackToDashboard}
                    activeOpacity={0.7}
                >
                    <Text style={styles.dashboardBtnText}>{strings.backToDashboardBtn}</Text>
                </TouchableOpacity>


                <View style={styles.bottomSpacer} />
            </ScrollView>
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
        height: 56,
        backgroundColor: CommonColors.background,
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
    headerSpacer: {
        width: 36,
    },

    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.high,
        paddingTop: metrics.padding.medium,
    },

    heroSection: {
        alignItems: 'center',
        marginBottom: metrics.margin.veryHigh,
        marginTop: metrics.margin.medium,
    },
    heroLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
        marginBottom: metrics.margin.medium,
    },
    heroAmount: {
        fontFamily: fonts.bold,
        fontSize: RFValue(32),
        letterSpacing: -1.5,
        lineHeight: RFValue(56),
        color: CommonColors.primary,
    },
    processedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: `${CommonColors.success}15`,
        paddingHorizontal: metrics.padding.medium,
        paddingVertical: metrics.padding.tiny,
        borderRadius: metrics.borderRadius.circular,
        marginTop: metrics.margin.medium,
    },
    processedText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(10),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.success,
    },

    fareSection: {
        gap: metrics.margin.low,
        marginBottom: metrics.margin.high,
    },
    fareSectionTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        letterSpacing: -0.3,
        color: CommonColors.primary,
        marginBottom: metrics.margin.tiny,
        paddingHorizontal: metrics.padding.tiny,
    },

    fareCard: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.veryHigh,
        borderWidth: 1,
        borderColor: CommonColors.border,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
        gap: metrics.margin.medium,
    },
    fareRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fareRowLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },
    fareRowValue: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.primary,
    },
    fareDivider: {
        height: 1,
        backgroundColor: CommonColors.border,
        marginVertical: metrics.margin.tiny,
    },
    fareNetRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fareNetLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(14),
        color: CommonColors.primary,
    },
    fareNetValue: {
        fontFamily: fonts.bold,
        fontSize: RFValue(14),
        color: CommonColors.primary,
    },

    routeMiniCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.medium,
    },
    routeThumb: {
        width: 48,
        height: 48,
        borderRadius: metrics.borderRadius.circular,
        overflow: 'hidden',
        backgroundColor: CommonColors.border,
        flexShrink: 0,
    },
    routeThumbImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    routeMiniLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        marginBottom: 3,
    },
    routeMiniValue: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.primary,
    },

    cashToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        marginBottom: metrics.margin.veryHigh,
    },
    cashToggleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
        flex: 1,
    },
    cashToggleTextBlock: {
        flex: 1,
    },
    cashToggleTitle: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.white,
        marginBottom: 2,
    },
    cashToggleSubtitle: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.65)',
    },
    toggleTrack: {
        width: 44,
        height: 24,
        borderRadius: metrics.borderRadius.circular,
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    toggleTrackOn: {
        backgroundColor: CommonColors.success

    },
    toggleTrackOff: {
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    toggleThumb: {
        width: 18,
        height: 18,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.white,
    },
    toggleThumbOn: {
        alignSelf: 'flex-end'
    },
    toggleThumbOff: {
        alignSelf: 'flex-start'
    },

    actionsBlock: {
        gap: metrics.margin.medium,
    },
    dashboardBtn: {
        alignItems: 'center',
        paddingVertical: metrics.padding.medium,
    },
    dashboardBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(12),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
    },

    bottomSpacer: {
        height: metrics.margin.massive,
    },
});

export default RideCompletedScreen;