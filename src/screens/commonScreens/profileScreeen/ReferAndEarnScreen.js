import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../../common/ThemeContest';
import strings from '../../../units/CommonStrings';
import CommonHeader from '../../../components/CommonHeader';

const ReferAndEarnScreen = ({ navigation }) => {

    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    const handleCopyCode = () => {
        console.log("Code Copied!");
    };

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader
                title={strings.referEarnTitle}
                onBackPress={() => navigation?.goBack()}
                rightIconName="ellipsis-vertical"
                onRightPress={() => console.log('Options pressed')}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={Platform.OS === 'ios'}
            >
                <View style={styles.graphicContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons
                            name="gift-outline"
                            size={metrics.iconSize.veryHigh * 2.5}
                            color={colors.textPrimary}
                        />
                    </View>
                </View>
                <Text style={styles.headline}>{strings.earnHeadline}</Text>
                <Text style={styles.subtitle}>{strings.earnSubtitle}</Text>
                <View style={styles.codeSectionContainer}>
                    <Text style={styles.codeLabel}>{strings.yourReferralCode}</Text>
                    <View style={styles.codeCard}>
                        <Text style={styles.codeText}>{strings.dummyReferralCode}</Text>
                        <TouchableOpacity
                            style={styles.copyButton}
                            activeOpacity={0.7}
                            onPress={handleCopyCode}
                        >
                            <Ionicons
                                name="copy"
                                size={metrics.iconSize.tiny}
                                color={colors.textPrimary}
                                style={styles.copyIcon}
                            />
                            <Text style={styles.copyButtonText}>{strings.copyCodeBtn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.stepsContainer}>
                    <View style={[styles.stepCard, { marginRight: metrics.margin.low }]}>
                        <Ionicons
                            name="share-social"
                            size={metrics.iconSize.high}
                            color={colors.textPrimary}
                            style={styles.stepIcon}
                        />
                        <Text style={styles.stepText}>{strings.referStep1}</Text>
                    </View>
                    <View style={[styles.stepCard, { marginLeft: metrics.margin.low }]}>
                        <Ionicons
                            name="car"
                            size={metrics.iconSize.high}
                            color={colors.textPrimary}
                            style={styles.stepIcon}
                        />
                        <Text style={styles.stepText}>{strings.referStep2}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReferAndEarnScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
        alignItems: 'center',
    },
    graphicContainer: {
        marginTop: metrics.margin.extraHigh,
        marginBottom: metrics.margin.extraHigh,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircle: {
        width: metrics.windowWidth * 0.45,
        height: metrics.windowWidth * 0.45,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.inputBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        fontSize: RFValue(36),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        textAlign: 'center',
        lineHeight: RFValue(42),
        marginBottom: metrics.margin.high,
        paddingHorizontal: metrics.padding.low,
    },
    subtitle: {
        fontSize: RFValue(13),
        fontFamily: fonts.regular,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: RFValue(20),
        marginBottom: metrics.margin.massive,
        paddingHorizontal: metrics.padding.high,
    },
    codeSectionContainer: {
        width: '100%',
        marginBottom: metrics.margin.massive,
    },
    codeLabel: {
        fontSize: RFValue(10),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1.5,
        marginBottom: metrics.margin.low,
        marginLeft: metrics.margin.tiny,
    },
    codeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.card,
        borderRadius: metrics.borderRadius.medium,
        paddingVertical: metrics.padding.high,
        paddingHorizontal: metrics.padding.veryHigh,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 3,
    },
    codeText: {
        fontSize: RFValue(18),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        letterSpacing: 2,
        lineHeight: RFValue(24),
    },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.chipInactive,
        paddingVertical: metrics.padding.low,
        paddingHorizontal: metrics.padding.high,
        borderRadius: metrics.borderRadius.low,
    },
    copyIcon: {
        marginRight: metrics.margin.tiny,
    },
    copyButtonText: {
        fontSize: RFValue(11),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    stepsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    stepCard: {
        flex: 1,
        backgroundColor: colors.inputBg,
        borderRadius: metrics.borderRadius.medium,
        padding: metrics.padding.veryHigh,
        justifyContent: 'space-between',
        minHeight: metrics.windowHeight * 0.15,
    },
    stepIcon: {
        marginBottom: metrics.margin.high,
    },
    stepText: {
        fontSize: RFValue(12),
        fontFamily: fonts.medium,
        color: colors.textSecondary,
        lineHeight: RFValue(18),
    },
});