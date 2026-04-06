import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Image,
} from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from 'react-native-image-crop-picker';
import CommonHeader from "../../../../components/CommonHeader";
import CommonInput from "../../../../components/CommonInput";
import CommonButton from "../../../../components/CommonBtn";
import strings from "../../../../units/CommonStrings";
import { useTheme } from "../../../../common/ThemeContest";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {

    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);
    const [profilePic, setProfilePic] = useState('https://randomuser.me/api/portraits/men/32.jpg');
    const [fullName, setFullName] = useState(strings.defaultName);
    const [phone, setPhone] = useState(strings.defaultPhone);
    const [email, setEmail] = useState(strings.defaultEmail);
    const [homeCity, setHomeCity] = useState(strings.defaultCity);
    const navigation = useNavigation();

    const handleImagePick = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            cropperCircleOverlay: true,
            mediaType: 'photo',
        }).then(image => {
            console.log(image);
            setProfilePic(image.path);
        }).catch(error => {
            console.log("Image Picker Error: ", error);
        });
    };

    return (
        <SafeAreaView style={styles.container}> 
            <CommonHeader
                title={strings.editProfileTitle}
                onBackPress={() => navigation.goBack()}
                rightIconName="ellipsis-vertical"
                onRightPress={() => console.log("Options")}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.profileSection}>
                        <View style={styles.profileImageWrapper}>
                            <Image
                                source={{ uri: profilePic }}
                                style={styles.profileImage}
                            />
                            <TouchableOpacity
                                style={styles.editBadge}
                                activeOpacity={0.8}
                                onPress={handleImagePick}
                            >
                                <Ionicons name="pencil" size={metrics.iconSize.low} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formSection}>
                        <Text style={styles.label}>{strings.fullNameLabel}</Text>
                        <CommonInput
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder={strings.fullNameLabel}
                            placeholderTextColor={colors.textLight}
                            style={styles.customInputStyle}
                            textInput={styles.customTextInput}
                        />
                        <Text style={styles.label}>{strings.phoneLabel}</Text>
                        <View style={styles.inputWrapper}>
                            <CommonInput
                                value={phone}
                                onChangeText={setPhone}
                                placeholder={strings.phoneLabel}
                                placeholderTextColor={colors.textLight}
                                keyboardType="phone-pad"
                                style={styles.customInputStyle}
                                textInput={styles.customTextInput}
                            />
                            <View style={styles.rightIconWrapper}>
                                <Ionicons name="checkmark-circle" size={metrics.iconSize.medium} color="#A0A0A0" />
                            </View>
                        </View>
                        <Text style={styles.label}>{strings.emailLabel}</Text>
                        <CommonInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder={strings.emailLabel}
                            placeholderTextColor={colors.textLight}
                            keyboardType="email-address"
                            style={styles.customInputStyle}
                            textInput={styles.customTextInput}
                        />
                        <Text style={styles.label}>{strings.homeCityLabel}</Text>
                        <View style={styles.inputWrapper}>
                            <CommonInput
                                value={homeCity}
                                onChangeText={setHomeCity}
                                placeholder={strings.homeCityLabel}
                                placeholderTextColor={colors.textLight}
                                style={styles.customInputStyle}
                                textInput={styles.customTextInput}
                            />
                            <View style={styles.rightIconWrapper}>
                                <Ionicons name="location" size={metrics.iconSize.medium} color="#D1D5DB" />
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.divider} /> */}
                    {/* <Text style={styles.securityTitle}>{strings.accountSecurityTitle}</Text>
                    <TouchableOpacity style={styles.securityCard} activeOpacity={0.7} onPress={() => console.log('Update Password')}>
                        <View style={styles.securityIconBox}>
                            <Ionicons name="sync-circle-outline" size={metrics.iconSize.high} color={colors.textPrimary} />
                        </View>
                        <View style={styles.securityTextContainer}>
                            <Text style={styles.securityCardTitle}>{strings.updatePassword}</Text>
                            <Text style={styles.securityCardSubtitle}>{strings.lastChanged}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={metrics.iconSize.medium} color="#D1D5DB" />
                    </TouchableOpacity> */}
                    <CommonButton
                        title={strings.saveChanges}
                        backgroundColor={colors.primary}
                        textColor={colors.white}
                        height={metrics.windowHeight * 0.07}
                        borderRadius={metrics.borderRadius.high * 1.5}
                        marginTop={metrics.margin.massive}
                        elevation={3}
                        textStyle={styles.btnTextStyle}
                        rightComponent={
                            <Ionicons name="checkmark-done" size={metrics.iconSize.medium} color={colors.white} style={styles.btnIconRight} />
                        }
                        onPress={() => console.log("Save Changes Pressed")}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.screenBg,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
        paddingTop: metrics.padding.medium,
    },
    profileSection: {
        alignItems: "center",
        marginBottom: metrics.margin.extraHigh,
    },
    profileImageWrapper: {
        position: 'relative',
    },
    profileImage: {
        width: metrics.windowWidth * 0.28,
        height: metrics.windowWidth * 0.28,
        borderRadius: metrics.borderRadius.circular,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.background,
    },
    formSection: {
        marginBottom: metrics.margin.large,
    },
    label: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: metrics.margin.low,
        marginTop: metrics.margin.medium,
        textTransform: 'uppercase',
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    customInputStyle: {
        backgroundColor: colors.white,
        borderWidth: 0,
        borderRadius: metrics.borderRadius.high,
        height: metrics.windowHeight * 0.065,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 3,
        elevation: 1,
        paddingRight: metrics.padding.massive,
    },
    customTextInput: {
        fontFamily: fonts.medium,
        fontSize: RFValue(13),
        color: colors.textPrimary,
    },
    rightIconWrapper: {
        position: 'absolute',
        right: metrics.padding.high,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: metrics.margin.veryHigh,
    },
    securityTitle: {
        fontSize: RFValue(16),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginBottom: metrics.margin.high,
    },
    securityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F3F4F6",
        borderRadius: metrics.borderRadius.high * 1.2,
        padding: metrics.padding.high,
    },
    securityIconBox: {
        width: 40,
        height: 40,
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.circular,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.medium,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    securityTextContainer: {
        flex: 1,
    },
    securityCardTitle: {
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    securityCardSubtitle: {
        fontSize: RFValue(10),
        fontFamily: fonts.regular,
        color: colors.textSecondary,
    },
    btnTextStyle: {
        fontSize: RFValue(14),
        fontFamily: fonts.bold,
    },
    btnIconRight: {
        marginLeft: metrics.margin.medium,
    },
});