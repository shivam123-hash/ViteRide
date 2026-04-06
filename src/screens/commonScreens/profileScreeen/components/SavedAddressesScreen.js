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
import CommonHeader from "../../../../components/CommonHeader";
import strings from "../../../../units/CommonStrings";
import { useTheme } from "../../../../common/ThemeContest";
import { useNavigation } from "@react-navigation/native";

const SavedAddressesScreen = () => {
    const navigation = useNavigation();
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);
    const savedAddresses = [
        { id: 1, title: strings.homeTitle, address: strings.homeAddress, icon: 'home' },
        { id: 2, title: strings.workTitle, address: strings.workAddress, icon: 'briefcase' },
    ];

    const recentDestinations = [
        {
            id: 1,
            title: strings.plazaTitle,
            time: strings.plazaTime,
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
        },
        {
            id: 2,
            title: strings.cafeTitle,
            time: strings.cafeTime,
            image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop'
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader
                title={strings.savedAddressesHeader}
                onBackPress={() => navigation.goBack()}
                rightIconName="ellipsis-vertical"
                onRightPress={() => console.log("Options Menu")}
            />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.mainTitle}>{strings.yourPlaces}</Text>
                <View style={styles.addressList}>
                    {savedAddresses.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.addressCard} activeOpacity={0.7}>
                            <View style={styles.iconBox}>
                                <Ionicons name={item.icon} size={metrics.iconSize.high} color={colors.textPrimary} />
                            </View>
                            <View style={styles.addressTextContainer}>
                                <Text style={styles.addressTitle}>{item.title}</Text>
                                <Text style={styles.addressDesc}>{item.address}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={metrics.iconSize.medium} color="#A0A0A0" />
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.dashedButton} activeOpacity={0.6} onPress={() => console.log("Add New")}>
                    <View style={styles.plusCircle}>
                        <Ionicons name="add" size={metrics.iconSize.high} color={colors.textPrimary} />
                    </View>
                    <Text style={styles.dashedButtonText}>{strings.addNewAddress}</Text>
                </TouchableOpacity>
                <View style={styles.recentSection}>
                    <Text style={styles.sectionLabel}>{strings.recentDestinationsLabel}</Text>
                    {recentDestinations.map((dest) => (
                        <TouchableOpacity key={dest.id} style={styles.destinationCard} activeOpacity={0.8}>
                            <Image source={{ uri: dest.image }} style={styles.destinationImage} />
                            <View style={styles.imageOverlay} />
                            <View style={styles.destinationTextWrapper}>
                                <Text style={styles.destinationTitle}>{dest.title}</Text>
                                <Text style={styles.destinationTime}>{dest.time}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default SavedAddressesScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
        paddingTop: metrics.padding.medium,
    },
    mainTitle: {
        fontSize: RFValue(40),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        lineHeight: RFValue(44),
        marginBottom: metrics.margin.extraHigh,
    },
    addressList: {
        marginBottom: metrics.margin.medium,
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.high * 1.5,
        padding: metrics.padding.high,
        marginBottom: metrics.margin.high,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 1,
    },
    iconBox: {
        width: metrics.windowWidth * 0.14,
        height: metrics.windowWidth * 0.14,
        backgroundColor: "#F3F4F6",
        borderRadius: metrics.borderRadius.circular,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.high,
    },
    addressTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    addressTitle: {
        fontSize: RFValue(14),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    addressDesc: {
        fontSize: RFValue(11),
        fontFamily: fonts.regular,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    dashedButton: {
        width: '100%',
        paddingVertical: metrics.padding.extraHigh,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: "#A0A0A0",
        borderStyle: 'dashed',
        borderRadius: metrics.borderRadius.high * 1.5,
        marginBottom: metrics.margin.massive,
    },
    plusCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: colors.textPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: metrics.margin.medium,
    },
    dashedButtonText: {
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    recentSection: {
        marginTop: metrics.margin.low,
    },
    sectionLabel: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textLight,
        letterSpacing: 1.2,
        marginBottom: metrics.margin.high,
    },
    destinationCard: {
        width: '100%',
        height: metrics.windowHeight * 0.2,
        borderRadius: metrics.borderRadius.high * 1.5,
        overflow: 'hidden',
        marginBottom: metrics.margin.high,
    },
    destinationImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    destinationTextWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: metrics.padding.high,
    },
    destinationTitle: {
        fontSize: RFValue(16),
        fontFamily: fonts.bold,
        color: colors.white,
        marginBottom: 2,
    },
    destinationTime: {
        fontSize: RFValue(10),
        fontFamily: fonts.medium,
        color: "#E5E7EB",
    },
});