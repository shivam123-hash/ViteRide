import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../../common/ThemeContest';
import strings from '../../../units/CommonStrings';
import CommonButton from '../../../components/CommonBtn';
import { useNavigation } from '@react-navigation/native';

const NavigatingToPickupScreen = () => {
    
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);
    const [hasArrived, setHasArrived] = useState(false);
    const navigation = useNavigation()

    const handleArrivedPress = () => {
        setHasArrived(true);
    };

    const handleEnterCodePress = () => {
        navigation.navigate("OtpScreen")
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaOverlay} pointerEvents="box-none">
                <View style={styles.topNavContainer}>
                    <View style={styles.topNavCard}>
                        <View style={styles.directionIconBox}>
                            <Ionicons name="navigate" size={metrics.iconSize.medium} color={colors.white} style={styles.iconRotate} />
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.headingText}>{strings.headingDirection}</Text>
                            <Text style={styles.addressText}>{strings.pickupAddress}</Text>
                        </View>
                    </View>
                    <View style={styles.statusPill}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>{strings.navigatingStatus}</Text>
                    </View>
                </View>
                <View style={styles.bottomCard}>
                    <View style={styles.topInfoRow}>
                        <View style={styles.etaContainer}>
                            <Text style={styles.etaTimeText}>{strings.etaTime}</Text>
                            <Text style={styles.etaDistanceText}>{strings.etaDistance}</Text>
                        </View>

                        <View style={styles.passengerPill}>
                            <View style={styles.avatarPlaceholder}>
                                <Ionicons name="person" size={metrics.iconSize.medium} color={colors.white} />
                            </View>
                            <View style={styles.passengerDetails}>
                                <Text style={styles.passengerName}>{strings.passengerName}</Text>
                                <Text style={styles.passengerRating}>{strings.passengerRating.replace(' Rating', ' ★')}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.vehicleInfoRow}>
                        <View style={styles.vehicleCol}>
                            <Text style={styles.vehicleTextBold}>ViteRide</Text>
                            <Text style={styles.vehicleTextBold}>Onyx</Text>
                        </View>
                        <View style={styles.vehicleCol}>
                            <Text style={styles.vehicleTextRegular}>Toyota Camry</Text>
                            <Text style={styles.vehicleTextRegular}>(6YZA23)</Text>
                        </View>
                    </View>
                    <View style={styles.actionRow}>
                        {!hasArrived ? (
                            <>
                                <CommonButton
                                    title={strings.btnCallUser}
                                    backgroundColor={colors.chipInactive}
                                    textColor={colors.textPrimary}
                                    height={metrics.windowHeight * 0.07}
                                    borderRadius={metrics.borderRadius.high}
                                    elevation={0}
                                    containerStyle={styles.halfBtnLeft}
                                    textStyle={styles.btnText}
                                    leftComponent={
                                        <Ionicons name="call" size={metrics.iconSize.medium} color={colors.textPrimary} style={styles.btnIcon} />
                                    }
                                    onPress={() => console.log('Calling User')}
                                />
                                <CommonButton
                                    title={strings.btnArrived}
                                    backgroundColor={colors.primary}
                                    textColor={colors.white}
                                    height={metrics.windowHeight * 0.07}
                                    borderRadius={metrics.borderRadius.high}
                                    elevation={4}
                                    containerStyle={styles.halfBtnRight}
                                    textStyle={styles.btnText}
                                    onPress={handleArrivedPress}
                                />
                            </>
                        ) : (
                            <CommonButton
                                title={strings.btnEnterCode}
                                backgroundColor={colors.primary}
                                textColor={colors.white}
                                height={metrics.windowHeight * 0.07}
                                borderRadius={metrics.borderRadius.high}
                                elevation={4}
                                containerStyle={styles.fullBtn}
                                textStyle={styles.btnText}
                                onPress={handleEnterCodePress}
                            />
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default NavigatingToPickupScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.screenBg,
    },
    mapDummyBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#EAEAEA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dummyMapText: {
        color: colors.textLight,
        fontFamily: fonts.bold,
        fontSize: RFValue(14),
        letterSpacing: 2,
    },
    dummyRouteLine: {
        position: 'absolute',
        width: 4,
        height: '40%',
        backgroundColor: colors.primary,
        left: '45%',
        bottom: '30%',
    },
    safeAreaOverlay: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topNavContainer: {
        alignItems: 'center',
        paddingHorizontal: metrics.padding.high,
        marginTop: metrics.margin.low,
        zIndex: 10,
    },
    topNavCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '100%',
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 6,
    },
    directionIconBox: {
        backgroundColor: colors.primary,
        width: metrics.windowWidth * 0.1,
        height: metrics.windowWidth * 0.1,
        borderRadius: metrics.borderRadius.low,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.medium,
    },
    iconRotate: {
        transform: [{ rotate: '45deg' }],
    },
    addressContainer: {
        flex: 1,
    },
    headingText: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: metrics.margin.tiny,
    },
    addressText: {
        fontSize: RFValue(14),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.textSecondary,
        paddingVertical: metrics.padding.tiny,
        paddingHorizontal: metrics.padding.medium,
        borderRadius: metrics.borderRadius.circular,
        marginTop: metrics.margin.medium,
        zIndex: 11,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.white,
        marginRight: metrics.margin.tiny,
    },
    statusText: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.white,
        letterSpacing: 0.5,
    },
    mapControlsContainer: {
        position: 'absolute',
        right: metrics.margin.high,
        top: metrics.windowHeight * 0.45,
        alignItems: 'center',
    },
    zoomControls: {
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.high,
        marginBottom: metrics.margin.medium,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
    },
    controlBtn: {
        width: metrics.windowWidth * 0.11,
        height: metrics.windowWidth * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlDivider: {
        height: 1,
        backgroundColor: colors.border,
        marginHorizontal: metrics.margin.low,
    },
    navigateBtn: {
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.circular,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
    },
    bottomCard: {
        backgroundColor: colors.white,
        marginHorizontal: metrics.margin.high,
        marginBottom: metrics.margin.extraHigh,
        borderRadius: metrics.borderRadius.extraHigh,
        padding: metrics.padding.veryHigh,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
    },
    topInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.margin.high,
    },
    etaContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    etaTimeText: {
        fontSize: RFValue(28),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginRight: metrics.margin.low,
    },
    etaDistanceText: {
        fontSize: RFValue(14),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
    },
    passengerPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.chipInactive,
        paddingVertical: metrics.padding.tiny,
        paddingHorizontal: metrics.padding.low,
        paddingRight: metrics.padding.high,
        borderRadius: metrics.borderRadius.circular,
    },
    avatarPlaceholder: {
        width: metrics.windowWidth * 0.09,
        height: metrics.windowWidth * 0.09,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.textLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.low,
    },
    passengerDetails: {
        justifyContent: 'center',
    },
    passengerName: {
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    passengerRating: {
        fontSize: RFValue(10),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
    },

    vehicleInfoRow: {
        flexDirection: 'row',
        marginBottom: metrics.margin.extraHigh,
    },
    vehicleCol: {
        marginRight: metrics.margin.veryHigh,
    },
    vehicleTextBold: {
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        lineHeight: RFValue(18),
    },
    vehicleTextRegular: {
        fontSize: RFValue(12),
        fontFamily: fonts.regular,
        color: colors.textSecondary,
        lineHeight: RFValue(18),
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    halfBtnLeft: {
        flex: 1,
        marginRight: metrics.margin.low,
    },
    halfBtnRight: {
        flex: 1,
        marginLeft: metrics.margin.low,
    },
    fullBtn: {
        flex: 1,
        width: '100%',
    },
    btnText: {
        fontFamily: fonts.bold,
        letterSpacing: 0.5,
        fontSize: RFValue(13),
    },
    btnIcon: {
        marginRight: metrics.margin.low,
    },
});