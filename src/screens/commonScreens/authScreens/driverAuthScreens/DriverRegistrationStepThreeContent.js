import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../../../../common/ThemeContest';
import strings from '../../../../units/CommonStrings';
import CommonBtn from '../../../../components/CommonBtn';
import DocumentUploadCard from '../components/DocumentUploadCard';
import GlobalMetrics from '../../../../units/GlobalMetricsStyles';

const DriverRegistrationStepThreeContent = ({
    data,
    onUploadDocument,
    onTakeSelfie,
    onNext,
}) => {
    const { colors, fonts } = useTheme();
    const styles = useMemo(() => createStyles(colors, fonts), [colors, fonts]);

    return (
        <View>
            <Text style={styles.title}>{strings.driverUploadDocumentsTitle}</Text>
            <Text style={styles.subtitle}>{strings.driverUploadDocumentsSubtitle}</Text>

            <DocumentUploadCard
                iconName="card-outline"
                title={strings.aadhaarCardTitle}
                description={strings.aadhaarCardDesc}
                file={data.documents.aadhaarCard}
                onPress={() => onUploadDocument('aadhaarCard')}
            />

            <DocumentUploadCard
                iconName="card-outline"
                title={strings.drivingLicenseTitle}
                description={strings.drivingLicenseDesc}
                file={data.documents.drivingLicense}
                onPress={() => onUploadDocument('drivingLicense')}
            />

            <DocumentUploadCard
                iconName="document-text-outline"
                title={strings.registrationCertificateTitle}
                description={strings.registrationCertificateDesc}
                file={data.documents.registrationCertificate}
                onPress={() => onUploadDocument('registrationCertificate')}
            />

            <DocumentUploadCard
                iconName="shield-checkmark-outline"
                title={strings.insurancePolicyTitle}
                description={strings.insurancePolicyDesc}
                file={data.documents.insurancePolicy}
                onPress={() => onUploadDocument('insurancePolicy')}
            />

            {/* <View style={styles.selfieCard}>
                <View style={styles.selfieIconCircle}>
                    <Ionicons
                        name="camera"
                        size={32}
                        color={colors.textPrimary}
                    />
                </View>

                <Text style={styles.selfieTitle}>{strings.profileSelfieTitle}</Text>
                <Text style={styles.selfieDesc}>{strings.profileSelfieDesc}</Text>

                <CommonBtn
                    title={strings.driverTakePhoto}
                    backgroundColor={colors.textPrimary}
                    textColor={colors.white}
                    height={52}
                    borderRadius={GlobalMetrics.borderRadius.high}
                    textStyle={styles.btnText}
                    leftComponent={
                        <Ionicons
                            name="camera"
                            size={GlobalMetrics.iconSize.low}
                            color={colors.white}
                            style={styles.leftIcon}
                        />
                    }
                    onPress={onTakeSelfie}
                />
            </View> */}

            <CommonBtn
                title={strings.driverSubmitForReview}
                backgroundColor={colors.textPrimary}
                textColor={colors.white}
                height={56}
                borderRadius={GlobalMetrics.borderRadius.high}
                textStyle={styles.btnText}
                onPress={onNext}
            />

            <Text style={styles.reviewTimeText}>{strings.driverEstimatedReviewTime}</Text>
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
            fontSize: RFValue(13),
            lineHeight: RFValue(20),
            fontFamily: fonts.regular,
            color: colors.textSecondary,
            marginBottom: GlobalMetrics.margin.extraHigh,
        },
        selfieCard: {
            backgroundColor: colors.white,
            borderRadius: GlobalMetrics.borderRadius.extraHigh,
            padding: GlobalMetrics.padding.veryHigh,
            alignItems: 'center',
            marginBottom: GlobalMetrics.margin.extraHigh,
        },
        selfieIconCircle: {
            width: 110,
            height: 110,
            borderRadius: GlobalMetrics.borderRadius.circular,
            backgroundColor: '#F1F1F1',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: GlobalMetrics.margin.high,
        },
        selfieTitle: {
            fontSize: RFValue(22),
            fontFamily: fonts.bold,
            color: colors.textPrimary,
            marginBottom: GlobalMetrics.margin.low,
        },
        selfieDesc: {
            textAlign: 'center',
            fontSize: RFValue(12),
            lineHeight: RFValue(18),
            fontFamily: fonts.regular,
            color: colors.textSecondary,
            marginBottom: GlobalMetrics.margin.extraHigh,
        },
        btnText: {
            fontSize: RFValue(13),
            fontFamily: fonts.semiBold,
        },
        leftIcon: {
            marginRight: GlobalMetrics.margin.medium,
        },
        reviewTimeText: {
            textAlign: 'center',
            fontSize: RFValue(10),
            fontFamily: fonts.bold,
            color: colors.textLight,
            letterSpacing: 0.8,
            marginTop: GlobalMetrics.margin.high,
        },
    });

export default DriverRegistrationStepThreeContent;