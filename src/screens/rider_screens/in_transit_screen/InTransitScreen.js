import React, { useMemo } from 'react';
import {
    View,
    Text,
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
import RouteMap from './components/RouteMap';
import FareMeter from './components/FareMeter';
import DriverCard from './components/DriverCard';
import VehicleCard from './components/VehicleCard';
import OtpCard from './components/OtpCard';
import ActionBar from './components/ActionBar';
import CommonHeader from '../../../components/CommonHeader';

const InTransitScreen = ({ navigation }) => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const handleCall = () => console.log('Call driver');
    const handleChat = () => console.log('Chat with driver');
    const handleSOS = () => console.log('SOS triggered');

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.white} />


            <CommonHeader
                title={strings.inTransitHeader}
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

            <View style={styles.mapContainer}>
                <RouteMap />
                <FareMeter styles={styles} />
            </View>

            <View style={styles.bottomSheet}>
                <View style={styles.sheetHandle} />

                <View style={styles.progressHeader}>
                    <View>
                        <Text style={styles.journeyLabel}>{strings.yourJourneyLabel}</Text>
                        <Text style={styles.arrivingTitle}>{strings.arrivingInTitle}</Text>
                    </View>
                    <View style={styles.distanceBlock}>
                        <Text style={styles.distanceValue}>{strings.remainingDistance}</Text>
                        <Text style={styles.distanceLabel}>{strings.remainingLabel}</Text>
                    </View>
                </View>

                {/* column layout — driver, vehicle, otp stacked */}
                <View style={styles.detailsGrid}>
                    <DriverCard styles={styles} metrics={metrics} />
                    <VehicleCard styles={styles} metrics={metrics} />
                    <OtpCard styles={styles} metrics={metrics} />
                </View>

                <ActionBar
                    styles={styles}
                    metrics={metrics}
                    onCall={handleCall}
                    onChat={handleChat}
                    onSOS={handleSOS}
                />

                <View style={styles.safetyFooter}>
                    <MaterialIcons name="verified-user" size={12} color={CommonColors.textLight} />
                    <Text style={styles.safetyFooterText}>{strings.safetyFooterText}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: metrics.padding.high,
        paddingVertical: metrics.padding.medium,
        backgroundColor: CommonColors.white,
        borderBottomWidth: 1,
        borderBottomColor: CommonColors.border,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.low,
    },
    headerTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        letterSpacing: -0.3,
        color: CommonColors.primary,
    },
    moreBtn: {
        width: 36,
        height: 36,
        borderRadius: metrics.borderRadius.circular,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    fareMeterContainer: {
        position: 'absolute',
        top: metrics.margin.high,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 20,
    },
    fareMeter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
        backgroundColor: CommonColors.primary,
        paddingHorizontal: metrics.padding.veryHigh,
        paddingVertical: metrics.padding.medium,
        borderRadius: metrics.borderRadius.circular,
        elevation: 8,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },
    fareMeterLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.6)',
    },
    fareMeterValue: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        letterSpacing: -0.5,
        color: CommonColors.white,
    },
    bottomSheet: {
        backgroundColor: CommonColors.white,
        borderTopLeftRadius: metrics.borderRadius.extraHigh,
        borderTopRightRadius: metrics.borderRadius.extraHigh,
        paddingHorizontal: metrics.padding.veryHigh,
        paddingTop: metrics.padding.medium,
        paddingBottom: metrics.padding.veryHigh,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.06,
        shadowRadius: 30,
        elevation: 20,
    },
    sheetHandle: {
        width: 40,
        height: 4,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.border,
        alignSelf: 'center',
        marginBottom: metrics.margin.high,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: metrics.margin.high,
    },
    journeyLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
        marginBottom: 4,
    },
    arrivingTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        letterSpacing: -0.6,
        color: CommonColors.primary,
    },
    distanceBlock: {
        alignItems: 'flex-end',
    },
    distanceValue: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(17),
        color: CommonColors.primary,
    },
    distanceLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(9),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        marginTop: 2,
    },
    detailsGrid: {
        flexDirection: 'column',
        gap: metrics.margin.low,
        marginBottom: metrics.margin.high,
    },
    detailCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.medium,
    },
    detailCardIconBox: {
        width: 48,
        height: 48,
        borderRadius: metrics.borderRadius.medium,
        backgroundColor: CommonColors.white,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    detailCardSubLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(9),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        marginBottom: 3,
    },
    detailCardTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(14),
        letterSpacing: -0.3,
        color: CommonColors.primary,
    },
    detailCardRight: {
        flex: 1,
    },
    driverAvatarWrapper: {
        position: 'relative',
        flexShrink: 0,
    },
    driverAvatar: {
        width: 48,
        height: 48,
        borderRadius: metrics.borderRadius.medium,
    },
    driverRatingBadge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: CommonColors.white,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: metrics.borderRadius.low,
        borderWidth: 1,
        borderColor: CommonColors.border,
    },
    driverRatingText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(9),
        color: CommonColors.primary,
    },
    otpCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.medium,
        paddingHorizontal: metrics.padding.high,
    },
    otpLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
    },
    otpIconBox: {
        width: 48,
        height: 48,
        borderRadius: metrics.borderRadius.medium,
        backgroundColor: 'rgba(255,255,255,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    otpSubLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(9),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.55)',
        marginBottom: 3,
    },
    otpTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(14),
        color: CommonColors.white,
        letterSpacing: -0.2,
    },
    otpDigits: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.low,
    },
    otpDigit: {
        width: 36,
        height: 40,
        borderRadius: metrics.borderRadius.medium,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpDigitText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        color: CommonColors.white,
        letterSpacing: -0.3,
    },
    actionBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
        marginBottom: metrics.margin.high,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: metrics.margin.low,
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.high,
        paddingVertical: metrics.padding.high,
    },
    actionBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(15),
        color: CommonColors.white,
    },
    sosBtn: {
        width: 56,
        height: 56,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    sosInner: {
        width: 40,
        height: 40,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: 'rgba(244,67,54,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safetyFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        marginTop: metrics.margin.low,
    },
    safetyFooterText: {
        fontFamily: fonts.regular,
        fontSize: RFValue(9),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
    },
});

export default InTransitScreen;