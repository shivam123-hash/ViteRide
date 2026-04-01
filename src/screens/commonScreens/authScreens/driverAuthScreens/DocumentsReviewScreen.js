import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

// Adjust import paths to match your project structure
import { useTheme } from '../../../../common/ThemeContest';
import strings from '../../../../units/CommonStrings';
import CommonHeader from '../../../../components/CommonHeader';

const DocumentsReviewScreen = ({ navigation }) => {
    // Initialize Theme Context
    const { colors, fonts, metrics } = useTheme();
    // Generate Styles
    const styles = getStyles(colors, fonts, metrics);

    return (
        <SafeAreaView style={styles.container}>
            {/* 
                NOTE: The design shows a subtle map background. 
                If you have a map pattern image, uncomment the ImageBackground wrapper.
                For now, it falls back to your theme's screenBg color smoothly.
            */}
            {/* <ImageBackground 
                source={require('../../../assets/images/map_pattern_bg.png')} 
                style={styles.bgImage} 
                imageStyle={{ opacity: 0.1 }}
            > */}

            {/* Standardized Header - Only using Back Button as per design */}
            <CommonHeader
                title=""
                onBackPress={() => navigation?.goBack()}
            />

            <View style={styles.contentContainer}>
                <View style={styles.iconCircle}>
                    <Ionicons
                        name="checkmark"
                        size={metrics.iconSize.veryHigh * 1.5}
                        color={colors.black}
                    />
                </View>
                <Text style={styles.title}>{strings.docsReviewTitle}</Text>
                <Text style={styles.subtitle}>{strings.docsReviewSubtitle}</Text>
                <View style={styles.infoCard}>
                    <View style={styles.cardRow}>
                        <Text style={styles.cardLabel}>{strings.submissionIdLabel}</Text>
                        <Text style={styles.cardValue}>{strings.dummySubmissionId}</Text>
                    </View>

                    <View style={[styles.cardRow, styles.noBottomMargin]}>
                        <Text style={styles.cardLabel}>{strings.estimatedArrivalLabel}</Text>
                        <View style={styles.statusContainer}>
                            <View style={styles.statusDot} />
                            <Text style={styles.cardValue}>{strings.pendingApprovalText}</Text>
                        </View>
                    </View>

                </View>

            </View>
        </SafeAreaView>
    );
};

export default DocumentsReviewScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: metrics.padding.veryHigh,
        paddingTop: metrics.padding.extraHigh,
    },
    iconCircle: {
        width: metrics.windowWidth * 0.28,
        height: metrics.windowWidth * 0.28,
        borderRadius: metrics.borderRadius.circular,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: metrics.margin.extraHigh,
        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    title: {
        fontSize: RFValue(28),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        textAlign: 'center',
        lineHeight: RFValue(34),
        marginBottom: metrics.margin.high,
    },
    subtitle: {
        fontSize: RFValue(12),
        fontFamily: fonts.regular,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: RFValue(22),
        paddingHorizontal: metrics.padding.medium,
        marginBottom: metrics.margin.massive,
    },
    infoCard: {
        width: '100%',
        backgroundColor: colors.card,
        borderRadius: metrics.borderRadius.extraHigh,
        paddingVertical: metrics.padding.veryHigh,
        paddingHorizontal: metrics.padding.extraHigh,
        shadowColor: colors.shadow,
         elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.margin.high,

    },
    noBottomMargin: {
        marginBottom: metrics.margin.none,
    },
    cardLabel: {
        fontSize: RFValue(10),
        fontFamily: fonts.semiBold,
        color: colors.textSecondary,
        letterSpacing: 1.2,
    },
    cardValue: {
        fontSize: RFValue(10),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.textSecondary,
        marginRight: metrics.margin.low,
    },
});