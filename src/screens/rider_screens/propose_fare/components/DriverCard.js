import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../../../common/ThemeContest';
import CommonColors from '../../../../units/CommonColor';
import { RFValue } from 'react-native-responsive-fontsize';
import strings from '../../../../units/CommonStrings';


const DriverCard = ({ driver, onAccept, onDecline }) => {

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    return (
        <View style={styles.driverCard}>
            {/* Top row */}
            <View style={styles.driverCardTop}>
                <View style={styles.driverLeft}>
                    <Image
                        source={{ uri: driver.avatar }}
                        style={styles.avatar}
                    />
                    <View style={styles.driverInfo}>
                        <Text style={styles.driverName}>{driver.name}</Text>
                        <View style={styles.driverMeta}>
                            <MaterialIcons name="star" size={14} color={CommonColors.primary} />
                            <Text style={styles.driverRating}>{driver.rating}</Text>
                            <Text style={styles.driverCar}>· {driver.car}</Text>
                        </View>
                    </View>
                </View>

                {/* Offer */}
                <View style={styles.offerBlock}>
                    <Text style={styles.offerAmount}>
                        {strings.currencySymbol}{driver.offer}
                    </Text>
                    <Text style={[
                        styles.offerStatus,
                    ]}>
                        {strings.counterLabel}
                    </Text>
                </View>
            </View>

            {/* Action row */}
            <View style={styles.driverActions}>
                <TouchableOpacity
                    style={styles.acceptBtn}
                    activeOpacity={0.85}
                    onPress={() => onAccept?.(driver)}
                >
                    <Text style={styles.acceptBtnText}>{strings.acceptBtn}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.declineBtn}
                    activeOpacity={0.85}
                    onPress={() => onDecline?.(driver)}
                >
                    <Text style={styles.declineBtnText}>{strings.declineBtn}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DriverCard;


const createStyles = (fonts, metrics) => StyleSheet.create({
    // Driver card
    driverCard: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        borderWidth: 1,
        borderColor: CommonColors.border,
        marginBottom: metrics.margin.low,
        borderColor: CommonColors.primary,
        borderWidth: 1.5,
    },
    driverCardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: metrics.margin.medium,
    },
    driverLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
        flex: 1,
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: metrics.borderRadius.circular,
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        fontFamily: fonts.bold,
        fontSize: RFValue(14),
        color: CommonColors.primary,
        marginBottom: 3,
    },
    driverMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    driverRating: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(13),
        color: CommonColors.primary,
    },
    driverCar: {
        fontFamily: fonts.regular,
        fontSize: RFValue(13),
        color: CommonColors.textSecondary,
    },
    driverActions: {
        flexDirection: 'row',
        gap: metrics.margin.medium,
    },
    acceptBtn: {
        flex: 1,
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.medium,
        paddingVertical: metrics.padding.medium,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acceptBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(13),
        color: CommonColors.white,
    },
    declineBtn: {
        paddingHorizontal: metrics.padding.veryHigh,
        backgroundColor: CommonColors.chipInactive,
        borderRadius: metrics.borderRadius.medium,
        paddingVertical: metrics.padding.medium,
        alignItems: 'center',
        justifyContent: 'center',
    },
    declineBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(13),
        color: CommonColors.primary,
    },

    offerBlock: {
        alignItems: 'flex-end',
    },
    offerAmount: {
        fontFamily: fonts.bold,
        fontSize: RFValue(20),
        color: CommonColors.primary,
        letterSpacing: -0.4,
    },
    offerStatus: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(9),
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        marginTop: 2,
        color: CommonColors.primary,
    },

});