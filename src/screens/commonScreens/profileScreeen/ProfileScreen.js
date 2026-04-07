import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
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
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/auth/AuthSlice";
import { getUserProfile } from "../../../redux/features/profile/ProfileSlice";
import { clearUserData } from "../../../units/AsyncStorageManager";

const ProfileScreen = () => {

    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { driverStatus, driverLoading } = useSelector((state) => state.driverHome);



    const { loading: authLoading } = useSelector((state) => state.auth);
    // const { user, loading: profileLoading } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    const profileOptions = [
        { id: 1, title: strings.editProfile, icon: 'person', onPress: () => navigation.navigate('EditProfile', { name: user?.name, phone: user?.phone, email: user?.email, city: user?.city }) },
        { id: 2, title: strings.savedAddresses, icon: 'location', onPress: () => navigation.navigate('SavedAddresses') },
        { id: 3, title: strings.paymentMethods, icon: 'wallet', onPress: () => console.log('Payments') },
        { id: 4, title: strings.driverMode, icon: 'car', onPress: () => navigation.navigate('DriverRegistration') },

    ];
    const securityOptions = [
        { id: 4, title: strings.emergencyContacts, icon: 'id-card', onPress: () => navigation.navigate('HelpSupport') },
    ];
    const appOptions = [
        { id: 5, title: strings.myRides, icon: 'car-sport', onPress: () => navigation.navigate("MyRidesHistoryList") },
    ];
    const DriverOptions = [
        { id: 1, title: strings.editProfile, icon: 'person', onPress: () => navigation.navigate("EditScreen", { name: user?.name, phone: user?.phone, email: user?.email, city: user?.city }) },
        { id: 2, title: strings.tripHistorytitle, icon: 'location', onPress: () => navigation.navigate('TripHistoryScreen') },
        { id: 3, title: strings.activeMisssion, icon: 'wallet', onPress: () => navigation.navigate('ActiveMission') },
    ];

    const role = '2';

    if (loading) {
        const handleLogout = async () => {
            if (authLoading) return;
            try {
                const res = await dispatch(logoutApi()).unwrap();
                dispatch(showMessage({ text: res?.message || "Logged out successfully", type: "success" }));
            } catch (error) {
                dispatch(showMessage({ text: "Logged out locally", type: "success" }));
            }
        };

        if (profileLoading) {
            return (
                <SafeAreaView style={styles.container}>
                    <CommonHeader
                        title={strings.accountTitle}
                        onBackPress={() => navigation.goBack()}
                    />
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size='large' color={colors.primary} />
                    </View>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={styles.container}>
                <CommonHeader
                    title={strings.accountTitle}
                    onBackPress={() => navigation.goBack()}
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
                        <Text style={styles.userName}>{user?.name}</Text>
                        <Text style={styles.userPhone}>{user?.phone}</Text>
                    </View>
                    <View style={styles.menuContainer}>
                        {role === "2" ? <View style={styles.card}>
                            {profileOptions.map((item, index) => (
                                <MenuRowItem key={item.id} item={item} isLast={index === profileOptions.length - 1} />
                            ))}
                        </View> : <View style={styles.card}>
                            {DriverOptions.map((item, index) => (
                                <MenuRowItem key={item.id} item={item} isLast={index === profileOptions.length - 1} />
                            ))}
                        </View>}
                        {role === "2" && <View style={styles.card}>
                            {securityOptions.map((item, index) => (
                                <MenuRowItem key={item.id} item={item} isLast={index === securityOptions.length - 1} />
                            ))}
                        </View>}
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
                        onPress={handleLogout}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    };
}

export default ProfileScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.screenBg,
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
})