import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../../common/ThemeContest';
import strings from '../../../units/CommonStrings';
import CommonButton from '../../../components/CommonBtn';

const IncomingRequestModal = ({ visible, onAccept, onDecline }) => {
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View style={styles.overlay}>
                <View style={styles.modalCard}>
                    <View style={styles.handleBar} />
                    <View style={styles.timerSection}>
                        <Text style={styles.sectionLabel}>{strings.incomingRequest}</Text>
                        <Text style={styles.timerText}>{strings.dummyTimer}</Text>
                    </View>

                    <View style={styles.locationsContainer}>

                        <View style={styles.locationRow}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="location" size={metrics.iconSize.medium} color={colors.textPrimary} />
                            </View>
                            <View style={styles.locationTextContainer}>
                                <Text style={styles.labelSmall}>{strings.pickupLocationLabel}</Text>
                                <Text style={styles.locationPrimaryText}>{strings.dummyDistance}</Text>
                                <Text style={styles.locationSecondaryText}>{strings.dummyPickupLocation}</Text>
                            </View>
                        </View>

                        <View style={[styles.locationRow, styles.noBottomMargin]}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="navigate" size={metrics.iconSize.medium} color={colors.textPrimary} />
                            </View>
                            <View style={styles.locationTextContainer}>
                                <Text style={styles.labelSmall}>{strings.destinationLabel}</Text>
                                <Text style={styles.locationPrimaryText}>{strings.dummyDropoffTitle}</Text>
                                <Text style={styles.locationSecondaryText}>{strings.dummyDropoffSub}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.fareSection}>
                        <Text style={styles.sectionLabel}>{strings.estimatedFareLabel}</Text>
                        <Text style={styles.fareText}>{strings.dummyFare}</Text>
                    </View>

                    <View style={styles.actionsContainer}>

                        <CommonButton
                            title={strings.acceptRideBtn}
                            backgroundColor={colors.primary}
                            textColor={colors.white}
                            height={metrics.windowHeight * 0.075}
                            borderRadius={metrics.borderRadius.high}
                            marginTop={metrics.margin.none}
                            elevation={4}
                            textStyle={styles.acceptBtnText}
                            onPress={onAccept}
                        />

                        <CommonButton
                            title={strings.declineRequestBtn}
                            backgroundColor="transparent"
                            textColor={colors.danger}
                            height={metrics.windowHeight * 0.06}
                            borderRadius={metrics.borderRadius.none}
                            marginTop={metrics.margin.medium}
                            elevation={0}
                            textStyle={styles.declineBtnText}
                            onPress={onDecline}
                        />

                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default IncomingRequestModal;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: metrics.padding.veryHigh,
    },
    modalCard: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: metrics.borderRadius.extraHigh,
        padding: metrics.padding.veryHigh,
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
    },
    handleBar: {
        width: metrics.windowWidth * 0.12,
        height: metrics.margin.tiny,
        backgroundColor: colors.border,
        borderRadius: metrics.borderRadius.circular,
        marginBottom: metrics.margin.high,
    },
    timerSection: {
        alignItems: 'center',
        marginBottom: metrics.margin.extraHigh,
    },
    sectionLabel: {
        fontSize: RFValue(10),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1.5,
        marginBottom: metrics.margin.tiny,
        textTransform: 'uppercase',
    },
    timerText: {
        fontSize: RFValue(46),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        lineHeight: RFValue(55),
    },
    locationsContainer: {
        width: '100%',
        marginBottom: metrics.margin.extraHigh,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: metrics.margin.extraHigh,
    },
    noBottomMargin: {
        marginBottom: metrics.margin.none,
    },
    iconCircle: {
        width: metrics.windowWidth * 0.12,
        height: metrics.windowWidth * 0.12,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.chipInactive,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.high,
    },
    locationTextContainer: {
        flex: 1,
    },
    labelSmall: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
        marginBottom: metrics.margin.tiny,
    },
    locationPrimaryText: {
        fontSize: RFValue(16),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        marginBottom: metrics.margin.tiny / 2,
    },
    locationSecondaryText: {
        fontSize: RFValue(12),
        fontFamily: fonts.regular,
        color: colors.textSecondary,
    },
    fareSection: {
        alignItems: 'center',
        marginBottom: metrics.margin.massive,
    },
    fareText: {
        fontSize: RFValue(40),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        lineHeight: RFValue(48),
    },
    actionsContainer: {
        width: '100%',
    },
    acceptBtnText: {
        fontFamily: fonts.bold,
        letterSpacing: 1.5,
        fontSize: RFValue(12),
    },
    declineBtnText: {
        fontFamily: fonts.bold,
        letterSpacing: 1,
        fontSize: RFValue(12),
    },
});