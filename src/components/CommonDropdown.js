import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import ColorPicker from 'react-native-wheel-color-picker';

import { useTheme } from '../common/ThemeContest';
import strings from '../units/CommonStrings';
import GlobalMetrics from '../units/GlobalMetricsStyles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PRESET_COLORS = [
    '#111111',
    '#FFFFFF',
    '#A7A7A7',
    '#C62828',
    '#1565C0',
    '#2E7D32',
    '#F9A825',
    '#6A1B9A',
];

const CommonDropdown = ({
    value,
    placeholder,
    options = [],
    onSelect,
    containerStyle,
    showSelectedDot = false,
    mode = 'default', 
    title,
    isOpen,
    onToggle,
    minYear = 1990,
    maxYear = new Date().getFullYear(),
    disabled = false,
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [draftColor, setDraftColor] = useState(value || '#111111');

    const { colors, fonts } = useTheme();

    const styles = useMemo(() => createStyles(colors, fonts), [colors, fonts]);

    const dropdownOpen = typeof isOpen === 'boolean' ? isOpen : internalOpen;

    const selectedOption = options.find((item) => item.value === value);

    const yearOptions = useMemo(
        () =>
            Array.from(
                { length: maxYear - minYear + 1 },
                (_, index) => String(maxYear - index)
            ),
        [minYear, maxYear]
    );

    useEffect(() => {
        if (mode === 'color' && value) {
            setDraftColor(value);
        }
    }, [mode, value]);

    const toggleDropdown = () => {
        if (disabled) return;

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        const nextValue = !dropdownOpen;

        if (typeof isOpen === 'boolean') {
            onToggle?.(nextValue);
        } else {
            setInternalOpen(nextValue);
            onToggle?.(nextValue);
        }
    };

    const closeDropdown = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (typeof isOpen === 'boolean') {
            onToggle?.(false);
        } else {
            setInternalOpen(false);
            onToggle?.(false);
        }
    };

    const handleOptionSelect = (selectedValue) => {
        onSelect?.(selectedValue);
        closeDropdown();
    };

    const handleApplyColor = () => {
        onSelect?.(draftColor?.toUpperCase());
        closeDropdown();
    };

    const displayValue = useMemo(() => {
        if (mode === 'color') {
            return value ? value.toUpperCase() : placeholder;
        }

        if (mode === 'year') {
            return value || placeholder;
        }

        return selectedOption?.label || placeholder;
    }, [mode, value, placeholder, selectedOption]);

    const renderDefaultOptions = () => (
        <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={styles.optionsScroll}
            contentContainerStyle={styles.optionsContent}
        >
            {options.length > 0 ? (
                options.map((item) => {
                    const isSelected = item.value === value;

                    return (
                        <TouchableOpacity
                            key={item.value}
                            activeOpacity={0.85}
                            style={[
                                styles.optionRow,
                                isSelected && styles.optionRowSelected,
                            ]}
                            onPress={() => handleOptionSelect(item.value)}
                        >
                            <View style={styles.rowCenterFlex}>
                                {item.dotColor ? (
                                    <View
                                        style={[
                                            styles.optionDot,
                                            { backgroundColor: item.dotColor },
                                        ]}
                                    />
                                ) : null}

                                <Text
                                    style={[
                                        styles.optionText,
                                        isSelected && styles.optionTextSelected,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </View>

                            {isSelected ? (
                                <Ionicons
                                    name="checkmark"
                                    size={GlobalMetrics.iconSize.low}
                                    color={colors.primary}
                                />
                            ) : null}
                        </TouchableOpacity>
                    );
                })
            ) : (
                <Text style={styles.emptyStateText}>
                    {strings.noOptionsAvailable}
                </Text>
            )}
        </ScrollView>
    );

    const renderYearPicker = () => (
        <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={styles.optionsScroll}
            contentContainerStyle={styles.yearGrid}
        >
            {yearOptions.map((year) => {
                const isSelected = value === year;

                return (
                    <TouchableOpacity
                        key={year}
                        activeOpacity={0.85}
                        style={[
                            styles.yearChip,
                            isSelected && styles.yearChipSelected,
                        ]}
                        onPress={() => handleOptionSelect(year)}
                    >
                        <Text
                            style={[
                                styles.yearChipText,
                                isSelected && styles.yearChipTextSelected,
                            ]}
                        >
                            {year}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );

    const renderColorPicker = () => (
        <View style={styles.colorPickerWrap}>
            <View style={styles.colorTopRow}>
                <View style={styles.rowCenterFlex}>
                    <View
                        style={[
                            styles.selectedColorPreview,
                            { backgroundColor: draftColor || '#111111' },
                        ]}
                    />
                    <Text style={styles.colorCodeText}>
                        {(draftColor || '#111111').toUpperCase()}
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.applyColorBtn}
                    onPress={handleApplyColor}
                >
                    <Ionicons
                        name="checkmark"
                        size={GlobalMetrics.iconSize.low}
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.colorWheelContainer}>
                <ColorPicker
                    color={draftColor || '#111111'}
                    onColorChange={setDraftColor}
                    onColorChangeComplete={setDraftColor}
                    thumbSize={24}
                    sliderSize={24}
                    noSnap
                    row={false}
                    swatches={false}
                />
            </View>

            <View style={styles.swatchRow}>
                {PRESET_COLORS.map((item) => {
                    const isSelected = (draftColor || '').toLowerCase() === item.toLowerCase();

                    return (
                        <TouchableOpacity
                            key={item}
                            activeOpacity={0.85}
                            style={[
                                styles.swatchItem,
                                { backgroundColor: item },
                                isSelected && styles.swatchItemSelected,
                            ]}
                            onPress={() => setDraftColor(item)}
                        >
                            {isSelected ? (
                                <Ionicons
                                    name="checkmark"
                                    size={12}
                                    color={item === '#FFFFFF' ? colors.textPrimary : colors.white}
                                />
                            ) : null}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                activeOpacity={0.85}
                style={[
                    styles.fieldContainer,
                    disabled && styles.fieldContainerDisabled,
                    containerStyle,
                ]}
                onPress={toggleDropdown}
                disabled={disabled}
            >
                <Text
                    style={[
                        styles.fieldValueText,
                        !value && !selectedOption && styles.fieldPlaceholderText,
                        disabled && styles.disabledText,
                    ]}
                    numberOfLines={1}
                >
                    {displayValue}
                </Text>

                <View style={styles.rowCenter}>
                    {showSelectedDot && mode === 'color' && value ? (
                        <View
                            style={[
                                styles.fieldColorDot,
                                { backgroundColor: value },
                            ]}
                        />
                    ) : null}

                    <Ionicons
                        name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={disabled ? colors.textLight : colors.textSecondary}
                    />
                </View>
            </TouchableOpacity>

            {dropdownOpen ? (
                <View style={styles.expandContainer}>
                    <Text style={styles.expandTitle}>
                        {title || strings.selectOptionTitle}
                    </Text>

                    {mode === 'year'
                        ? renderYearPicker()
                        : mode === 'color'
                            ? renderColorPicker()
                            : renderDefaultOptions()}
                </View>
            ) : null}
        </View>
    );
};

const createStyles = (colors, fonts) =>
    StyleSheet.create({
        wrapper: {
            width: '100%',
        },
        rowCenter: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rowCenterFlex: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },
        fieldContainer: {
            height: 54,
            borderRadius: GlobalMetrics.borderRadius.high,
            backgroundColor: colors.inputBg,
            paddingHorizontal: GlobalMetrics.padding.high,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 2,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
        },
        fieldContainerDisabled: {
            opacity: 0.6,
        },
        fieldValueText: {
            flex: 1,
            fontSize: RFValue(12),
            fontFamily: fonts.medium,
            color: colors.textPrimary,
            paddingRight: GlobalMetrics.padding.medium,
        },
        fieldPlaceholderText: {
            color: colors.textLight,
        },
        disabledText: {
            color: colors.textLight,
        },
        fieldColorDot: {
            width: 12,
            height: 12,
            borderRadius: GlobalMetrics.borderRadius.circular,
            marginRight: GlobalMetrics.margin.medium,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.08)',
        },
        expandContainer: {
            marginTop: GlobalMetrics.margin.low,
            borderRadius: GlobalMetrics.borderRadius.extraHigh,
            backgroundColor: colors.white,
            padding: GlobalMetrics.padding.high,
            elevation: 3,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            borderWidth: 1,
            borderColor: '#EFEFEF',
        },
        expandTitle: {
            fontSize: RFValue(12),
            fontFamily: fonts.bold,
            color: colors.textSecondary,
            marginBottom: GlobalMetrics.margin.medium,
            letterSpacing: 0.8,
        },
        optionsScroll: {
            maxHeight: 220,
        },
        optionsContent: {
            paddingBottom: GlobalMetrics.padding.low,
        },
        optionRow: {
            minHeight: 48,
            borderRadius: GlobalMetrics.borderRadius.high,
            paddingHorizontal: GlobalMetrics.padding.high,
            marginBottom: GlobalMetrics.margin.medium,
            backgroundColor: '#F7F7F7',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        optionRowSelected: {
            backgroundColor: '#F3F5FF',
        },
        optionText: {
            fontSize: RFValue(14),
            fontFamily: fonts.medium,
            color: colors.textPrimary,
        },
        optionTextSelected: {
            color: colors.primary,
        },
        optionDot: {
            width: 12,
            height: 12,
            borderRadius: GlobalMetrics.borderRadius.circular,
            marginRight: GlobalMetrics.margin.medium,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.08)',
        },
        emptyStateText: {
            textAlign: 'center',
            fontSize: RFValue(13),
            fontFamily: fonts.medium,
            color: colors.textSecondary,
            marginTop: GlobalMetrics.margin.high,
        },
        yearGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingBottom: GlobalMetrics.padding.low,
        },
        yearChip: {
            width: '31%',
            minHeight: 42,
            borderRadius: GlobalMetrics.borderRadius.high,
            backgroundColor: '#F7F7F7',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: GlobalMetrics.margin.medium,
        },
        yearChipSelected: {
            backgroundColor: colors.textPrimary,
        },
        yearChipText: {
            fontSize: RFValue(13),
            fontFamily: fonts.semiBold,
            color: colors.textPrimary,
        },
        yearChipTextSelected: {
            color: colors.white,
        },
        colorPickerWrap: {
            width: '100%',
        },
        colorTopRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: GlobalMetrics.margin.high,
        },
        selectedColorPreview: {
            width: 18,
            height: 18,
            borderRadius: GlobalMetrics.borderRadius.circular,
            marginRight: GlobalMetrics.margin.medium,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.12)',
        },
        colorCodeText: {
            fontSize: RFValue(13),
            fontFamily: fonts.semiBold,
            color: colors.textPrimary,
        },
        applyColorBtn: {
            width: 34,
            height: 34,
            borderRadius: GlobalMetrics.borderRadius.circular,
            backgroundColor: colors.textPrimary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        colorWheelContainer: {
            width: '100%',
            height: 250,
            marginBottom: GlobalMetrics.margin.high,
        },
        swatchRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: GlobalMetrics.margin.medium,
        },
        swatchItem: {
            width: 28,
            height: 28,
            borderRadius: GlobalMetrics.borderRadius.circular,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.10)',
            alignItems: 'center',
            justifyContent: 'center',
        },
        swatchItemSelected: {
            borderWidth: 2,
            borderColor: colors.textPrimary,
        },
    });

export default CommonDropdown;