import React, { useRef,useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import { useTheme } from "../../../../common/ThemeContest";
import { RFValue } from 'react-native-responsive-fontsize';


const SavedLocationRow = ({ item, onPress, isLast }) => {
     const { fonts, metrics } = useTheme();
            const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);
       
   return ( <TouchableOpacity
        style={[styles.savedRow, !isLast && styles.savedRowBorder]}
        onPress={() => onPress?.(item)}
        activeOpacity={0.7}
    >
        <View style={styles.savedRowLeft}>
            <MaterialIcons name={item.icon} size={22} color={CommonColors.primary} />
            <View style={styles.savedRowText}>
                <Text style={styles.savedRowLabel}>{item.label}</Text>
                <Text style={styles.savedRowAddress}>{item.address}</Text>
            </View>
        </View>
        <MaterialIcons name="chevron-right" size={22} color={CommonColors.border} />
    </TouchableOpacity>)
};


export default SavedLocationRow;

const createStyles = (fonts, metrics) =>StyleSheet.create({
    // Saved Locations
    savedList: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        paddingHorizontal: metrics.padding.tiny,
        shadowColor: CommonColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: metrics.borderRadius.medium,
        elevation: RFValue(2),
    },
    savedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: metrics.padding.high,
        paddingHorizontal: metrics.padding.high,
    },
    savedRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: `${CommonColors.border}60`,
    },
    savedRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:metrics.padding.high,
        flex: 1,
    },
    savedRowText: {
        flex: 1,
    },
    savedRowLabel: {
        fontSize: RFValue(12),
        fontFamily: fonts.bold,
        color: CommonColors.primary,
        marginBottom: 2,
    },
    savedRowAddress: {
        fontSize: RFValue(10),
        fontFamily: fonts.regular,
        color: CommonColors.textSecondary,
    },
});