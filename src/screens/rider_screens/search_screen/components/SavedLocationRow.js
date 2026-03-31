import React, { useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';



const SavedLocationRow = ({ item, onPress, isLast }) => (
    <TouchableOpacity
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
    </TouchableOpacity>
);


export default SavedLocationRow;

const styles = StyleSheet.create({
    // Saved Locations
    savedList: {
        backgroundColor: CommonColors.white,
        borderRadius: 16,
        paddingHorizontal: 4,
        shadowColor: CommonColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
    },
    savedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    savedRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: `${CommonColors.border}60`,
    },
    savedRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        flex: 1,
    },
    savedRowText: {
        flex: 1,
    },
    savedRowLabel: {
        fontFamily: 'Manrope-Bold',
        fontWeight: '700',
        fontSize: 15,
        color: CommonColors.primary,
        marginBottom: 2,
    },
    savedRowAddress: {
        fontFamily: 'Inter',
        fontSize: 12,
        color: CommonColors.textSecondary,
    },
});