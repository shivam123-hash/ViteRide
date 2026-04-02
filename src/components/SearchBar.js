import React, { useState, useRef } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import CommonColors from '../units/CommonColor';

const SearchIcon = ({ color = CommonColors.background }) => (
    <View style={styles.searchIconWrapper}>
        <View style={[styles.searchCircle, { borderColor: color }]} />
        <View style={[styles.searchHandle, { backgroundColor: color }]} />
    </View>
);

const SearchBar = ({ value, onChangeText, onSubmit, placeholder = "Where to go?" }) => {
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
                <SearchIcon color={isFocused ? CommonColors.primary : CommonColors.border} />
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: CommonColors.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: CommonColors.border,
        shadowColor: CommonColors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 40,
        paddingVertical: 4,
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    searchIconWrapper: {
        width: 20,
        height: 20,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchCircle: {
        width: 13,
        height: 13,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: CommonColors.primary,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    searchHandle: {
        width: 6,
        height: 2,
        backgroundColor: CommonColors.primary,
        borderRadius: 1,
        position: 'absolute',
        bottom: 5,
        right: 3,
        transform: [{ rotate: '45deg' }],
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Inter',
        fontWeight: '500',
        color: CommonColors.black,
        padding: 0,
        margin: 0,
    },
    clearButton: {
        padding: 4,
    },
    clearIcon: {
        width: 16,
        height: 16,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearLine1: {
        position: 'absolute',
        width: 12,
        height: 1.5,
        backgroundColor: CommonColors.border,
        borderRadius: 1,
        transform: [{ rotate: '45deg' }],
    },
    clearLine2: {
        position: 'absolute',
        width: 12,
        height: 1.5,
        backgroundColor: CommonColors.border,
        borderRadius: 1,
        transform: [{ rotate: '-45deg' }],
    },
});

export default SearchBar;