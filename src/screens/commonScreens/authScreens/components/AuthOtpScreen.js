import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
} from 'react-native';
import CommonHeader from '../../../../components/CommonHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../common/ThemeContest';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonButton from '../../../../components/CommonBtn';
import Ionicons from '@react-native-vector-icons/ionicons';
import OtpInput from '../../../../components/CommonInput';
import { useNavigation } from '@react-navigation/native';

const OtpScreen = () => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);
    const [otp, setOtp] = useState("");
    const navigation = useNavigation();
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
            >
                <View style={styles.heroSection}>
                    <Text style={styles.heroHeadline}>{strings.otpScreenTitle}</Text>
                    <Text style={styles.heroSubtitle}>{strings.otpScreenLabel}</Text>
                </View>

                <OtpInput value={otp} onChange={setOtp} />

                <CommonButton
                    title={strings.btnStartRide}
                    backgroundColor={CommonColors.primary}
                    textColor={CommonColors.white}
                    height={metrics.windowHeight * 0.075}
                    borderRadius={metrics.borderRadius.high * 1.5}
                    marginTop={metrics.margin.veryHigh}
                    elevation={2}
                    textStyle={styles.btnTextStyle}
                    rightComponent={
                        <Ionicons name="chevron-forward" size={metrics.iconSize.regular} color={CommonColors.white} style={styles.btnIcon} />
                    }
                    onPress={() => console.log("Send Code Pressed")}
                />
            </ScrollView>
        </SafeAreaView>
    )
}


export default OtpScreen;


const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.screenBg,
    }, scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.high,
        paddingTop: metrics.padding.veryHigh,
    },
    heroSection: {
        marginBottom: metrics.margin.veryHigh,
    }, heroHeadline: {
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