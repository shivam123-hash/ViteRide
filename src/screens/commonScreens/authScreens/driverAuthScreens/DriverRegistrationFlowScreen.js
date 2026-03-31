import React, { useMemo, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';

import { useTheme } from '../../../../common/ThemeContest';
import strings from '../../../../units/CommonStrings';
import CommonHeader from '../../../../components/CommonHeader';
import RegistrationStepBar from '../components/RegistrationStepBar';
import DriverRegistrationStepOneContent from './DriverRegistrationStepOne';
import DriverRegistrationStepTwoContent from './DriverRegistrationStepTwo';
import DriverRegistrationStepThreeContent from './/DriverRegistrationStepThreeContent';
import DriverRegistrationStepFourContent from './DriverRegistrationStepFourContent';
import GlobalMetrics from '../../../../units/GlobalMetricsStyles';

const DriverRegistrationFlowScreen = ({ navigation }) => {
    const { colors } = useTheme();

    const styles = useMemo(() => createStyles(colors), [colors]);

    const [currentStep, setCurrentStep] = useState(1);

    const [form, setForm] = useState({
        profilePhoto: null,
        fullLegalName: '',
        professionalHeadline: '',
        vehicleCategory: 'sedan',
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        vehicleColor: '',
        plateNumber: '',
        documents: {
            aadhaarCard: null,
            drivingLicense: null,
            registrationCertificate: null,
            insurancePolicy: null,
            profileSelfie: null,
        },
        bankName: '',
        accountNumber: '',
        ifscCode: '',
    });

    const updateField = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const updateDocument = (key, value) => {
        setForm((prev) => ({
            ...prev,
            documents: {
                ...prev.documents,
                [key]: value,
            },
        }));
    };

    const handleBackPress = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
            return;
        }
        navigation?.goBack();
    };

    const goNext = () => {
        if (currentStep < 4) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const pickProfilePhoto = async () => {
        try {
            const image = await ImagePicker.openPicker({
                mediaType: 'photo',
                cropping: true,
                width: 800,
                height: 800,
                cropperCircleOverlay: true,
                compressImageQuality: 0.85,
            });

            updateField('profilePhoto', {
                uri: image.path,
                mime: image.mime,
                width: image.width,
                height: image.height,
            });
        } catch (error) {
            if (error?.code !== 'E_PICKER_CANCELLED') {
                console.log('pickProfilePhoto error:', error);
            }
        }
    };

    const pickDocumentImage = async (documentKey) => {
        try {
            const image = await ImagePicker.openPicker({
                mediaType: 'photo',
                cropping: true,
                compressImageQuality: 0.9,
            });

            updateDocument(documentKey, {
                uri: image.path,
                mime: image.mime,
                width: image.width,
                height: image.height,
                fileName: image.filename || `${documentKey}.jpg`,
            });
        } catch (error) {
            if (error?.code !== 'E_PICKER_CANCELLED') {
                console.log('pickDocumentImage error:', error);
            }
        }
    };

    const takeSelfiePhoto = async () => {
        try {
            const image = await ImagePicker.openCamera({
                mediaType: 'photo',
                cropping: true,
                width: 800,
                height: 800,
                compressImageQuality: 0.85,
            });

            updateDocument('profileSelfie', {
                uri: image.path,
                mime: image.mime,
                width: image.width,
                height: image.height,
                fileName: image.filename || 'profile-selfie.jpg',
            });
        } catch (error) {
            if (error?.code !== 'E_PICKER_CANCELLED') {
                console.log('takeSelfiePhoto error:', error);
            }
        }
    };

    const handleFinalSubmit = () => {
        Alert.alert(
            strings.driverRegistrationHeader,
            'All 4 steps completed. Ready to submit API payload.'
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <DriverRegistrationStepOneContent
                        data={form}
                        onChangeField={updateField}
                        onUploadPhoto={pickProfilePhoto}
                        onNext={goNext}
                    />
                );

            case 2:
                return (
                    <DriverRegistrationStepTwoContent
                        data={form}
                        onChangeField={updateField}
                        onPrevious={() => setCurrentStep(1)}
                        onNext={() => setCurrentStep(3)}
                    />
                );

            case 3:
                return (
                    <DriverRegistrationStepThreeContent
                        data={form}
                        onUploadDocument={pickDocumentImage}
                        onTakeSelfie={takeSelfiePhoto}
                        onNext={() => setCurrentStep(4)}
                    />
                );

            case 4:
                return (
                    <DriverRegistrationStepFourContent
                        data={form}
                        onChangeField={updateField}
                        onSubmit={handleFinalSubmit}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            <CommonHeader
                title={strings.driverRegistrationHeader}
                onBackPress={handleBackPress}
            />

            <View style={styles.progressWrapper}>
                <RegistrationStepBar currentStep={currentStep} totalSteps={4} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
            >
                {renderStepContent()}
            </ScrollView>
        </SafeAreaView>
    );
};

const createStyles = (colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        progressWrapper: {
            paddingHorizontal: GlobalMetrics.padding.veryHigh,
            paddingBottom: GlobalMetrics.padding.medium,
            backgroundColor: colors.background,
        },
        scrollContent: {
            paddingHorizontal: GlobalMetrics.padding.veryHigh,
            paddingBottom: GlobalMetrics.padding.massive,
        },
    });

export default DriverRegistrationFlowScreen;