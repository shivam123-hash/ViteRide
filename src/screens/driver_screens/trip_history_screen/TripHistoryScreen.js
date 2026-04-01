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
import FilterChips from './components/FilterChips';
import TripCard from './components/TripCard';
import MonthlySummary from './components/MonthlySummary';

const TripHistoryScreen = ({ navigation }) => {
    const [activeFilter, setActiveFilter] = useState(0);

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const filteredTrips = useMemo(() => {
        if (activeFilter === 0) return strings.tripHistory;
        if (activeFilter === 1) return strings.tripHistory.filter((t) => t.status === 'completed');
        if (activeFilter === 2) return strings.tripHistory.filter((t) => t.status === 'cancelled');
        return strings.tripHistory;
    }, [activeFilter]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            <CommonHeader
                title={strings.tripHistoryHeader}
                onBackPress={() => navigation?.goBack()}
            />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <FilterChips
                    filters={strings.tripHistoryFilters}
                    activeIndex={activeFilter}
                    onSelect={setActiveFilter}
                    styles={styles}
                />

                <View style={styles.tripList}>
                    {filteredTrips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            trip={trip}
                            styles={styles}
                            metrics={metrics}
                        />
                    ))}
                </View>

                <MonthlySummary styles={styles} />
            </ScrollView>
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },
    moreBtn: {
        width: metrics.margin.massive,
        height: metrics.margin.massive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.high,
        paddingTop: metrics.padding.high,
        paddingBottom: metrics.padding.massive,
    },

    filterRow: {
        flexDirection: 'row',
        gap: metrics.margin.low,
        marginBottom: metrics.margin.veryHigh,
    },
    filterChip: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingVertical: metrics.padding.low,
        borderRadius: metrics.borderRadius.circular,
        borderWidth: 1,
        borderColor: CommonColors.border,
        backgroundColor: CommonColors.white,
    },
    filterChipActive: {
        backgroundColor: CommonColors.primary,
        borderColor: CommonColors.primary,
    },
    filterChipText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },
    filterChipTextActive: {
        color: CommonColors.white,
    },

    tripList: {
        gap: metrics.margin.medium,
        marginBottom: metrics.margin.massive,
    },

    tripCard: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        borderWidth: 1,
        borderColor: CommonColors.border,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    tripCardCancelled: {
        opacity: 0.72,
    },
    tripDatetime: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(10),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
        marginBottom: metrics.margin.medium,
    },
    tripRouteWrapper: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: metrics.margin.medium,
    },
    routeLineCol: {
        width: 20,
        alignItems: 'center',
        marginRight: metrics.margin.medium,
    },
    dotFilled: {
        width: 14,
        height: 14,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.primary,
        borderWidth: 3,
        borderColor: CommonColors.white,
        zIndex: 1,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 2,
    },
    dotOutline: {
        width: 14,
        height: 14,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.white,
        borderWidth: 2,
        borderColor: CommonColors.primary,
        zIndex: 1,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 2,
    },
    routeConnector: {
        width: 1,
        flex: 1,
        backgroundColor: CommonColors.border,
        marginVertical: 2,
    },
    routeStopsCol: {
        flex: 1,
        justifyContent: 'space-between',
        gap: metrics.margin.high,
    },
    routeStopBlock: {
        gap: 2,
    },
    routeStopName: {
        fontFamily: fonts.bold,
        fontSize: RFValue(14),
        color: CommonColors.primary,
        letterSpacing: -0.2,
    },
    routeStopLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textLight,
    },
    tripCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: metrics.padding.medium,
        borderTopWidth: 1,
        borderTopColor: CommonColors.border,
    },
    tripAmount: {
        fontFamily: fonts.bold,
        fontSize: RFValue(20),
        letterSpacing: -0.5,
        color: CommonColors.primary,
    },
    tripAmountCancelled: {
        color: CommonColors.textLight,
        textDecorationLine: 'line-through',
    },
    statusBadge: {
        paddingHorizontal: metrics.padding.low,
        paddingVertical: 3,
        borderRadius: metrics.borderRadius.tiny,
    },
    statusBadgeCompleted: {
        backgroundColor: `${CommonColors.success}18`,
    },
    statusBadgeCancelled: {
        backgroundColor: `${CommonColors.danger}12`,
    },
    statusText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(10),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    statusTextCompleted: {
        color: CommonColors.success,
    },
    statusTextCancelled: {
        color: CommonColors.danger,
    },

    monthlySummary: {
        alignItems: 'center',
        paddingTop: metrics.padding.veryHigh,
    },
    monthlyBadgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.low,
        marginBottom: metrics.margin.low,
    },
    monthlyDot: {
        width: 8,
        height: 8,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.success,
    },
    monthlyLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
    },
    monthlyAmount: {
        fontFamily: fonts.bold,
        fontSize: RFValue(34),
        letterSpacing: -1,
        color: CommonColors.primary,
        marginBottom: metrics.margin.tiny,
    },
    monthlyNote: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },
});

export default TripHistoryScreen;