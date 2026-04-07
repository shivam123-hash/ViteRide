import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';
import GlobalMetrics from '../../../../units/GlobalMetricsStyles';
import { useTheme } from '../../../../common/ThemeContest';

const RideHistoryCard = ({ item }) => {
    const { fonts } = useTheme();
    const styles = useMemo(() => createStyles(fonts), [fonts]);

    const isCompleted = item.status?.toLowerCase() === 'completed';
    const statusColor = isCompleted ? CommonColors.success : CommonColors.danger;
    const statusBg = isCompleted ? '#E8F5E9' : '#FFEBEE';

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown Date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
                <Text style={styles.dateText}>{formatDate(item.createdAt || item.date)}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>
                        {item.status?.toUpperCase() || 'UNKNOWN'}
                    </Text>
                </View>
            </View>
            <View style={styles.timelineContainer}>
                <View style={styles.timelineGraphic}>
                    <View style={styles.dotOrigin} />
                    <View style={styles.line} />
                    <View style={styles.dotDestination} />
                </View>
                <View style={styles.locationsContainer}>
                    <View style={styles.locationBlock}>
                        <Text style={styles.locationLabel}>{strings.pickupLabel}</Text>
                        <Text style={styles.locationValue} numberOfLines={1}>
                            {item.pickupLocation?.address || 'Pickup Location'}
                        </Text>
                    </View>
                    <View style={[styles.locationBlock, { marginTop: GlobalMetrics.margin.high }]}>
                        <Text style={styles.locationLabel}>{strings.dropoffLabel}</Text>
                        <Text style={styles.locationValue} numberOfLines={1}>
                            {item.dropoffLocation?.address || 'Drop-off Location'}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardFooter}>
                <View style={styles.driverInfo}>
                    <Ionicons name="car-sport" size={16} color={CommonColors.textLight} />
                    <Text style={styles.driverText}>
                        {item.driver?.name || 'ViteRide Concierge'}
                    </Text>
                </View>
                <Text style={styles.amountText}>
                    {strings.currencySymbol || '₹'}{item.fare || item.amount || '0.00'}
                </Text>
            </View>
        </View>
    );
};

export default RideHistoryCard;

const createStyles = (fonts) => StyleSheet.create({
    cardContainer: {
        backgroundColor: CommonColors.card,
        borderRadius: GlobalMetrics.borderRadius.high,
        padding: GlobalMetrics.padding.high,
        marginBottom: GlobalMetrics.margin.veryHigh,
        shadowColor: CommonColors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: GlobalMetrics.margin.high,
        borderBottomWidth: 1,
        borderBottomColor: CommonColors.border,
        paddingBottom: GlobalMetrics.padding.low,
    },
    dateText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.textPrimary,
    },
    statusBadge: {
        paddingHorizontal: GlobalMetrics.padding.medium,
        paddingVertical: GlobalMetrics.padding.tiny,
        borderRadius: GlobalMetrics.borderRadius.tiny,
    },
    statusText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(10),
        letterSpacing: 0.5,
    },
    timelineContainer: {
        flexDirection: 'row',
        marginBottom: GlobalMetrics.margin.high,
    },
    timelineGraphic: {
        alignItems: 'center',
        marginRight: GlobalMetrics.margin.medium,
        paddingTop: 5,
    },
    dotOrigin: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: CommonColors.textPrimary,
    },
    line: {
        width: 1,
        height: 35,
        backgroundColor: CommonColors.border,
        marginVertical: 4,
    },
    dotDestination: {
        width: 10,
        height: 10,
        borderRadius: 0,
        backgroundColor: CommonColors.secondary,
    },
    locationsContainer: {
        flex: 1,
    },
    locationBlock: {
        justifyContent: 'center',
    },
    locationLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(9),
        color: CommonColors.textLight,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 2,
    },
    locationValue: {
        fontFamily: fonts.medium,
        fontSize: RFValue(13),
        color: CommonColors.textPrimary,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: GlobalMetrics.padding.medium,
        borderTopWidth: 1,
        borderTopColor: CommonColors.border,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverText: {
        fontFamily: fonts.medium,
        fontSize: RFValue(11),
        color: CommonColors.textSecondary,
        marginLeft: GlobalMetrics.margin.tiny,
    },
    amountText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.textPrimary,
    },
});