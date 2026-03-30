import React, { memo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "../../../../common/ThemeContest";

const MenuRowItem = ({ item, isLast }) => {
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    return (
        <View>
            <TouchableOpacity style={styles.menuRow} activeOpacity={0.7} onPress={item.onPress}>
                <View style={styles.iconBox}>
                    <Ionicons name={item.icon} size={metrics.iconSize.medium} color={colors.textPrimary} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={metrics.iconSize.medium} color="#D1D5DB" />
            </TouchableOpacity>
            {!isLast && <View style={styles.divider} />}
        </View>
    );
};

export default memo(MenuRowItem);

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: metrics.padding.high,
        paddingVertical: metrics.padding.medium,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: "#F3F4F6",
        borderRadius: metrics.borderRadius.medium,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: metrics.margin.high,
    },
    menuTitle: {
        flex: 1,
        fontSize: RFValue(13),
        fontFamily: fonts.semiBold,
        color: colors.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginLeft: 75,
        marginRight: metrics.margin.high,
    },
});