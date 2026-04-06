import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    Alert,
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
import { verifyOtp, resetAuthError } from '../../../../redux/features/auth/AuthSlice';

const OtpScreen = () => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const [otp, setOtp] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const { loading, otpPhone } = useSelector((state) => state.auth);

    const phone = route?.params?.phone || otpPhone || '';

    const handleVerifyOtp = async () => {
        const trimmedOtp = otp?.trim();

        // if (!phone) {
        //     Alert.alert('Error', 'Phone number not found. Please go back and try again.');
        //     return;
        // }

        // if (!trimmedOtp || trimmedOtp.length < 6) {
        //     Alert.alert('Invalid OTP', 'Please enter a valid OTP.');
        //     return;
        // }

        try {
            dispatch(resetAuthError());

            console.log('Dispatching verifyOtp with:', { phone, otp: trimmedOtp });
console.log("HBKJBKJB");
            const response = await dispatch(
                verifyOtp({
                    phone,
                    otp: trimmedOtp,
                    // agar backend "code" key maangta hai to niche wali line use karna:
                    // code: trimmedOtp,
                })
            ).unwrap();

            console.log('OTP verification successful:', response);

            Alert.alert(
                'Success',
                response?.message || 'OTP verified successfully'
            );

            // Agar tumhara root navigator auth state ke base par switch hota hai,
            // to yahan extra navigation ki zarurat nahi hogi.
            // Agar manual navigation chahiye to apni main route yahan replace kar do.

            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'MainApp' }],
            // });
        } catch (error) {
            console.error('OTP verification failed:', error);
            Alert.alert(
                'Verification Failed',
                typeof error === 'string' ? error : 'Invalid OTP. Please try again.'
            );
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
    });