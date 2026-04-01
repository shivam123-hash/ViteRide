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
import CommonHeader from '../../../components/CommonHeader';
import strings from '../../../units/CommonStrings';
import EarningsSummaryCard from './components/EarningsSummaryCard';
import StatsBentoGrid from './components/StatsBentoGrid';
import HourlyChart from './components/HourlyChart';
import RevenueSplit from './components/RevenueSplit';

const EarningsScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(0);

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const handleWithdraw = () => console.log('Withdraw earnings pressed');

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.white} />

            <CommonHeader
                title={strings.earningsHeader}
                onBackPress={() => navigation?.goBack()}
                rightComponent={
                    <TouchableOpacity
                        style={styles.calendarBtn}
                        onPress={() => console.log('Calendar pressed')}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons
                            name="calendar-today"
                            size={metrics.iconSize.high}
                            color={CommonColors.primary}
                        />
                    </TouchableOpacity>
                }
            />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.tabsRow}>
                    {strings.earningsTabs.map((tab, index) => (
                        <TouchableOpacity
                            key={tab}
                            style={styles.tabBtn}
                            onPress={() => setActiveTab(index)}
                            activeOpacity={0.7}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === index && styles.tabTextActive,
                            ]}>
                                {tab}
                            </Text>
                            {activeTab === index && <View style={styles.tabUnderline} />}
                        </TouchableOpacity>
                    ))}
                </View>

                <EarningsSummaryCard styles={styles} metrics={metrics} />

                <StatsBentoGrid styles={styles} metrics={metrics} />

                <HourlyChart styles={styles} metrics={metrics} />

                <RevenueSplit styles={styles} metrics={metrics} />


                <Text style={styles.payoutNote}>{strings.payoutNote}</Text>

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.white,
    },
    calendarBtn: {
        width: metrics.margin.massive,
        height: metrics.margin.massive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.high,
        paddingTop: metrics.padding.high,
        paddingBottom: metrics.padding.massive,
    },

    tabsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: metrics.margin.veryHigh,
        paddingHorizontal: metrics.padding.low,
    },
    tabBtn: {
        alignItems: 'center',
        paddingHorizontal: metrics.padding.low,
        paddingBottom: metrics.padding.low,
        position: 'relative',
    },
    tabText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(13),
        color: CommonColors.textLight,
    },
    tabTextActive: {
        color: CommonColors.primary,
    },
    tabUnderline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.circular,
    },

    summaryCard: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.massive,
        alignItems: 'center',
        marginBottom: metrics.margin.medium,
        borderWidth: 1,
        borderColor: CommonColors.border,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
    },
    summaryLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
        marginBottom: metrics.margin.medium,
    },
    summaryAmount: {
        fontFamily: fonts.bold,
        fontSize: RFValue(24),
        letterSpacing: -1.5,
        lineHeight: RFValue(52),
        color: CommonColors.primary,
    },
    summaryGrowthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.low,
        marginTop: metrics.margin.veryHigh,
    },
    summaryGrowthText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },

    bentoGrid: {
        flexDirection: 'row',
        gap: metrics.margin.medium,
        marginBottom: metrics.margin.medium,
    },
    bentoCard: {
        flex: 1,
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        height: 120,
        justifyContent: 'space-between',
    },
    bentoLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
    },
    bentoValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: metrics.margin.low,
    },
    bentoValue: {
        fontFamily: fonts.bold,
        fontSize: RFValue(28),
        color: CommonColors.primary,
        letterSpacing: -0.5,
    },
    bentoUnit: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },

    chartSection: {
        marginBottom: metrics.margin.medium,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: metrics.margin.medium,
    },
    chartTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        letterSpacing: -0.3,
        color: CommonColors.primary,
    },
    chartPeak: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        color: CommonColors.textLight,
    },
    chartContainer: {
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        height:metrics.windowWidth * 0.5,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: metrics.margin.low,
    },
    bar: {
        flex: 1,
        backgroundColor: CommonColors.primary,
        borderRadius: 4,
    },

    splitSection: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.veryHigh,
        marginBottom: metrics.margin.medium,
        borderWidth: 1,
        borderColor: CommonColors.border,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
    },
    splitHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.margin.high,
    },
    splitTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        letterSpacing: -0.3,
        color: CommonColors.primary,
    },
    splitLegend: {
        flexDirection: 'row',
        gap: metrics.margin.medium,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: metrics.borderRadius.circular,
    },
    legendText: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
    },
    splitBarTrack: {
        height: 14,
        backgroundColor: CommonColors.chipInactive,
        borderRadius: metrics.borderRadius.circular,
        flexDirection: 'row',
        overflow: 'hidden',
        marginBottom: metrics.margin.veryHigh,
    },
    splitBarDigital: {
        height: '100%',
        backgroundColor: CommonColors.primary,
    },
    splitBarCash: {
        height: '100%',
        backgroundColor: CommonColors.border,
    },
    splitValuesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    splitValueBlock: {
        gap: 3,
    },
    splitValueLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
    },
    splitValueAmount: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        letterSpacing: -0.4,
        color: CommonColors.primary,
    },

    withdrawBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: metrics.margin.medium,
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.high,
        paddingVertical: metrics.padding.high,
        marginTop: metrics.margin.high,
        elevation: 4,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
    },
    payoutNote: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        color: CommonColors.textLight,
        textAlign: 'center',
        lineHeight: RFValue(18),
        marginTop: metrics.margin.high,
    },
    bottomSpacer: {
        height: metrics.margin.massive,
    },
});

export default EarningsScreen;