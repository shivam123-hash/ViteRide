import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../../common/ThemeContest';
import CommonColors from '../../../units/CommonColor';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonHeader from '../../../components/CommonHeader';
import strings from '../../../units/CommonStrings';
import PulseAnimation from './components/PulseAnimation';
import CarMarkers from './components/CarMarkers';
import ProgressBar from './components/ProgressBar';
import CountdownTimer from './components/CountDownTimer';
import InfoChip from './components/InfoChip';

const { width, height } = Dimensions.get('window');

const INITIAL_SECONDS = 165;

const FindingRideScreen = ({ navigation }) => {
    const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearInterval(timer);
    }, [secondsLeft]);

    const progress = 1 - secondsLeft / INITIAL_SECONDS;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <CommonHeader
                title={strings.findingRideHeader}
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
                <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYLE4kUuE7CeqCeM-Yi9kZ-un_AXQVsA6QQbQtediSlJKsfx-aeRL4w_aNg23unG7vwF8OTL9XLho-VCju0vajgpS7RLw-Hs3yTNMwYDht-RMsxzsjaKmSQoi7N-liRk2Mxepgc85fcj158KlgekC7_VQpaQ72EtDPLMjXm5uNF24kufKVvw365VvkDsBq_-9KQTkeqcAyJk-5tAEThtn4QFBgS3fvsE1hclInAEVOtbh6njt96ZQ6SMScJtBihKvX6NkrzXvq5Hvo' }}
                    style={styles.mapImage}
                    resizeMode="cover"
                />
                <View style={styles.mapOverlay} />

                <CarMarkers />

                <View style={styles.pulseWrapper}>
                    <PulseAnimation />
                </View>
            </View>

            <View style={styles.bottomCard}>
                <ProgressBar progress={progress} styles={styles} />

                <View style={styles.titleBlock}>
                    <Text style={styles.title}>{strings.findingDriverTitle}</Text>
                    <Text style={styles.subtitle}>{strings.estimatedConnectionTime}</Text>
                </View>

                <CountdownTimer secondsLeft={secondsLeft} styles={styles} />

                <View style={styles.chipRow}>
                    <InfoChip
                        icon="payments"
                        label={strings.paymentLabel}
                        value={strings.paymentValue}
                        styles={styles}
                        metrics={metrics}
                    />
                    <InfoChip
                        icon="verified"
                        label={strings.serviceLabel}
                        value={strings.serviceValue}
                        styles={styles}
                        metrics={metrics}
                    />
                </View>

                <TouchableOpacity
                    style={styles.cancelBtn}
                    activeOpacity={0.88}
                    onPress={() => navigation?.goBack()}
                >
                    <Text style={styles.cancelBtnText}>{strings.cancelRequest}</Text>
                </TouchableOpacity>

                <Text style={styles.refundNote}>{strings.cancelRefundNote}</Text>
            </View>
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
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.chipInactive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        opacity: 0.4,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(245,245,245,0.2)',
    },
    pulseWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomCard: {
        backgroundColor: CommonColors.white,
        borderTopLeftRadius: metrics.borderRadius.extraHigh,
        borderTopRightRadius: metrics.borderRadius.extraHigh,
        paddingHorizontal: metrics.padding.veryHigh,
        paddingTop: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.06,
        shadowRadius: 30,
        elevation: 20,
        alignItems: 'center',
        gap: metrics.margin.high,
    },
    progressTrack: {
        width: '100%',
        height: 4,
        backgroundColor: CommonColors.chipInactive,
        borderRadius: metrics.borderRadius.circular,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.circular,
    },
    titleBlock: {
        alignItems: 'center',
        gap: 4,
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: RFValue(22),
        letterSpacing: -0.4,
        color: CommonColors.primary,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        textAlign: 'center',
    },
    timerBox: {
        backgroundColor: CommonColors.screenBg,
        paddingHorizontal: metrics.padding.massive,
        paddingVertical: metrics.padding.high,
        borderRadius: metrics.borderRadius.high,
        alignItems: 'center',
    },
    timerText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(44),
        letterSpacing: -1.5,
        color: CommonColors.primary,
    },
    chipRow: {
        flexDirection: 'row',
        gap: metrics.margin.medium,
        width: '100%',
    },
    chip: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.medium,
    },
    chipTextBlock: {
        flex: 1,
    },
    chipLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(9),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        marginBottom: 2,
    },
    chipValue: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(13),
        color: CommonColors.primary,
    },
    cancelBtn: {
        width: '100%',
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.extraHigh,
        paddingVertical: metrics.padding.veryHigh,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
    },
    cancelBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.white,
        letterSpacing: 0.2,
    },
    refundNote: {
        fontFamily: fonts.regular,
        fontSize: RFValue(11),
        color: CommonColors.textLight,
        textAlign: 'center',
        paddingHorizontal: metrics.padding.high,
        lineHeight: RFValue(16),
    },
});

export default FindingRideScreen;