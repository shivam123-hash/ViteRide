import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../../../common/ThemeContest';
import strings from '../../../../units/CommonStrings';
import CommonButton from '../../../../components/CommonBtn';

const DriverOnlineBottomOverlay = ({ onPress, loading }) => {
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    return (
        <View style={styles.container}>
            <View style={styles.statsCard}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{strings.todaysStats}</Text>
                    <Text style={styles.dateText}>{strings.dummyDate}</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statColumn}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="car" size={metrics.iconSize.low} color={colors.textSecondary} />
                        </View>
                        <Text style={styles.statLabel}>{strings.tripsLabel}</Text>
                        <Text style={styles.statValue}>{strings.dummyTripsOnline}</Text>
                    </View>

                    <View style={styles.statColumn}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="cash" size={metrics.iconSize.low} color={colors.textSecondary} />
                        </View>
                        <Text style={styles.statLabel}>{strings.earningsLabel}</Text>
                        <Text style={styles.statValue}>{strings.dummyEarningsOnline}</Text>
                    </View>

                    <View style={styles.statColumn}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="time" size={metrics.iconSize.low} color={colors.textSecondary} />
                        </View>
                        <Text style={styles.statLabel}>{strings.onlineHoursLabel}</Text>
                        <Text style={styles.statValue}>{strings.dummyHoursOnline}</Text>
                    </View>
                </View>
                <CommonButton
                    title={loading ? 'Updating...' : strings.goOfflineBtn}
                    backgroundColor={colors.primary}
                    textColor={colors.white}
                    height={metrics.windowHeight * 0.065}
                    borderRadius={metrics.borderRadius.high * 1.3}
                    marginTop={metrics.margin.none}
                    elevation={0}
                    textStyle={styles.btnText}
                    rightComponent={
                        <Ionicons name="power" size={metrics.iconSize.medium} color={colors.white} style={styles.powerIcon} />
                    }
                    onPress={() => onPress()}
                />
            </View>

        </View>
    );
};

export default DriverOnlineBottomOverlay;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        paddingHorizontal: metrics.padding.high,
        paddingBottom: metrics.padding.massive,
        alignItems: 'center',
    },
    preferredZoneBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingVertical: metrics.padding.medium,
        paddingHorizontal: metrics.padding.high,
        borderRadius: metrics.borderRadius.circular,
        marginBottom: metrics.margin.high,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    zoneIcon: {
        marginRight: metrics.margin.tiny,
    },
    preferredZoneText: {
        color: colors.white,
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        letterSpacing: 1,
    },
    statsCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.extraHigh,
        padding: metrics.padding.veryHigh,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: metrics.margin.veryHigh,
    },
    cardTitle: {
        fontSize: RFValue(18),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    dateText: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: metrics.margin.extraHigh,
    },
    statColumn: {
        alignItems: 'center',
        flex: 1,
    },
    iconCircle: {
        width: metrics.windowWidth * 0.1,
        height: metrics.windowWidth * 0.1,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.chipInactive,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: metrics.margin.low,
    },
    statLabel: {
        fontSize: RFValue(9),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
        marginBottom: metrics.margin.tiny,
    },
    statValue: {
        fontSize: RFValue(14),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    btnText: {
        fontFamily: fonts.bold,
        letterSpacing: 1,
        fontSize: RFValue(12),
    },
    powerIcon: {
        marginLeft: metrics.margin.low,
    }
});