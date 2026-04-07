import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator
} from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux"; // <-- Added Redux hooks
import { useNavigation } from "@react-navigation/native";
import CommonButton from "../../../components/CommonBtn";
import CommonInput from "../../../components/CommonInput";
import strings from "../../../units/CommonStrings";
import { useTheme } from "../../../common/ThemeContest";
import { register } from "../../../redux/features/auth/AuthSlice";
import { showMessage } from "../../../redux/features/messageSlice/messageSlice";

const CreateAccountScreen = () => {
    
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);
    const { loading } = useSelector((state) => state.auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleOtpSend = async () => {
        if (!name.trim()) {
            Alert.alert("Validation Error", "Please enter your name.");
            return;
        }
        if (!phone.trim()) {
            Alert.alert("Validation Error", "Please enter your phone number.");
            return;
        }
        const payload = {
            name: name.trim(),
            phone: `+91${phone.trim()}`,
            email: email.trim() || undefined,
        };
        try {
            const response = await dispatch(register(payload)).unwrap();
            console.log(response, 'response++++++++')
            dispatch(
                showMessage({
                    text: response?.message || "OTP Sent successfully!",
                    type: "success",
                })
            );
            navigation.navigate("OTP", {
                phone: `+91${phone.trim()}`,
                devOtp: response.dev_otp,
                context: "register",
                registerData: payload
            });
        } catch (error) {
            dispatch(showMessage({
                text: typeof error === "string" ? error : "Unable to send OTP.",
                type: "error",
            }))
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <Text style={styles.title}>{strings.createAccountMainTitle}</Text>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.cardContainer}>
                        <View style={styles.profileSection}>
                            <View style={styles.avatarPlaceholder}>
                                <Ionicons name="person" size={metrics.iconSize.veryHigh * 2} color="#D1D5DB" />
                            </View>
                            <CommonButton
                                title={strings.uploadPhotoBtn}
                                backgroundColor={colors.primary}
                                textColor={colors.white}
                                height={metrics.windowHeight * 0.05}
                                width="65%"
                                borderRadius={metrics.borderRadius.high}
                                marginTop={metrics.margin.large}
                                textStyle={styles.uploadBtnText}
                                leftComponent={
                                    <Ionicons name="camera" size={metrics.iconSize.medium} color={colors.white} style={styles.cameraIcon} />
                                }
                                onPress={() => console.log("Upload Photo")}
                            />
                            <Text style={styles.hintText}>{strings.photoHint}</Text>
                        </View>
                        <View style={styles.formSection}>
                            <Text style={styles.label}>{strings.firstNameLabel}</Text>
                            <CommonInput
                                value={name}
                                onChangeText={setName}
                                placeholder={strings.firstNamePlaceholder}
                                placeholderTextColor={colors.textLight}
                                style={styles.customInputStyle}
                                textInput={styles.customTextInput}
                            />
                            <Text style={styles.label}>{strings.emailLabel}</Text>
                            <CommonInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder={strings.emailPlaceholder}
                                placeholderTextColor={colors.textLight}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.customInputStyle}
                                textInput={styles.customTextInput}
                            />
                            <Text style={styles.label}>{strings.phoneLabel}</Text>
                            <CommonInput
                                value={phone}
                                onChangeText={setPhone}
                                placeholder={strings.phonePlaceholder} // e.g., "+919876543210"
                                placeholderTextColor={colors.textLight}
                                keyboardType="phone-pad"
                                style={styles.customInputStyle}
                                textInput={styles.customTextInput}
                            />
                        </View>

                        <CommonButton
                            title={loading ? "Processing..." : strings.btnCreateAccount}
                            backgroundColor={loading ? colors.textLight : colors.primary}
                            textColor={colors.white}
                            height={metrics.windowHeight * 0.075}
                            borderRadius={metrics.borderRadius.high * 1.5}
                            marginTop={metrics.margin.massive}
                            elevation={2}
                            textStyle={styles.btnTextStyle}
                            disabled={loading} // Prevent multiple clicks
                            rightComponent={
                                loading ? (
                                    <ActivityIndicator color={colors.white} style={styles.btnIconRight} />
                                ) : (
                                    <Ionicons name="chevron-forward" size={metrics.iconSize.medium} color={colors.white} style={styles.btnIconRight} />
                                )
                            }
                            onPress={handleOtpSend}
                        />

                        <Text style={styles.loginText}>
                            {strings.alreadyAccount}
                            <Text style={styles.loginLink} onPress={() => navigation.goBack()}>
                                {strings.login}
                            </Text>
                        </Text>
                    </View>
                    <Text style={styles.footerText}>
                        {strings.privacyDisclaimer}
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CreateAccountScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingTop: metrics.padding.large,
        paddingBottom: metrics.padding.massive,
        marginTop: metrics.margin.veryHigh
    },
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.high * 2,
        padding: metrics.padding.veryHigh,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: RFValue(32),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        lineHeight: RFValue(38),
        marginTop: metrics.margin.veryHigh,
        paddingHorizontal: 25
    },
    profileSection: {
        alignItems: "center",
        marginBottom: metrics.margin.extraHigh,
    },
    avatarPlaceholder: {
        width: metrics.windowWidth * 0.3,
        height: metrics.windowWidth * 0.3,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
    },
    cameraIcon: {
        marginRight: metrics.margin.low,
    },
    uploadBtnText: {
        fontSize: RFValue(11),
        fontFamily: fonts.semiBold,
    },
    hintText: {
        fontSize: RFValue(8),
        fontFamily: fonts.bold,
        color: colors.textLight,
        textAlign: "center",
        letterSpacing: 1,
        marginTop: metrics.margin.medium,
        lineHeight: 14,
    },
    formSection: {
        marginTop: metrics.margin.medium,
    },
    label: {
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: metrics.margin.low,
        marginTop: metrics.margin.high,
        textTransform: 'uppercase',
    },
    customInputStyle: {
        backgroundColor: "#F3F4F6",
        borderWidth: 0,
        borderRadius: metrics.borderRadius.medium,
        height: metrics.windowHeight * 0.065,
    },
    customTextInput: {
        fontFamily: fonts.medium,
        fontSize: RFValue(13),
        color: colors.textPrimary,
    },
    btnTextStyle: {
        fontSize: RFValue(13),
        fontFamily: fonts.semiBold,
    },
    btnIconRight: {
        marginLeft: metrics.margin.medium,
    },
    footerText: {
        fontSize: RFValue(9),
        fontFamily: fonts.regular,
        color: colors.textLight,
        textAlign: "center",
        lineHeight: 16,
        marginTop: metrics.margin.extraHigh,
        paddingHorizontal: metrics.padding.medium,
    },
    loginText: {
        fontSize: RFValue(12),
        fontFamily: fonts.medium,
        color: colors.textLight,
        textAlign: "center",
        marginTop: metrics.margin.veryHigh,
    },
    loginLink: {
        color: colors.primary,
        fontFamily: fonts.bold,
    },
});