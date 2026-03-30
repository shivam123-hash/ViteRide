import React, { memo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "../common/ThemeContest";

const CommonHeader = ({
    title,
    onBackPress,
    rightIconName,
    onRightPress
}) => {
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.sideButton}
                onPress={onBackPress}
                activeOpacity={0.7}
            >
                <Ionicons name="arrow-back" size={metrics.iconSize.high} color={colors.textPrimary} />
            </TouchableOpacity>
            <View pointerEvents="none" style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.sideButton}>
                {rightIconName && (
                    <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
                        <Ionicons name={rightIconName} size={metrics.iconSize.high} color={colors.textPrimary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default memo(CommonHeader);

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: metrics.windowHeight * 0.07,
        paddingHorizontal: metrics.padding.veryHigh,
        backgroundColor: colors.background,
    },
    titleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    title: {
        fontSize: RFValue(16),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    sideButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    }
});