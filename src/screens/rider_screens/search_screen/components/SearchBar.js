// src/components/SearchBar.js
import React, { useState, useRef, useMemo } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import CommonColors from '../../../../units/CommonColor';
import { useTheme } from "../../../../common/ThemeContest";
import { RFValue } from 'react-native-responsive-fontsize';

const SearchIcon = ({ color = CommonColors.background , styles}) => (
    <View style={styles.searchIconWrapper}>
        <View style={[styles.searchCircle, { borderColor: color }]} />
        <View style={[styles.searchHandle, { backgroundColor: color }]} />
    </View>
);

const SearchBar = ({ value, onChangeText, onSubmit, placeholder = "Where to go?" }) => {
    const { fonts, metrics } = useTheme();
    // Wrap styles in useMemo so it efficiently injects global theme objects 
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const [isFocused, setIsFocused] = useState(false);
    const shadowAnim = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(shadowAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(shadowAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const shadowOpacity = shadowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.04, 0.12],
    });

    const elevation = shadowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 12],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    shadowOpacity,
                    elevation,
                },
            ]}
        >
            <View style={styles.inner}>
                {/* Search Icon */}
                <SearchIcon color={isFocused ? CommonColors.primary : CommonColors.border}  styles={styles}/>

                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={CommonColors.border}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onSubmitEditing={onSubmit}
                    returnKeyType="search"
                />

                {value && value.length > 0 && (
                    <TouchableOpacity
                        onPress={() => onChangeText?.('')}
                        style={styles.clearButton}
                        activeOpacity={0.7}
                    >
                        <View style={styles.clearIcon}>
                            <View style={styles.clearLine1} />
                            <View style={styles.clearLine2} />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </Animated.View>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    container: {
        backgroundColor: CommonColors.background,
        borderRadius: metrics.borderRadius.medium,
        borderWidth: RFValue(1),
        borderColor: CommonColors.border,
        shadowColor: CommonColors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: metrics.borderRadius.extraHigh * 1.75,
        paddingVertical: metrics.padding.tiny,
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: metrics.padding.high,
        paddingVertical: metrics.padding.medium,
        gap: metrics.padding.medium,
    },
    searchIconWrapper: {
        width: metrics.windowWidth * 0.12,
        height: metrics.windowWidth * 0.12,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchCircle: {
        width: metrics.windowWidth * 0.1,
        height: metrics.windowWidth * 0.1,
        borderRadius: metrics.borderRadius.medium,
        borderWidth: RFValue(2),
        borderColor: CommonColors.primary,
        position: 'absolute',
        top: RFValue(0),
        left: RFValue(0),
    },
    searchHandle: {
        width: RFValue(6),
        height: RFValue(2),
        backgroundColor: CommonColors.primary,
        borderRadius: RFValue(1),
        position: 'absolute',
        bottom: RFValue(1),
        right: RFValue(1),
        transform: [{ rotate: '45deg' }],
    },
    input: {
        flex: 1, fontSize: RFValue(15),
        fontFamily: fonts.regular,
        color: CommonColors.background,
        padding: metrics.padding.none,
        margin: metrics.margin.none,
    },
    clearButton: {
        padding: metrics.padding.tiny,
    },
    clearIcon: {
        width: metrics.windowWidth * 0.12,
        height: metrics.windowWidth * 0.12,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearLine1: {
        position: 'absolute',
        width: metrics.windowWidth * 0.12,
        height: 1.5,
        backgroundColor: CommonColors.border,
        borderRadius: metrics.borderRadius.none,
        transform: [{ rotate: '45deg' }],
    },
    clearLine2: {
        position: 'absolute',
        width: metrics.windowWidth * 0.12,
        height: 1.5,
        backgroundColor: CommonColors.border,
        borderRadius: metrics.borderRadius.none,
        transform: [{ rotate: '-45deg' }],
    },
});

export default SearchBar;