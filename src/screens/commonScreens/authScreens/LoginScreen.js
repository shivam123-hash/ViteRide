import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CommonButton from "../../../components/CommonBtn";
import CommonInput from "../../../components/CommonInput";
import strings from "../../../units/CommonStrings";
import { useTheme } from "../../../common/ThemeContest";
import { login } from "../../../redux/features/auth/AuthSlice";

const LoginScreen = () => {
  const [phone, setPhone] = useState("");

  const { colors, fonts, metrics } = useTheme();
  const styles = getStyles(colors, fonts, metrics);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const formatPhoneForApi = (value) => {
    const digits = value.replace(/\D/g, "");

    // user input field me sirf 10 digit expected hai
    if (digits.length === 10) {
      return `+91${digits}`;
    }

    return null;
  };

  const handleAuthNavigation = async () => {
    if (loading) return;

    const formattedPhone = formatPhoneForApi(phone);

    if (!formattedPhone) {
      Alert.alert("Invalid Phone", "Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      console.log(formattedPhone, 'formattedPhone++_++__++')
      const response = await dispatch(
        login({ phone: formattedPhone })
      ).unwrap();
      console.log(response, 'response_++_++__++')

      Alert.alert(
        "Success",
        response?.message 
      );

      navigation.navigate('OTP', {
        phone: formattedPhone,
      });
    } catch (error) {
      Alert.alert(
        "Login Failed",
        typeof error === "string" ? error : "Unable to send OTP."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <View style={styles.header}>
          <Text style={styles.appName}>{strings.appName}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{strings.title}</Text>
          <Text style={styles.subtitle}>{strings.subtitle}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>{strings.mobileLabel}</Text>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="flag"
              size={metrics.iconSize.regular}
              color={colors.textPrimary}
            />
            <Text style={styles.countryCode}>{strings.countryCode}</Text>
            <View style={styles.verticalDivider} />

            <CommonInput
              value={phone}
              onChangeText={(text) => setPhone(text.replace(/\D/g, ""))}
              placeholder={strings.phonePlaceholder}
              placeholderTextColor={colors.textLight}
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.overrideInputContainer}
              textInput={styles.overrideTextInput}
            />
          </View>

          <CommonButton
            title={loading ? "Sending..." : strings.btnSendCode}
            backgroundColor={colors.primary}
            textColor={colors.white}
            height={metrics.windowHeight * 0.075}
            borderRadius={metrics.borderRadius.high * 1.5}
            marginTop={metrics.margin.veryHigh}
            elevation={2}
            textStyle={styles.btnTextStyle}
            rightComponent={
              <Ionicons
                name="chevron-forward"
                size={metrics.iconSize.regular}
                color={colors.white}
                style={styles.btnIcon}
              />
            }
            onPress={handleAuthNavigation}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{strings.alternatively}</Text>
            <View style={styles.dividerLine} />
          </View>

          <CommonButton
            title={strings.btnGoogle}
            backgroundColor={colors.white}
            textColor={colors.textPrimary}
            height={metrics.windowHeight * 0.065}
            borderRadius={metrics.borderRadius.high * 1.3}
            marginTop={metrics.margin.none}
            elevation={0}
            containerStyle={styles.googleBtnContainer}
            textStyle={styles.btnTextStyle}
            leftComponent={
              <Ionicons
                name="logo-google"
                size={metrics.iconSize.medium}
                color={colors.textPrimary}
                style={styles.googleIcon}
              />
            }
            onPress={handleAuthNavigation}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              {strings.dontHaveAccount}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate("CreateAccount")}
              >
                {strings.createAccount}
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const getStyles = (colors, fonts, metrics) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    innerContainer: {
      flex: 1,
      paddingHorizontal: metrics.padding.veryHigh,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: metrics.margin.large,
      marginBottom: metrics.margin.extraHigh,
    },
    appName: {
      fontSize: RFValue(12),
      fontFamily: fonts.bold,
      letterSpacing: 1.5,
      color: colors.textSecondary,
    },
    titleContainer: {
      marginBottom: metrics.margin.massive,
    },
    title: {
      fontSize: RFValue(40),
      fontFamily: fonts.bold,
      color: colors.textPrimary,
      lineHeight: RFValue(45),
      marginBottom: metrics.margin.high,
    },
    subtitle: {
      fontSize: RFValue(13),
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    formContainer: {
      flex: 1,
    },
    label: {
      fontSize: RFValue(10),
      fontFamily: fonts.bold,
      letterSpacing: 1,
      color: colors.textSecondary,
      marginBottom: metrics.margin.medium,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.inputBg,
      height: metrics.windowHeight * 0.075,
      borderRadius: metrics.borderRadius.high * 1.5,
      paddingHorizontal: metrics.padding.high,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    countryCode: {
      fontSize: RFValue(14),
      fontFamily: fonts.semiBold,
      color: colors.textPrimary,
      marginLeft: metrics.margin.low,
    },
    verticalDivider: {
      height: metrics.windowHeight * 0.03,
      width: 1,
      backgroundColor: colors.border,
      marginHorizontal: metrics.margin.medium,
    },
    overrideInputContainer: {
      flex: 1,
      height: "100%",
      backgroundColor: "transparent",
      borderWidth: 0,
      paddingHorizontal: metrics.padding.none,
    },
    overrideTextInput: {
      width: "100%",
      fontSize: RFValue(16),
      fontFamily: fonts.medium,
      letterSpacing: 2,
      color: colors.textPrimary,
      paddingBottom: metrics.padding.none,
    },
    btnTextStyle: {
      fontSize: RFValue(14),
      fontFamily: fonts.semiBold,
    },
    btnIcon: {
      marginLeft: metrics.margin.low,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: metrics.margin.extraHigh,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      marginHorizontal: metrics.margin.high,
      fontSize: RFValue(10),
      fontFamily: fonts.semiBold,
      color: colors.textLight,
      letterSpacing: 1.5,
    },
    googleBtnContainer: {
      borderWidth: 1,
      borderColor: colors.border,
    },
    googleIcon: {
      marginRight: metrics.margin.medium,
    },
    footerContainer: {
      paddingBottom: metrics.padding.veryHigh,
      alignItems: "center",
    },
    footerText: {
      fontSize: RFValue(10),
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 18,
    },
    linkText: {
      color: colors.textPrimary,
      fontFamily: fonts.semiBold,
      textDecorationLine: "underline",
    },
    signupContainer: {
      marginTop: metrics.margin.veryHigh,
      alignItems: "center",
    },
    signupText: {
      fontSize: RFValue(12),
      fontFamily: fonts.medium,
      color: colors.textSecondary,
    },
    signupLink: {
      color: colors.primary,
      fontFamily: fonts.bold,
    },
  });