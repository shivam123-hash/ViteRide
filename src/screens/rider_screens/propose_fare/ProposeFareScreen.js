import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../../common/ThemeContest';
import CommonColors from '../../../units/CommonColor';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonHeader from '../../../components/CommonHeader';
import strings from '../../../units/CommonStrings';
import DriverCard from './components/DriverCard';
import CommonInput from '../../../components/CommonInput';

const DRIVERS = [
    {
        id: '1',
        name: 'Rajesh Kumar',
        rating: '4.8',
        car: 'Honda City',
        offer: '380',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYZLOfmCVe1UPLKHZzgkkV6gbwiFvrgSEto6Ymm79lHuHS7YPf1GrDmw8rL8hj230WHHjfueeS8qaodDld2dN2MzLKr-Yrvwl9BTzfOdRv8F7zSfHlDMtABLwIuqg2iKyj5W9ZiZgFnHGgTqm0f7ZXDYlqOrRXf1LUfm-ahv90SMyNZqNnKoLNjvATMwxUHCbN3dwE4o5I2txjdONi_-1ZOpyR_NnGr3poqgOaM8molsspd8lHE2igrkBpa4xg9mlGdD8Ouw8Eju6D',
    },
    {
        id: '2',
        name: 'Amit Singh',
        rating: '4.9',
        car: 'Swift Dzire',
        offer: '350',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjkNGe_5KvurZ50tHmWECC99HkjBdX2Jgt1cFB0MLF-BCvlKhvUcwMFst6J-RZ-NOvu9d03Rm-B8uCRJ9Jv_Rt6bNIUzeEewLSzxB42lVZ3JqBxTnYn6XdQNXb_KmmH20qRVdq8vnyJhI50M8Tarx8ox7Bz6WI8OEmaeyK7iOwUL74skr7jJQPgatrL4Jo7BOdVwyR6MXZaHH33agvlrp_UZdCEfgIsKsr-LDkM7ZU5n8SftcxpHl72PMAnyQEhcqRMAKI1loNUeSR',
    },
    {
        id: '3',
        name: 'Vikram Mehta',
        rating: '4.7',
        car: 'Toyota Glanza',
        offer: '410',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpYc_dU0F2kn43ChfnbHZ7v8dsaBs_dMGu0MixMPv6frmR63dLZko8Apb0havOXdqOUsNFKmQfpN_JTEtExU3teCX17BZI-ibvi_DqNcJCNZ2DStWA6ZD8LQWlKR5ScLD93OqTRM4adY5AoHL-8rMoLPCyxEhGqiIaeT-vLvp5kYcWl1zuHNPiM8xNbfd6QBIpW_rntF6Ph9xw9J1xWMC2VMGHMV0bVU4Gf40D7KKoS82ac1nNc7isoqFgkqPQuT4L60FV1ovwM9Oq',
    },
];

const ProposeFareScreen = ({ navigation }) => {
    const [fareValue, setFareValue] = useState(null);

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const handleAccept = (driver) => console.log('Accepted:', driver.name);
    const handleDecline = (driver) => console.log('Declined:', driver.name);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            <CommonHeader
                title={strings.proposeFareHeader}
                onBackPress={() => navigation?.goBack()}
                rightComponent={
                    <View style={styles.helpBtn}>
                        <MaterialIcons
                            name="help-outline"
                            size={metrics.iconSize.high}
                            color={CommonColors.primary}
                        />
                    </View>
                }
            />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.headline}>
                    <Text style={styles.headlineText}>{strings.proposeFareHeadline1}</Text>
                    <Text style={styles.headlineText}>{strings.proposeFareHeadline2}</Text>
                </View>

                <CommonInput
                    value={fareValue}
                    onChangeText={setFareValue}
                    keyboardType="numeric"
                    placeholder={strings.placeholderForFarePrice}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    leftComponent={
                        <Text style={styles.currencySymbol}>{strings.currencySymbol}</Text>
                    }
                    style={styles.inputCard}
                    textInput={styles.fareInput}
                />

                <View style={styles.rangeCard}>
                    <View style={styles.rangeLeft}>
                        <View style={styles.rangeIconBox}>
                            <MaterialIcons
                                name="analytics"
                                size={metrics.iconSize.high}
                                color={CommonColors.primary}
                            />
                        </View>
                        <View>
                            <Text style={styles.rangeLabel}>{strings.recommendedRange}</Text>
                            <Text style={styles.rangeValue}>{strings.recommendedRangeValue}</Text>
                        </View>
                    </View>
                    <View style={styles.infoIconBox}>
                        <MaterialIcons
                            name="info-outline"
                            size={metrics.iconSize.medium}
                            color={CommonColors.primary}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.broadcastBtn}
                    activeOpacity={0.88}
                    onPress={() => console.log('Broadcast pressed, fare:', fareValue)}
                >
                    <Text style={styles.broadcastBtnText}>{strings.broadcastRequest}</Text>
                </TouchableOpacity>

                <View style={styles.offersSection}>
                    <View style={styles.offersSectionHeader}>
                        <Text style={styles.offersSectionTitle}>{strings.driverOffers}</Text>
                        <View style={styles.realtimeBadge}>
                            <View style={styles.realtimeDot} />
                            <Text style={styles.realtimeText}>{strings.realTime}</Text>
                        </View>
                    </View>

                    {DRIVERS.map((driver) => (
                        <DriverCard
                            key={driver.id}
                            driver={driver}
                            styles={styles}
                            onAccept={handleAccept}
                            onDecline={handleDecline}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.high,
        paddingBottom: metrics.padding.massive,
    },
    helpBtn: {
        width: metrics.margin.massive,
        height: metrics.margin.massive,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.chipInactive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        marginTop: metrics.margin.high,
        marginBottom: metrics.margin.veryHigh,
    },
    headlineText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(40),
        lineHeight: RFValue(46),
        letterSpacing: -0.8,
        color: CommonColors.primary,
    },
    inputCard: {
        backgroundColor: CommonColors.primary,
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: metrics.borderRadius.high,
        paddingHorizontal: metrics.padding.veryHigh,
        paddingVertical: metrics.padding.medium,
        height: 80,
        marginBottom: metrics.margin.veryHigh
    },
    currencySymbol: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.white,
        marginRight: metrics.margin.low,
    },
    fareInput: {
        flex: 1,
        width: undefined,
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.white,
        padding: 0,
        margin: 0,
    },
    rangeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.veryHigh,
        marginBottom: metrics.margin.medium,
        borderWidth: 1,
        borderColor: CommonColors.border,
    },
    rangeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
    },
    rangeIconBox: {
        width: 40,
        height: 40,
        borderRadius: metrics.borderRadius.medium,
        backgroundColor: CommonColors.chipInactive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rangeLabel: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
        marginBottom: 2,
    },
    rangeValue: {
        fontFamily: fonts.bold,
        fontSize: RFValue(15),
        color: CommonColors.primary,
    },
    infoIconBox: {
        width: 36,
        height: 36,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.chipInactive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    broadcastBtn: {
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.high,
        paddingVertical: metrics.padding.veryHigh,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: metrics.margin.veryHigh,
        elevation: 4,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
    },
    broadcastBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.white,
        letterSpacing: 0.2,
    },
    offersSection: {
        gap: metrics.margin.medium,
    },
    offersSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: metrics.margin.low,
    },
    offersSectionTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        color: CommonColors.primary,
        letterSpacing: -0.3,
    },
    realtimeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: CommonColors.primary,
        paddingHorizontal: metrics.padding.medium,
        paddingVertical: metrics.padding.tiny,
        borderRadius: metrics.borderRadius.circular,
    },
    realtimeDot: {
        width: 7,
        height: 7,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.white,
    },
    realtimeText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(10),
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: CommonColors.white,
    },
    
});

export default ProposeFareScreen;