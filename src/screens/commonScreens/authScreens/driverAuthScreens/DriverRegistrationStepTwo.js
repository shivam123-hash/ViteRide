import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../../../../common/ThemeContest';
import strings from '../../../../units/CommonStrings';
import CommonBtn from '../../../../components/CommonBtn';
import CommonInput from '../../../../components/CommonInput';
import CommonDropdown from '../../../../components/CommonDropdown';
import GlobalMetrics from '../../../../units/GlobalMetricsStyles';

const DriverRegistrationStepTwoContent = ({
    data,
    onChangeField,
    onPrevious,
    onNext,
}) => {
    const { colors, fonts } = useTheme();
    const styles = useMemo(() => createStyles(colors, fonts), [colors, fonts]);

    const [openField, setOpenField] = useState(null);

    const categoryOptions = [
        { key: 'sedan', label: strings.vehicleSedan, icon: 'car-sport-outline' },
        { key: 'auto', label: strings.vehicleAuto, icon: 'car-outline' },
        { key: 'bike', label: strings.vehicleBike, icon: 'bicycle-outline' },
        { key: 'mini', label: strings.vehicleMini, icon: 'bus-outline' },
        { key: 'suv', label: strings.vehicleSuv, icon: 'car-outline' },
    ];

    const makeOptions = [
        { label: strings.vehicleBrandToyota, value: 'toyota' },
        { label: strings.vehicleBrandHonda, value: 'honda' },
        { label: strings.vehicleBrandMercedes, value: 'mercedes' },
    ];

    const modelOptionsMap = {
        toyota: [
            { label: 'Corolla', value: 'corolla' },
            { label: 'Camry', value: 'camry' },
            { label: 'Innova', value: 'innova' },
            { label: 'Fortuner', value: 'fortuner' },
        ],
        honda: [
            { label: 'City', value: 'city' },
            { label: 'Amaze', value: 'amaze' },
            { label: 'Civic', value: 'civic' },
            { label: 'Elevate', value: 'elevate' },
        ],
        mercedes: [
            { label: 'E-Class', value: 'e_class' },
            { label: 'C-Class', value: 'c_class' },
            { label: 'GLA', value: 'gla' },
            { label: 'GLC', value: 'glc' },
        ],
    };

    const modelOptions = modelOptionsMap[data.vehicleMake] || [];

    const handleToggleField = (fieldKey, nextValue) => {
        setOpenField(nextValue ? fieldKey : null);
    };

    const handleMakeSelect = (value) => {
        onChangeField('vehicleMake', value);
        onChangeField('vehicleModel', '');
    };

    return (
        <View>
            <Text style={styles.title}>{strings.vehicleInformationTitle}</Text>

            <View style={styles.card}>
                <Text style={styles.label}>{strings.vehicleCategoryLabel}</Text>

                <View style={styles.categoryGrid}>
                    {categoryOptions.map((item) => {
                        const isSelected = data.vehicleCategory === item.key;

                        return (
                            <TouchableOpacity
                                key={item.key}
                                activeOpacity={0.85}
                                style={[
                                    styles.categoryItem,
                                    isSelected && styles.categoryItemSelected,
                                ]}
                                onPress={() => onChangeField('vehicleCategory', item.key)}
                            >
                                <Ionicons
                                    name={item.icon}
                                    size={18}
                                    color={isSelected ? colors.white : colors.textPrimary}
                                />
                                <Text
                                    style={[
                                        styles.categoryLabel,
                                        isSelected && styles.categoryLabelSelected,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings.vehicleMakeLabel}</Text>
                    <CommonDropdown
                        value={data.vehicleMake}
                        placeholder={strings.vehicleMakePlaceholder}
                        options={makeOptions}
                        title={strings.vehicleMakeLabel}
                        isOpen={openField === 'vehicleMake'}
                        onToggle={(next) => handleToggleField('vehicleMake', next)}
                        onSelect={handleMakeSelect}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings.vehicleModelLabel}</Text>
                    <CommonDropdown
                        value={data.vehicleModel}
                        placeholder={strings.vehicleModelPlaceholder}
                        options={modelOptions}
                        title={strings.vehicleModelLabel}
                        isOpen={openField === 'vehicleModel'}
                        onToggle={(next) => handleToggleField('vehicleModel', next)}
                        onSelect={(value) => onChangeField('vehicleModel', value)}
                        disabled={!data.vehicleMake}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings.vehicleYearLabel}</Text>
                    <CommonDropdown
                        value={data.vehicleYear}
                        placeholder={strings.vehicleYearPlaceholder}
                        title={strings.vehicleYearLabel}
                        mode="year"
                        minYear={2000}
                        maxYear={new Date().getFullYear()}
                        isOpen={openField === 'vehicleYear'}
                        onToggle={(next) => handleToggleField('vehicleYear', next)}
                        onSelect={(value) => onChangeField('vehicleYear', value)}
                    
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings.vehicleColorLabel}</Text>
                    <CommonDropdown
                        value={data.vehicleColor}
                        placeholder={strings.vehicleColorPlaceholder}
                        title={strings.vehicleColorLabel}
                        mode="color"
                        showSelectedDot
                        isOpen={openField === 'vehicleColor'}
                        onToggle={(next) => handleToggleField('vehicleColor', next)}
                        onSelect={(value) => onChangeField('vehicleColor', value)}
                    />
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>{strings.vehiclePlateNumberLabel}</Text>
                    <View style={styles.inputShell}>
                        <CommonInput
                            value={data.plateNumber}
                            onChangeText={(value) => onChangeField('plateNumber', value)}
                            placeholder={strings.vehiclePlateNumberPlaceholder}
                            placeholderTextColor={colors.textLight}
                            autoCapitalize="characters"
                            style={styles.inputContainerOverride}
                            textInput={styles.inputText}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.actionRow}>
                <View style={styles.halfButton}>
                    <CommonBtn
                        title={strings.registrationPrevious}
                        backgroundColor={colors.white}
                        textColor={colors.textPrimary}
                        height={52}
                        borderRadius={GlobalMetrics.borderRadius.high}
                        containerStyle={styles.previousBtn}
                        textStyle={styles.btnText}
                        leftComponent={
                            <Ionicons
                                name="chevron-back"
                                size={GlobalMetrics.iconSize.low}
                                color={colors.textPrimary}
                                style={styles.leftIcon}
                            />
                        }
                        onPress={onPrevious}
                    />
                </View>

                <View style={styles.halfButton}>
                    <CommonBtn
                        title={strings.registrationNextStep}
                        backgroundColor={colors.textPrimary}
                        textColor={colors.white}
                        height={52}
                        borderRadius={GlobalMetrics.borderRadius.high}
                        textStyle={styles.btnText}
                        rightComponent={
                            <Ionicons
                                name="chevron-forward"
                                size={GlobalMetrics.iconSize.low}
                                color={colors.white}
                                style={styles.rightIcon}
                            />
                        }
                        onPress={onNext}
                    />
                </View>
            </View>
        </View>
    );
};

const createStyles = (colors, fonts) =>
    StyleSheet.create({
        title: {
            fontSize: RFValue(28),
            fontFamily: fonts.bold,
            color: colors.textPrimary,
            marginBottom: GlobalMetrics.margin.high,
        },
        card: {
            backgroundColor: colors.white,
            borderRadius: GlobalMetrics.borderRadius.extraHigh,
            padding: GlobalMetrics.padding.veryHigh,
            elevation: 2,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
        },
        label: {
            fontSize: RFValue(12),
            fontFamily: fonts.bold,
            color: colors.textSecondary,
            letterSpacing: 1,
            marginBottom: GlobalMetrics.margin.low,
        },
        categoryGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: GlobalMetrics.margin.high,
        },
        categoryItem: {
            width: '48%',
            minHeight: 72,
            borderRadius: GlobalMetrics.borderRadius.high,
            backgroundColor: colors.inputBg,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: GlobalMetrics.margin.medium,
            elevation: 2,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
        },
        categoryItemSelected: {
            backgroundColor: colors.textPrimary,
        },
        categoryLabel: {
            marginTop: GlobalMetrics.margin.low,
            fontSize: RFValue(10),
            fontFamily: fonts.bold,
            color: colors.textSecondary,
        },
        categoryLabelSelected: {
            color: colors.white,
        },
        fieldGroup: {
            marginBottom: GlobalMetrics.margin.medium,
        },
        inputShell: {
            height: 54,
            borderRadius: GlobalMetrics.borderRadius.high,
            backgroundColor: colors.inputBg,
            justifyContent: 'center',
            paddingHorizontal: GlobalMetrics.padding.high,
            elevation:3,
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
            fontSize: RFValue(12),
            fontFamily: fonts.medium,
            color: colors.textPrimary,
        },
        actionRow: {
            flexDirection: 'row',
            gap: GlobalMetrics.margin.high,
            marginTop: GlobalMetrics.margin.extraHigh,
        },
        halfButton: {
            flex: 1,
        },
        previousBtn: {
            borderWidth: 1,
            borderColor: '#E6E6E6',
        },
        btnText: {
            fontSize: RFValue(13),
            fontFamily: fonts.semiBold,
        },
        leftIcon: {
            marginRight: GlobalMetrics.margin.low,
        },
        rightIcon: {
            marginLeft: GlobalMetrics.margin.low,
        },
    });

export default DriverRegistrationStepTwoContent;