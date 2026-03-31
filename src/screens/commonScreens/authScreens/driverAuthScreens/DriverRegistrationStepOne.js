import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../../../../common/ThemeContest';
import strings from '../../../../units/CommonStrings';
import CommonBtn from '../../../../components/CommonBtn';
import CommonInput from '../../../../components/CommonInput';
import GlobalMetrics from '../../../../units/GlobalMetricsStyles';

const DriverRegistrationStepOneContent = ({
    data,
    onChangeField,
    onUploadPhoto,
    onNext,
}) => {
    const { colors, fonts } = useTheme();
    const styles = useMemo(() => createStyles(colors, fonts), [colors, fonts]);

    return (
        <View>
            <Text style={styles.title}>{strings.driverAboutTitle}</Text>
            <Text style={styles.subtitle}>{strings.driverPrivacyNote}</Text>

            <View style={styles.card}>
                <View style={styles.avatarWrapper}>
                    {data?.profilePhoto?.uri ? (
                        <Image source={{ uri: data.profilePhoto.uri }} style={styles.avatarImage} />
                    ) : (
                        <View style={styles.avatarCircle}>
                            <Ionicons
                                name="person"
                                size={58}
                                color="#BDBDBD"
                            />
                        </View>
                    )}
                </View>

                <CommonBtn
                    title={strings.driverUploadPhotoBtn}
                    backgroundColor={colors.textPrimary}
                    textColor={colors.white}
                    height={54}
                    width={GlobalMetrics.windowWidth / 1.6}
                    borderRadius={GlobalMetrics.borderRadius.high * 1.3}
                    textStyle={styles.btnText}
                    containerStyle={styles.btnStyle}
                    leftComponent={
                        <Ionicons
                            name="camera"
                            size={GlobalMetrics.iconSize.low}
                            color={colors.white}
                            style={styles.leftIcon}
                        />
                    }
                    onPress={onUploadPhoto}
                />

                <Text style={styles.photoHint}>{strings?.driverPhotoHint}</Text>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings?.driverFullLegalNameLabel}</Text>
                    <View style={styles.inputShell}>
                        <CommonInput
                            value={data?.fullLegalName}
                            onChangeText={(value) => onChangeField('fullLegalName', value)}
                            placeholder={strings.driverFullLegalNamePlaceholder}
                            placeholderTextColor={colors.textLight}
                            style={styles.inputContainerOverride}
                            textInput={styles.inputText}
                        />
                    </View>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings.driverProfessionalHeadlineLabel}</Text>
                    <View style={styles.inputShell}>
                        <CommonInput
                            value={data.professionalHeadline}
                            onChangeText={(value) => onChangeField('professionalHeadline', value)}
                            placeholder={strings.driverProfessionalHeadlinePlaceholder}
                            placeholderTextColor={colors.textLight}
                            style={styles.inputContainerOverride}
                            textInput={styles.inputText}
                        />
                    </View>
                </View>

                <CommonBtn
                    title={strings.driverContinueToVehicle}
                    backgroundColor={colors.textPrimary}
                    textColor={colors.white}
                    height={56}
                    borderRadius={GlobalMetrics.borderRadius.high * 1.3}
                    textStyle={styles.btnText}
                    rightComponent={
                        <Ionicons
                            name="arrow-forward"
                            size={GlobalMetrics.iconSize.low}
                            color={colors.white}
                            style={styles.rightIcon}
                        />
                    }
                    onPress={onNext}
                />
            </View>
        </View>
    );
};

const createStyles = (colors, fonts) =>
    StyleSheet.create({
        title: {
            fontSize: RFValue(28),
            lineHeight: RFValue(32),
            fontFamily: fonts.bold,
            color: colors.textPrimary,
            marginBottom: GlobalMetrics.margin.medium,
        },
        subtitle: {
            fontSize: RFValue(12),
            lineHeight: RFValue(18),
            fontFamily: fonts.regular,
            color: colors.textSecondary,
            marginBottom: GlobalMetrics.margin.extraHigh,
        },
        card: {
            backgroundColor: colors.white,
            borderRadius: GlobalMetrics.borderRadius.extraHigh,
            padding: GlobalMetrics.padding.veryHigh,
            elevation: 4,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,

        },
        avatarWrapper: {
            alignItems: 'center',
            marginBottom: GlobalMetrics.margin.medium,
        },
        avatarCircle: {
            width: 126,
            height: 126,
            borderRadius: GlobalMetrics.borderRadius.circular,
            backgroundColor: '#F0F0F0',
            alignItems: 'center',
            justifyContent: 'center',
        },
        avatarImage: {
            width: 126,
            height: 126,
            borderRadius: GlobalMetrics.borderRadius.circular,
        },
        photoHint: {
            textAlign: 'center',
            fontSize: RFValue(8),
            lineHeight: RFValue(13),
            fontFamily: fonts.bold,
            color: colors.textLight,
            letterSpacing: 0.8,
            marginTop: GlobalMetrics.margin.medium,
            marginBottom: GlobalMetrics.margin.extraHigh,
        },
        fieldGroup: {
            marginBottom: GlobalMetrics.margin.high,
        },
        label: {
            fontSize: RFValue(12),
            fontFamily: fonts.bold,
            color: colors.textSecondary,
            letterSpacing: 1,
            marginBottom: GlobalMetrics.margin.medium,
        },
        inputShell: {
            height: 54,
            borderRadius: GlobalMetrics.borderRadius.high,
            backgroundColor: colors.inputBg,
            justifyContent: 'center',
            paddingHorizontal: GlobalMetrics.padding.high,
            elevation: 5,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,

        },
        inputContainerOverride: {
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            borderWidth: 0,
            paddingHorizontal: 0,
        },
        inputText: {
            width: '100%',
            fontSize: RFValue(10),
            fontFamily: fonts.medium,
            color: colors.textPrimary,
        },
        btnText: {
            fontSize: RFValue(12),
            fontFamily: fonts.semiBold,
        },
        leftIcon: {
            marginRight: GlobalMetrics.margin.medium,
        },
        rightIcon: {
            marginLeft: GlobalMetrics.margin.low,
        },
        btnStyle: {
            alignSelf: "center"
        }

    });

export default DriverRegistrationStepOneContent;