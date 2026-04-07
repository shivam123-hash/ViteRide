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
import DriverRegistrationStepThreeContent from './DriverRegistrationStepThreeContent';
import DriverRegistrationStepFourContent from './DriverRegistrationStepFourContent';
import GlobalMetrics from '../../../../units/GlobalMetricsStyles';
import { useDispatch, useSelector } from 'react-redux';
import { becomeDriver } from '../../../../redux/features/profile/BecomeDriverSlice';
import { showMessage } from '../../../../redux/features/messageSlice/messageSlice';

const DriverRegistrationFlowScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.becomeDriver);
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
        if (currentStep === 1 && !form.fullLegalName?.trim()) {
            dispatch(showMessage({ text: 'Please enter your full legal name.', type: 'error' }));
            return;
        }

        if (
            currentStep === 2 && (
                !form.vehicleCategory?.trim() ||
                !form.vehicleMake?.trim() ||
                !form.vehicleModel?.trim() ||
                !form.vehicleYear?.trim() ||
                !form.vehicleColor?.trim() ||
                !form.plateNumber?.trim() 
            )
        ) {
            dispatch(showMessage({ text: 'Please fill all vehicle details.', type: 'error' }));
            return;
        }

        if (
            currentStep === 3 && (
                !form.documents.aadhaarCard ||
                !form.documents.drivingLicense ||
                !form.documents.registrationCertificate ||
                !form.documents.insurancePolicy
            )
        ) {
            dispatch(showMessage({ text: 'Please upload all required documents.', type: 'error' }));
            return;
        }

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

    const handleFinalSubmit = async () => {
        if (loading) return;
        try {
            const response = await dispatch(
                becomeDriver({
                    fullLegalName: form.fullLegalName,
                    professionalHeadline: form.professionalHeadline,
                    profilePhoto: form.profilePhoto,
                    vehicleCategory: form.vehicleCategory,
                    vehicleMake: form.vehicleMake,
                    vehicleModel: form.vehicleModel,
                    vehicleYear: form.vehicleYear,
                    vehicleColor: form.vehicleColor,
                    plateNumber: form.plateNumber,
                    documents: form.documents,
                    bankName: form.bankName,
                    accountNumber: form.accountNumber,
                    ifscCode: form.ifscCode,

                })
            ).unwrap();

            console.log('Driver registration response:', response);

            dispatch(showMessage({
                text: response?.message || 'Driver registration submitted successfully!',
                type: 'success',
            }));

            navigation?.goBack();

        } catch (error) {
            console.log('Driver registration error:', error);
            dispatch(showMessage({
                text: typeof error === 'string' ? error : 'Unable to submit registration.',
                type: 'error',
            }));
        }
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
                        onNext={goNext}
                    />
                );

            case 3:
                return (
                    <DriverRegistrationStepThreeContent
                        data={form}
                        onUploadDocument={pickDocumentImage}
                        onTakeSelfie={takeSelfiePhoto}
                        onNext={goNext}
                    />
                );

            case 4:
                return (
                    <DriverRegistrationStepFourContent
                        data={form}
                        onChangeField={updateField}
                        onSubmit={handleFinalSubmit}
                        loading={loading}
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