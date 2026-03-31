import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../../common/ThemeContest';
import CommonColors from '../../../units/CommonColor';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonHeader from '../../../components/CommonHeader';
import strings from '../../../units/CommonStrings';
import BookingToggle from './components/BookingToggle';
import RecipientForm from './components/RecipientForm';
import ContextBanner from './components/ContextBanner';

const BookForOthersScreen = ({ navigation }) => {
    const [isBookingForOther, setIsBookingForOther] = useState(true);
    const [recipientName, setRecipientName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [tripNote, setTripNote] = useState('');

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const handleContinue = () => {
        console.log('Continue pressed', { recipientName, phoneNumber, tripNote });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            <CommonHeader
                onBackPress={() => navigation?.goBack()}
            />

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={0}
            >
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.heroSection}>
                        <Text style={styles.headlineText}>{strings.bookForOthersHeadline1}</Text>
                        <Text style={styles.headlineText}>{strings.bookForOthersHeadline2}</Text>
                        <Text style={styles.subtitleText}>{strings.bookForOthersSubtitle}</Text>
                    </View>

                    <BookingToggle
                        value={isBookingForOther}
                        onToggle={setIsBookingForOther}
                        styles={styles}
                    />

                    <RecipientForm
                        recipientName={recipientName}
                        onChangeName={setRecipientName}
                        phoneNumber={phoneNumber}
                        onChangePhone={setPhoneNumber}
                        tripNote={tripNote}
                        onChangeTripNote={setTripNote}
                        styles={styles}
                        metrics={metrics}
                    />

                    <ContextBanner styles={styles} />

                    <View style={styles.bottomSpacer} />
                </ScrollView>

                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        style={styles.continueBtn}
                        activeOpacity={0.88}
                        onPress={handleContinue}
                    >
                        <Text style={styles.continueBtnText}>{strings.continueBtn}</Text>
                        <MaterialIcons
                            name="arrow-forward"
                            size={20}
                            color={CommonColors.white}
                        />
                    </TouchableOpacity>
                    <Text style={styles.trackingNote}>{strings.trackingNoteText}</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },
    flex: {
        flex: 1,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.high,
        paddingBottom: metrics.padding.low,
    },

    heroSection: {
        marginTop: metrics.margin.veryHigh,
        marginBottom: metrics.margin.veryHigh,
    },
    headlineText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(40),
        lineHeight: RFValue(46),
        letterSpacing: -0.8,
        color: CommonColors.primary,
    },
    subtitleText: {
        fontFamily: fonts.regular,
        fontSize: RFValue(14),
        color: CommonColors.textSecondary,
        lineHeight: RFValue(22),
        marginTop: metrics.margin.medium,
        maxWidth: 280,
    },
    toggleCard: {
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.veryHigh,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: metrics.margin.veryHigh,
    },
    toggleTextBlock: {
        flex: 1,
        marginRight: metrics.margin.high,
    },
    toggleTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(15),
        color: CommonColors.primary,
        marginBottom: 3,
    },
    toggleSubtitle: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },
    toggleTrack: {
        width: 52,
        height: 30,
        borderRadius: metrics.borderRadius.circular,
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    toggleTrackOn: {
        backgroundColor: CommonColors.primary
    },
    toggleTrackOff: {
        backgroundColor: CommonColors.border
    },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.white,
    },
    toggleThumbOn: {
        alignSelf: 'flex-end'

    },
    toggleThumbOff: {
        alignSelf: 'flex-start'
    },

    formSection: {
        gap: metrics.margin.veryHigh,
        marginBottom: metrics.margin.veryHigh,
    },
    fieldBlock: {
        gap: metrics.margin.low,
    },
    fieldLabel: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(9),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        marginLeft: metrics.margin.tiny,
    },
    inputField: {
        height: 56,
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        paddingHorizontal: metrics.padding.veryHigh,
        fontFamily: fonts.regular,
        fontSize: RFValue(14),
        color: CommonColors.primary,
    },
    phoneRow: {
        flexDirection: 'row',
        gap: metrics.margin.medium,
    },
    phoneCodeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.low,
        height: 56,
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        paddingHorizontal: metrics.padding.medium,
        minWidth: 90,
    },
    flagImage: {
        width: 24,
        height: 16,
        borderRadius: metrics.borderRadius.tiny,
    },
    phoneCodeText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(14),
        color: CommonColors.primary,
    },
    phoneInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        paddingHorizontal: metrics.padding.veryHigh,
        height: 56,
    },
    phoneInput: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: RFValue(14),
        color: CommonColors.primary,
        height: '100%',
    },
    contactIcon: {
        padding: metrics.padding.tiny,
    },
    textAreaField: {
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.veryHigh,
        fontFamily: fonts.regular,
        fontSize: RFValue(14),
        color: CommonColors.primary,
        height: 100,
        textAlignVertical: 'top',
    },

    bannerContainer: {
        borderRadius: metrics.borderRadius.high,
        overflow: 'hidden',
        height: 180,
        marginBottom: metrics.margin.veryHigh,
        position: 'relative',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        opacity: 0.85,
    },
    bannerGradient: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        padding: metrics.padding.high,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    bannerLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(9),
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 3,
    },
    bannerTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(13),
        color: CommonColors.white,
    },

    bottomSpacer: {
        height: metrics.margin.massive,
    },

    bottomBar: {
        paddingHorizontal: metrics.padding.high,
        paddingVertical: metrics.padding.high,
        paddingBottom: metrics.padding.veryHigh,
        backgroundColor: CommonColors.background,
        borderTopWidth: 1,
        borderTopColor: CommonColors.border,
        gap: metrics.margin.medium,
    },
    continueBtn: {
        height: 56,
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.high,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: metrics.margin.low,
        elevation: 4,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
    },
    continueBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.white,
        letterSpacing: 0.2,
    },
    trackingNote: {
        fontFamily: fonts.regular,
        fontSize: RFValue(11),
        color: CommonColors.textLight,
        textAlign: 'center',
    },
});

export default BookForOthersScreen;