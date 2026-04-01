import React, { useMemo } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../common/ThemeContest';
import CommonColors from '../../../units/CommonColor';
import { RFValue } from 'react-native-responsive-fontsize';
import CommonHeader from '../../../components/CommonHeader';
import strings from '../../../units/CommonStrings';
import HelpCard from './components/HelpCard';
import SupportSection from './components/SupportSection';
import DecorativeBanner from './components/DecorativeBanner';

const HelpInfoScreen = ({ navigation }) => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const handleContactSupport = () => console.log('Contact support pressed');

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            <CommonHeader
                title={strings.helpInfoHeader}
                onBackPress={() => navigation?.goBack()}
            />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroSection}>
                    <Text style={styles.heroSubLabel}>{strings.helpInfoSubLabel}</Text>
                    <Text style={styles.heroHeadline}>{strings.helpInfoHeadline}</Text>
                    <Text style={styles.heroSubtitle}>{strings.helpInfoSubtitle}</Text>
                </View>

                <View style={styles.cardsList}>
                    {strings.helpCards.map((card) => (
                        <HelpCard
                            key={card.id}
                            card={card}
                            styles={styles}
                            metrics={metrics}
                        />
                    ))}
                </View>

                <SupportSection
                    styles={styles}
                    onContactSupport={handleContactSupport}
                />

                <DecorativeBanner styles={styles} />

                <Text style={styles.footerText}>{strings.footerText}</Text>

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.high,
        paddingTop: metrics.padding.veryHigh,
    },

    heroSection: {
        marginBottom: metrics.margin.veryHigh,
    },
    heroSubLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(9),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textSecondary,
        marginBottom: metrics.margin.low,
    },
    heroHeadline: {
        fontFamily: fonts.bold,
        fontSize: RFValue(36),
        lineHeight: RFValue(42),
        letterSpacing: -0.8,
        color: CommonColors.primary,
        marginBottom: metrics.margin.medium,
    },
    heroSubtitle: {
        fontFamily: fonts.regular,
        fontSize: RFValue(15),
        lineHeight: RFValue(24),
        color: CommonColors.textSecondary,
    },

    cardsList: {
        gap: metrics.margin.medium,
        marginBottom: metrics.margin.massive,
    },
    helpCard: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.veryHigh,
        gap: metrics.margin.medium,
        borderWidth: 1,
        borderColor: CommonColors.border,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
    },
    helpCardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.medium,
    },
    helpCardIconBox: {
        width: 44,
        height: 44,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: CommonColors.chipInactive,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    helpCardIconBoxDark: {
        backgroundColor: CommonColors.primary,
    },
    helpCardTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(16),
        letterSpacing: -0.3,
        color: CommonColors.primary,
        flex: 1,
    },

    helpCardContent: {
        flex: 1,
    },
    helpCardBody: {
        fontFamily: fonts.regular,
        fontSize: RFValue(13),
        lineHeight: RFValue(20),
        color: CommonColors.textSecondary,
    },
    progressTrack: {
        height: 4,
        backgroundColor: CommonColors.chipInactive,
        borderRadius: metrics.borderRadius.circular,
        overflow: 'hidden',
        marginTop: metrics.margin.high,
    },
    progressFill: {
        height: '100%',
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.circular,
    },

    supportSection: {
        alignItems: 'center',
        paddingVertical: metrics.padding.massive,
        borderTopWidth: 1,
        borderTopColor: CommonColors.border,
        marginBottom: metrics.margin.veryHigh,
    },
    supportTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        color: CommonColors.primary,
        marginBottom: metrics.margin.low,
        textAlign: 'center',
    },
    supportSubtitle: {
        fontFamily: fonts.regular,
        fontSize: RFValue(13),
        color: CommonColors.textSecondary,
        textAlign: 'center',
        marginBottom: metrics.margin.veryHigh,
        lineHeight: RFValue(20),
    },
    contactBtn: {
        backgroundColor: CommonColors.primary,
        paddingHorizontal: metrics.padding.massive,
        paddingVertical: metrics.padding.high,
        borderRadius: metrics.borderRadius.high,
        elevation: 4,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
    },
    contactBtnText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(14),
        color: CommonColors.white,
        letterSpacing: 0.2,
    },

    decorativeBanner: {
        width: '100%',
        height: 200,
        borderRadius: metrics.borderRadius.extraHigh,
        overflow: 'hidden',
        backgroundColor: CommonColors.screenBg,
        marginBottom: metrics.margin.veryHigh,
    },
    decorativeImage: {
        width: '100%',
        height: '100%',
        opacity: 0.75,
    },

    footerText: {
        fontFamily: fonts.regular,
        fontSize: RFValue(9),
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        textAlign: 'center',
        marginBottom: metrics.margin.high,
    },

    bottomSpacer: {
        height: metrics.margin.massive,
    },
});

export default HelpInfoScreen;