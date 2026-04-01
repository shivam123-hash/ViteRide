import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../../common/ThemeContest';
import strings from '../../units/CommonStrings';
import CommonButton from '../../components/CommonBtn';

const ActiveTripScreen = () => {
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaOverlay} pointerEvents="box-none">
                <View style={styles.topCardContainer}>
                    <View style={styles.topCard}>
                        <View style={styles.activeIndicatorRow}>
                            <View style={styles.activeDot} />
                            <Text style={styles.activeTripText}>{strings.activeTripLabel}</Text>
                        </View>
                        <Text style={styles.mainFareText}>{strings.totalFareValue}</Text>
                        <View style={styles.fareBreakdownRow}>
                            <View style={styles.fareColumn}>
                                <Text style={styles.breakdownLabel}>{strings.baseFareLabel}</Text>
                                <Text style={styles.breakdownValue}>{strings.baseFareValue}</Text>
                            </View>
                            <View style={styles.breakdownSpacer} />
                            <View style={styles.fareColumn}>
                                <Text style={styles.breakdownLabel}>{strings.waitFareLabel}</Text>
                                <Text style={styles.breakdownValue}>{strings.waitFareValue}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.bottomSheet}>
                    <View style={styles.handleContainer}>
                        <View style={styles.dragHandle} />
                    </View>
                    <View style={styles.statsRow}>
                        <View style={styles.statsLeftGroup}>
                            <View style={styles.statBlock}>
                                <Text style={styles.statLabel}>{strings.distanceLabelText}</Text>
                                <View style={styles.statValueRow}>
                                    <Text style={styles.statValueBig}>{strings.distanceValueNum}</Text>
                                    <Text style={styles.statValueSmall}>{strings.distanceValueUnit}</Text>
                                </View>
                            </View>
                            <View style={styles.statBlock}>
                                <Text style={styles.statLabel}>{strings.timeLeftLabel}</Text>
                                <View style={styles.statValueRow}>
                                    <Text style={styles.statValueBig}>{strings.timeLeftValueNum}</Text>
                                    <Text style={styles.statValueSmall}>{strings.timeLeftValueUnit}</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.sosButton} activeOpacity={0.8}>
                            <Ionicons name="medical" size={metrics.iconSize.veryHigh} color={colors.white} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.destinationBlock}>
                        <View style={styles.destinationIconWrap}>
                            <Ionicons name="location-sharp" size={metrics.iconSize.medium} color={colors.textPrimary} />
                        </View>
                        <View style={styles.destinationTextWrap}>
                            <Text style={styles.destinationLabel}>{strings.destinationOverline}</Text>
                            <Text style={styles.destinationAddress}>{strings.destinationAddress}</Text>
                        </View>
                    </View>
                    <CommonButton
                        title={strings.btnEndRide}
                        backgroundColor={colors.primary}
                        textColor={colors.white}
                        height={metrics.windowHeight * 0.075}
                        borderRadius={metrics.borderRadius.high}
                        marginTop={metrics.margin.high}
                        elevation={4}
                        textStyle={styles.endRideBtnText}
                        onPress={() => console.log('End Ride Pressed')}
                    />

                </View>

            </SafeAreaView>
        </View>
    );
};

export default ActiveTripScreen;


const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.screenBg,
    },
    mapDummyBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#C8C8C8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dummyMapText: {
        color: colors.textSecondary,
        fontFamily: fonts.bold,
        fontSize: RFValue(14),
        letterSpacing: 2,
    },
    safeAreaOverlay: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topCardContainer: {
        paddingHorizontal: metrics.padding.high,
        paddingTop: metrics.padding.medium,
    },
    topCard: {
        backgroundColor: colors.primary,
        borderRadius: metrics.borderRadius.extraHigh,
        paddingVertical: metrics.padding.extraHigh,
        paddingHorizontal: metrics.padding.high,
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 8,
    },
    activeIndicatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: metrics.margin.low,
    },
    activeDot: {
        width: metrics.margin.low,
        height: metrics.margin.low,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.success,
        marginRight: metrics.margin.tiny,
    },
    activeTripText: {
        fontSize: RFValue(8),
        fontFamily: fonts.bold,
        color: colors.textLight,
        letterSpacing: 1.5,
    },
    mainFareText: {
        fontSize: RFValue(30),
        fontFamily: fonts.bold,
        color: colors.white,
        marginBottom: metrics.margin.high,
        letterSpacing: -1,
    },
    fareBreakdownRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fareColumn: {
        alignItems: 'center',
    },
    breakdownSpacer: {
        width: metrics.windowWidth * 0.15,
    },
    breakdownLabel: {
        fontSize: RFValue(7),
        fontFamily: fonts.semiBold,
        color: colors.textLight,
        letterSpacing: 1,
        marginBottom: metrics.margin.tiny,
    },
    breakdownValue: {
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: colors.white,
    },
    bottomSheet: {
        backgroundColor: colors.white,
        borderTopLeftRadius: metrics.borderRadius.extraHigh,
        borderTopRightRadius: metrics.borderRadius.extraHigh,
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 15,
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: metrics.padding.high,
    },
    dragHandle: {
        width: metrics.windowWidth * 0.12,
        height: metrics.margin.tiny,
        backgroundColor: colors.border,
        borderRadius: metrics.borderRadius.circular,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.margin.extraHigh,
    },
    statsLeftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statBlock: {
        marginRight: metrics.margin.extraHigh,
    },
    statLabel: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: metrics.margin.tiny,
    },
    statValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    statValueBig: {
        fontSize: RFValue(24),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginRight: metrics.margin.tiny,
    },
    statValueSmall: {
        fontSize: RFValue(10),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
    },
    sosButton: {
        width: metrics.windowWidth * 0.16,
        height: metrics.windowWidth * 0.16,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: '#C62828',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#C62828',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    destinationBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.chipInactive,
        padding: metrics.padding.high,
        borderRadius: metrics.borderRadius.medium,
        marginBottom: metrics.margin.medium,
    },
    destinationIconWrap: {
        marginRight: metrics.margin.medium,
    },
    destinationTextWrap: {
        flex: 1,
    },
    destinationLabel: {
        fontSize: RFValue(10),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: metrics.margin.tiny,
    },
    destinationAddress: {
        fontSize: RFValue(10),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        lineHeight: RFValue(18),
    },
    endRideBtnText: {
        fontFamily: fonts.bold,
        letterSpacing: 0.5,
        fontSize: RFValue(15),
    },
});