import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../common/ThemeContest';
import strings from '../../units/CommonStrings';
import DriverOfflineBottomPanel from './components/DriverOfflineBottomPanel'; 
import DriverOnlineBottomOverlay from './components/DriverOnlineBottomOverlay';

const DriverOfflineScreen = () => {
    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerSide} />
                <Text style={styles.brandTitle}>{strings.driverAppName}</Text>
                <TouchableOpacity style={styles.headerSide} activeOpacity={0.7}>
                    {/* <Ionicons name="person-circle" size={metrics.iconSize.veryHigh} color={colors.textPrimary} /> */}
                </TouchableOpacity>
            </View>
            <View style={styles.mapArea}>
                <View style={styles.centerDotOuter}>
                    <View style={styles.centerDotInner} />
                </View>
                <TouchableOpacity style={styles.locationFab} activeOpacity={0.8}>
                    <Ionicons name="locate" size={metrics.iconSize.high} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>
            <DriverOnlineBottomOverlay />
            {/* <DriverOfflineBottomPanel /> */}
        </SafeAreaView>
    );
};

export default DriverOfflineScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.screenBg, 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: metrics.padding.veryHigh,
        height: metrics.windowHeight * 0.07,
    },
    headerSide: {
        width: metrics.iconSize.veryHigh, 
        alignItems: 'flex-end',
    },
    brandTitle: {
        fontSize: RFValue(16),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        letterSpacing: 1,
    },
    mapArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerDotOuter: {
        width: metrics.iconSize.veryHigh * 1.5,
        height: metrics.iconSize.veryHigh * 1.5,
        borderRadius: metrics.borderRadius.circular, 
        backgroundColor: colors.shadow, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerDotInner: {
        width: metrics.iconSize.tiny,
        height: metrics.iconSize.tiny,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.primary,
    },
    locationFab: {
        position: 'absolute',
        bottom: metrics.margin.veryHigh,
        right: metrics.margin.veryHigh,
        backgroundColor: colors.white,
        width: metrics.windowWidth * 0.13, 
        height: metrics.windowWidth * 0.13,
        borderRadius: metrics.borderRadius.circular,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 4,
    },
});