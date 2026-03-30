import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonHeader from "../../../components/CommonHeader";
import CommonButton from "../../../components/CommonBtn";
import strings from "../../../units/CommonStrings";
import { useTheme } from "../../../common/ThemeContest";
import MenuRowItem from './components/MenuRowItem';

const ProfileScreen = () => {

    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);
    const profileOptions = [
        { id: 1, title: strings.editProfile, icon: 'person', onPress: () => console.log('Edit Profile') },
        { id: 2, title: strings.savedAddresses, icon: 'location', onPress: () => console.log('Addresses') },
        { id: 3, title: strings.paymentMethods, icon: 'wallet', onPress: () => console.log('Payments') },
    ];
    const securityOptions = [
        { id: 4, title: strings.emergencyContacts, icon: 'id-card', onPress: () => console.log('Emergency') },
    ];
    const appOptions = [
        { id: 5, title: strings.settings, icon: 'settings', onPress: () => console.log('Settings') },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader
                title={strings.accountTitle}
                onBackPress={() => console.log("Go Back")}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.profileSection}>
                    <View style={styles.profileImageWrapper}>
                        <Image
                            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.userName}>{strings.userNamePlaceholder}</Text>
                    <Text style={styles.userPhone}>{strings.userPhonePlaceholder}</Text>
                </View>
                <View style={styles.menuContainer}>
                    <View style={styles.card}>
                        {profileOptions.map((item, index) => (
                            <MenuRowItem key={item.id} item={item} isLast={index === profileOptions.length - 1} />
                        ))}
                    </View>

                    <View style={styles.card}>
                        {securityOptions.map((item, index) => (
                            <MenuRowItem key={item.id} item={item} isLast={index === securityOptions.length - 1} />
                        ))}
                    </View>

                    <View style={styles.card}>
                        {appOptions.map((item, index) => (
                            <MenuRowItem key={item.id} item={item} isLast={index === appOptions.length - 1} />
                        ))}
                    </View>
                </View>
                <CommonButton
                    title={strings.logout}
                    backgroundColor="#F3F4F6"
                    textColor={colors.danger}
                    height={metrics.windowHeight * 0.065}
                    borderRadius={metrics.borderRadius.high * 1.2}
                    marginTop={metrics.margin.massive}
                    elevation={0}
                    textStyle={styles.logoutText}
                    leftComponent={
                        <Ionicons
                            name="log-out-outline"
                            size={metrics.iconSize.high}
                            color={colors.danger}
                            style={styles.logoutIcon}
                        />
                    }
                    onPress={() => console.log("Logout Pressed")}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: metrics.margin.large,
        marginBottom: metrics.margin.extraHigh,
    },
    profileImageWrapper: {
        position: 'relative',
        marginBottom: metrics.margin.medium,
    },
    profileImage: {
        width: metrics.windowWidth * 0.28,
        height: metrics.windowWidth * 0.28,
        borderRadius: metrics.borderRadius.circular,
        borderWidth: 2,
        borderColor: colors.white,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.background,
    },
    userName: {
        fontSize: RFValue(22),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginBottom: metrics.margin.tiny,
    },
    userPhone: {
        fontSize: RFValue(12),
        fontFamily: fonts.medium,
        color: colors.textSecondary,
    },
    menuContainer: {
        marginTop: metrics.margin.low,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.high * 1.5,
        paddingVertical: metrics.padding.medium,
        marginBottom: metrics.margin.high,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 1,
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: metrics.padding.high,
        paddingVertical: metrics.padding.medium,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: "#F3F4F6",
        borderRadius: metrics.borderRadius.medium,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.high,
    },
    menuTitle: {
        flex: 1,
        fontSize: RFValue(13),
        fontFamily: fonts.semiBold,
        color: colors.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginLeft: metrics.margin.high * 3,
        marginRight: metrics.margin.high,
    },
    logoutText: {
        fontSize: RFValue(14),
        fontFamily: fonts.bold,
    },
    logoutIcon: {
        marginRight: metrics.margin.low,
    }
});