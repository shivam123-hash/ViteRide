import React, { useMemo } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useTheme } from '../../../common/ThemeContest';
import CommonColors from '../../../units/CommonColor';
import { RFValue } from 'react-native-responsive-fontsize';
import strings from '../../../units/CommonStrings';
import MissionCard from './components/MissionCard';
import CommonHeader from '../../../components/CommonHeader';

const MissionsScreen = ({ navigation }) => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            <CommonHeader title="Active Missions"
                onBackPress={() => { }} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroSection}>
                    <Text style={styles.heroLine1}>{strings.missionsHeadline1}</Text>
                    <Text style={styles.heroLine2}>{strings.missionsHeadline2}</Text>
                    <Text style={styles.heroSubtitle}>{strings.missionsSubtitle}</Text>
                </View>

                <View style={styles.missionsList}>
                    {strings.missions.map((mission) => (
                        <MissionCard
                            key={mission.id}
                            mission={mission}
                            styles={styles}
                            metrics={metrics}
                        />
                    ))}
                </View>

                <View style={styles.bottomSpacer} />
            </ScrollView>

            <TouchableOpacity
                style={styles.helpFab}
                activeOpacity={0.85}
                onPress={() => console.log('Help pressed')}
            >
                <MaterialIcons
                    name="help-outline"
                    size={metrics.iconSize.veryHigh}
                    color={CommonColors.white}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: metrics.padding.high,
        paddingVertical: metrics.padding.high,
        gap: metrics.margin.medium,
        backgroundColor: CommonColors.background,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: metrics.borderRadius.circular,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CommonColors.chipInactive,
    },
    headerText: {
        flex: 1,
    },
    headerSubLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(9),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        marginBottom: 2,
    },
    headerTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(20),
        letterSpacing: -0.4,
        color: CommonColors.primary,
    },

    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.high,
        paddingTop: metrics.padding.medium,
    },

    heroSection: {
        marginTop: metrics.margin.medium,
        marginBottom: metrics.margin.veryHigh,
    },
    heroLine1: {
        fontFamily: fonts.bold,
        fontSize: RFValue(44),
        lineHeight: RFValue(44),
        letterSpacing: -1.2,
        color: CommonColors.primary,
    },
    heroLine2: {
        fontFamily: fonts.bold,
        fontSize: RFValue(44),
        lineHeight: RFValue(48),
        letterSpacing: -1.2,
        color: CommonColors.primary,
        marginBottom: metrics.margin.high,
    },
    heroSubtitle: {
        fontFamily: fonts.regular,
        fontSize: RFValue(13),
        lineHeight: RFValue(20),
        color: CommonColors.textSecondary,
    },

    missionsList: {
        gap: metrics.margin.medium,
    },

    missionCard: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        borderWidth: 1,
        borderColor: CommonColors.border,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
    },
    missionCardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: metrics.margin.high,
    },
    missionTagBlock: {
        gap: 4,
    },
    missionTag: {
        fontFamily: fonts.bold,
        fontSize: RFValue(9),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
    },
    missionTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        letterSpacing: -0.3,
        color: CommonColors.primary,
    },
    bonusBadge: {
        paddingHorizontal: metrics.padding.medium,
        paddingVertical: metrics.padding.tiny,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.chipInactive,
    },
    bonusBadgeDark: {
        backgroundColor: CommonColors.primary,
    },
    bonusBadgeText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(12),
        color: CommonColors.primary,
    },
    bonusBadgeTextDark: {
        color: CommonColors.white,
    },

    missionImage: {
        width: '100%',
        height: metrics.windowWidth * 0.4,
        borderRadius: metrics.borderRadius.medium,
        marginBottom: metrics.margin.high,
    },

    progressBlock: {
        gap: metrics.margin.low,
    },
    progressTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    progressDescription: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },
    progressCounter: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.primary,
    },
    progressCounterTarget: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        color: CommonColors.textLight,
    },
    progressTrack: {
        width: '100%',
        height: 6,
        backgroundColor: CommonColors.chipInactive,
        borderRadius: metrics.borderRadius.circular,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.circular,
    },
    progressFooter: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(9),
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
    },

    bottomSpacer: {
        height: 80,
    },

    helpFab: {
        position: 'absolute',
        bottom: metrics.margin.veryHigh,
        right: metrics.margin.high,
        width: 56,
        height: 56,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
});

export default MissionsScreen;