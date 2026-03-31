// src/components/TopAppBar.js
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    StatusBar,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import CommonStrings from '../../../../units/CommonStrings';

const TopAppBar = ({ onMenuPress }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />
            <View style={styles.leftSection}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={onMenuPress}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name="menu" size={26} color={CommonColors.primary} />
                </TouchableOpacity>
                <Text style={styles.logo}>{CommonStrings.appName}</Text>
            </View>

            {/* Avatar */}
            <TouchableOpacity activeOpacity={0.85} style={styles.avatarWrapper}>
                <Image
                    source={{
                        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPjGDwqCF7Y1yKB1X_iDaH1A1kybEqDt2DwSSGgNCD-Xk5usEX-r_DPQEyVTy4--O15_5k361MpHpSC3itdq9703ZUB0dwIe94BFl6ySdc958vSEcnjF-jyvHXVbqtGIPtj4nonq5GW0rF4jsdxmW5-cCOEDSW4CIxB4DJm7jJx7AbPscKLrdjh5I6iHLucTqnhtpVUd6W-JGksTdxhFy-LgHsAwqF8InbocTh1oOGuWZIyd6x8UOgst_mr1ypMReaOgq_aSAzWlfC',
                    }}
                    style={styles.avatar}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: CommonColors.background,
        zIndex: 50,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    menuButton: {
        padding: 4,
    },
    menuIcon: {
        gap: 4,
        alignItems: 'flex-end',
    },
    menuLine: {
        height: 2,
        width: 22,
        backgroundColor: CommonColors.primary,
        borderRadius: 2,
    },
    logo: {
        fontFamily: 'Manrope-ExtraBold',
        fontWeight: '900',
        fontSize: 22,
        letterSpacing: -0.8,
        color: CommonColors.primary
    },
    avatarWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: CommonColors.background,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: CommonColors.border,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
});

export default TopAppBar;