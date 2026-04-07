import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../../../common/ThemeContest';
import strings from '../../../../units/CommonStrings';
import CommonButton from '../../../../components/CommonBtn';

const DriverOfflineBottomPanel = ({ onPress, loading }) => {

    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    return (
        <View style={styles.container}>
            <View style={styles.statsCard}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{strings.todaysActivity}</Text>
                    <Ionicons name="trending-up" size={metrics.iconSize.medium} color={colors.textLight} />
                </View>
                <View style={styles.statsRow}>
                    <View style={styles.statColumn}>
                        <Text style={styles.statLabel}>{strings.earningsLabel}</Text>
                        <Text style={styles.statValue}>{strings.dummyEarningsOffline}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statColumn}>
                        <Text style={styles.statLabel}>{strings.tripsLabel}</Text>
                        <Text style={styles.statValue}>0</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statColumn}>
                        <Text style={styles.statLabel}>{strings.ratingLabel}</Text>
                        <Text style={styles.statValue}>{strings.dummyRatingOffline}</Text>
                    </View>
                </View>
            </View>
            <CommonButton
                title={loading ? 'Updating...' : strings.goOnlineBtn}
                backgroundColor={colors.primary}
                textColor={colors.white}
                height={metrics.windowHeight * 0.075}
                borderRadius={metrics.borderRadius.high * 1.3}
                marginTop={metrics.margin.none}
                elevation={6}
                containerStyle={styles.btnContainer}
                textStyle={styles.btnText}
                leftComponent={<View style={styles.btnDot} />}
                onPress={() => onPress()}
            />
            <View style={styles.offlinePill}>
                <Text style={styles.offlinePillText}>{strings.currentlyOfflineText}</Text>
            </View>

        </View>
    );
};

export default DriverOfflineBottomPanel;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
    },
    statsCard: {
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.veryHigh,
        marginBottom: metrics.margin.veryHigh,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.margin.high,
    },
    cardTitle: {
        fontSize: RFValue(10),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 0.5,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statColumn: {
        flex: 1,
    },
    divider: {
        width: 1,
        height: metrics.windowHeight * 0.04,
        backgroundColor: colors.border,
        marginHorizontal: metrics.margin.low,
    },
    statLabel: {
        fontSize: RFValue(9),
        fontFamily: fonts.semiBold,
        color: colors.textLight,
        marginBottom: metrics.margin.tiny,
        letterSpacing: 0.5,
    },
    statValue: {
        fontSize: RFValue(14),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    btnContainer: {
        marginBottom: metrics.margin.high,
    },
    btnText: {
        fontFamily: fonts.bold,
        letterSpacing: 1,
        fontSize: RFValue(14),
    },
    btnDot: {
        width: metrics.margin.low,
        height: metrics.margin.low,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.white,
        marginRight: metrics.margin.medium,
    },
    offlinePill: {
        alignSelf: 'center',
        backgroundColor: colors.chipInactive,
        paddingVertical: metrics.padding.low,
        paddingHorizontal: metrics.padding.high,
        borderRadius: metrics.borderRadius.circular,
    },
    offlinePillText: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
    },
});