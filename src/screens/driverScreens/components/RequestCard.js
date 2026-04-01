import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import strings from '../../../units/CommonStrings';
import CommonButton from '../../../components/CommonBtn';

const RequestCard = ({ item, colors, fonts, metrics }) => {
    const styles = getStyles(colors, fonts, metrics);

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeaderRow}>
                <View style={styles.profileSection}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={metrics.iconSize.medium} color={colors.white} />
                    </View>
                    <View style={styles.profileTextInfo}>
                        <View style={styles.nameRow}>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <Text style={styles.bulletPoint}> • </Text>
                        </View>
                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                        <Text style={styles.distanceText}>{item.distance}</Text>
                    </View>
                </View>
                <View style={styles.fareSection}>
                    <Text style={styles.fareAmount}>{item.fare}</Text>
                    <Text style={styles.fareLabel}>{strings.estimatedFareLabelSmall}</Text>
                </View>
            </View>
            <View style={styles.routeSection}>
                <View style={styles.timelineGraphics}>
                    <View style={styles.pickupDotOuter}>
                        <View style={styles.pickupDotInner} />
                    </View>
                    <View style={styles.timelineLine} />
                    <View style={styles.dropoffPin}>
                        <Ionicons name="location-sharp" size={metrics.iconSize.low} color={colors.textSecondary} />
                    </View>
                </View>
                <View style={styles.routeDetails}>
                    <View style={styles.locationBlock}>
                        <Text style={styles.locationLabel}>{strings.pickupLabelSmall}</Text>
                        <Text style={styles.locationText} numberOfLines={1}>{item.pickup}</Text>
                    </View>

                    <View style={[styles.locationBlock, styles.noMarginBottom]}>
                        <Text style={styles.locationLabel}>{strings.destinationLabelSmall}</Text>
                        <Text style={styles.locationText} numberOfLines={1}>{item.destination}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.actionRow}>
                <CommonButton
                    title={strings.btnViewDetails}
                    backgroundColor={colors.white}
                    textColor={colors.textPrimary}
                    height={metrics.windowHeight * 0.06}
                    borderRadius={metrics.borderRadius.medium}
                    elevation={0}
                    containerStyle={styles.viewDetailsBtn}
                    textStyle={styles.actionBtnText}
                    onPress={() => console.log('View Details', item.id)}
                />
                <CommonButton
                    title={strings.btnAccept}
                    backgroundColor={colors.primary}
                    textColor={colors.white}
                    height={metrics.windowHeight * 0.06}
                    borderRadius={metrics.borderRadius.medium}
                    elevation={4}
                    containerStyle={styles.acceptBtn}
                    textStyle={styles.actionBtnText}
                    onPress={() => console.log('Accept Request', item.id)}
                />
            </View>
        </View>
    );
};

export default memo(RequestCard);

const getStyles = (colors, fonts, metrics) => StyleSheet.create({

    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.extraHigh,
        padding: metrics.padding.high,
        marginBottom: metrics.margin.high,
        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarCircle: {
        width: metrics.windowWidth * 0.12,
        height: metrics.windowWidth * 0.12,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: '#1E3A45', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.medium,
    },
    profileTextInfo: {
        justifyContent: 'center',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameText: {
        fontSize: RFValue(14),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    bulletPoint: {
        fontSize: RFValue(14),
        color: colors.textSecondary,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    ratingText: {
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    distanceText: {
        fontSize: RFValue(9),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
        letterSpacing: 0.5,
    },
    fareSection: {
        alignItems: 'flex-end',
    },
    fareAmount: {
        fontSize: RFValue(22),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    fareLabel: {
        fontSize: RFValue(8),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
        textAlign: 'right',
        lineHeight: 10,
    },
    routeSection: {
        flexDirection: 'row',
        marginTop: metrics.margin.high,
        marginBottom: metrics.margin.high,
    },
    timelineGraphics: {
        width: metrics.margin.extraHigh,
        alignItems: 'center',
    },
    pickupDotOuter: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 3,
        borderColor: colors.textPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: metrics.margin.tiny,
    },
    pickupDotInner: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.textPrimary,
    },
    timelineLine: {
        flex: 1,
        width: 1,
        backgroundColor: colors.border,
        marginVertical: metrics.margin.tiny,
    },
    dropoffPin: {
        backgroundColor: colors.chipInactive,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: metrics.margin.tiny,
    },
    routeDetails: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: metrics.margin.tiny,
    },
    locationBlock: {
        marginBottom: metrics.margin.high,
    },
    noMarginBottom: {
        marginBottom: 0,
    },
    locationLabel: {
        fontSize: RFValue(8),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: 2,
    },
    locationText: {
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: metrics.margin.low,
    },
    viewDetailsBtn: {
        flex: 1,
        marginRight: metrics.margin.low,
        borderWidth: 1.5,
        borderColor: colors.textPrimary,
    },
    acceptBtn: {
        flex: 1,
        marginLeft: metrics.margin.low,
    },
    actionBtnText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(12),
    },
});