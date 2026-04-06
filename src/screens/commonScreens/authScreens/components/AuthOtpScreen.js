import React, { useMemo, useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import CommonHeader from '../../../../components/CommonHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../common/ThemeContest';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonButton from '../../../../components/CommonBtn';
import Ionicons from '@react-native-vector-icons/ionicons';
import OtpInput from '../../../../components/OtpInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, resetAuthError, login, register } from '../../../../redux/features/auth/AuthSlice';
import { showMessage } from '../../../../redux/features/messageSlice/messageSlice';

const OtpScreen = () => {

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(30);

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const { loading, otpPhone } = useSelector((state) => state.auth);

    const phone = route?.params?.phone || otpPhone || '';
    const context = route?.params?.context || 'login';
    const registerData = route?.params?.registerData || null;

    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerifyOtp = async () => {
        const trimmedOtp = otp?.trim();
        if (!phone) {
            dispatch(showMessage({ text: 'Phone number not found. Please go back and try again.', type: 'error' }));
            return;
        }
        if (!trimmedOtp || trimmedOtp.length < 6) {
            dispatch(showMessage({ text: 'Please enter a valid OTP.', type: 'error' }));
            return;
        }
        try {
            dispatch(resetAuthError());
            const response = await dispatch(
                verifyOtp({
                    phone,
                    otp: trimmedOtp,
                })
            ).unwrap();
            dispatch(showMessage({ text: response?.message || 'OTP verified successfully', type: 'success' }));
        } catch (error) {
            dispatch(showMessage({ text: typeof error === 'string' ? error : 'Invalid OTP. Please try again.', type: 'error' }));
        }
    };

    const handleResendOtp = async () => {
        if (timer > 0) return;
        try {
            if (context === 'login') {
                const res = await dispatch(login({ phone })).unwrap();
                dispatch(showMessage({ text: res?.message || 'OTP Resent successfully!', type: 'success' }));
            } else if (context === 'register' && registerData) {
                const res = await dispatch(register(registerData)).unwrap();
                dispatch(showMessage({ text: res?.message || 'OTP Resent successfully!', type: 'success' }));
            }
            setTimer(30);
        } catch (error) {
            dispatch(showMessage({ text: typeof error === 'string' ? error : 'Failed to resend OTP.', type: 'error' }));
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            <CommonHeader
                title={strings.otpScreenHeader}
                onBackPress={() => navigation?.goBack()}
            />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.heroSection}>
                    <Text style={styles.heroHeadline}>{strings.otpScreenTitle}</Text>
                    <Text style={styles.heroSubtitle}>
                        {phone
                            ? `Enter the OTP sent to ${phone}`
                            : strings.otpScreenLabel}
                    </Text>
                </View>

                <OtpInput value={otp} onChange={setOtp} />

                <CommonButton
                    title={loading ? 'Verifying...' : 'Verify OTP'}
                    backgroundColor={CommonColors.primary}
                    textColor={CommonColors.white}
                    height={metrics.windowHeight * 0.075}
                    borderRadius={metrics.borderRadius.high * 1.5}
                    marginTop={metrics.margin.veryHigh}
                    elevation={2}
                    textStyle={styles.btnTextStyle}
                    rightComponent={
                        <Ionicons
                            name="chevron-forward"
                            size={metrics.iconSize.regular}
                            color={CommonColors.white}
                            style={styles.btnIcon}
                        />
                    }
                    onPress={handleVerifyOtp}
                />

                {/* RESEND OTP SECTION */}
                <View style={styles.resendContainer}>
                    {timer > 0 ? (
                        <Text style={styles.resendTextWait}>
                            Didn't receive code? Resend in <Text style={styles.timerText}>{timer}s</Text>
                        </Text>
                    ) : (
                        <TouchableOpacity onPress={handleResendOtp} style={styles.resendButton}>
                            <Text style={styles.resendTextActive}>Didn't receive code? <Text style={styles.resendLink}>Resend OTP</Text></Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OtpScreen;

const createStyles = (fonts, metrics) =>
    StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: CommonColors.screenBg,
        },
        scroll: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: metrics.padding.high,
            paddingTop: metrics.padding.veryHigh,
        },
        heroSection: {
            marginBottom: metrics.margin.veryHigh,
        },
        heroHeadline: {
            fontFamily: fonts.bold,
            fontSize: RFValue(28),
            lineHeight: RFValue(38),
            letterSpacing: -0.8,
            color: CommonColors.primary,
            marginBottom: metrics.margin.medium,
        },
        heroSubtitle: {
            fontFamily: fonts.regular,
            fontSize: RFValue(14),
            lineHeight: RFValue(18),
            color: CommonColors.textSecondary,
        },
        btnTextStyle: {
            fontSize: RFValue(14),
            fontFamily: fonts.semiBold,
        },
        btnIcon: {
            alignSelf: 'center',
            marginLeft: metrics.margin.low,
        },
        resendContainer: {
            marginTop: metrics.margin.extraHigh,
            alignItems: 'center',
            justifyContent: 'center',
        },
        resendTextWait: {
            fontFamily: fonts.medium,
            fontSize: RFValue(12),
            color: CommonColors.textLight,
        },
        timerText: {
            fontFamily: fonts.bold,
            color: CommonColors.textSecondary,
        },
        resendButton: {
            paddingVertical: metrics.padding.low,
            paddingHorizontal: metrics.padding.medium,
        },
        resendTextActive: {
            fontFamily: fonts.medium,
            fontSize: RFValue(12),
            color: CommonColors.textSecondary,
        },
        resendLink: {
            fontFamily: fonts.bold,
            color: CommonColors.primary,
            textDecorationLine: 'underline',
        }
    });