import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../../common/ThemeContest';
import CommonColors from '../../../units/CommonColor';
import strings from '../../../units/CommonStrings';
import CommonHeader from '../../../components/CommonHeader';
import CommonBtn from '../../../components/CommonBtn';
import FAQItem from './components/FAQItemCard';
import SearchBar from '../../../components/SearchBar';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_DATA = [
    {
        id: '1',
        question: strings.faqQuestion1,
        answer: strings.faqAnswer1,
    },
    {
        id: '2',
        question: strings.faqQuestion2,
        answer: strings.faqAnswer2,
    },
    {
        id: '3',
        question: strings.faqQuestion3,
        answer: strings.faqAnswer3,
    },
    {
        id: '4',
        question: strings.faqQuestion4,
        answer: strings.faqAnswer4,
    },
];

const HelpSupportScreen = ({ navigation }) => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState('1');

    const toggleExpand = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />
            <CommonHeader
                title={strings.helpSupportHeader}
                onBackPress={() => navigation?.goBack()}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.heroTitle}>{strings.helpSupportHeroTitle}</Text>
                <Text style={styles.heroSubtitle}>
                    {strings.helpSupportHeroSubtitle}
                </Text>
                <View style={styles.searchWrapper}>
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmit={() => { }}
                        placeholder={strings.helpSupportSearchPlaceholder}
                    />
                </View>
                <Text style={styles.sectionTitle}>{strings.helpSupportSectionTitle}</Text>
                <View style={styles.faqList}>
                    {FAQ_DATA.map((item) => (
                        <FAQItem
                            key={item.id}
                            item={item}
                            isExpanded={expandedId === item.id}
                            onPress={() => toggleExpand(item.id)}
                        />
                    ))}
                </View>
                <View style={styles.supportCard}>
                    <View style={styles.supportIconWrapper}>
                        <Ionicons
                            name="headset"
                            size={metrics.iconSize.high}
                            color={CommonColors.textPrimary}
                        />
                    </View>
                    <Text style={styles.supportTitle}>{strings.helpSupportStillNeedHelp}</Text>
                    <Text style={styles.supportDesc}>
                        {strings.helpSupportStillNeedHelpDesc}
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <CommonBtn
                    title={strings.helpSupportRaiseTicket}
                    backgroundColor={CommonColors.primary}
                    textColor={CommonColors.white}
                    height={metrics.windowHeight * 0.065}
                    borderRadius={metrics.borderRadius.high * 1.3}
                    elevation={2}
                    textStyle={styles.btnText}
                    leftComponent={
                        <Ionicons
                            name="ticket"
                            size={metrics.iconSize.medium}
                            color={CommonColors.white}
                            style={styles.btnIcon}
                        />
                    }
                    onPress={() => console.log('Raise a ticket pressed')}
                />
            </View>
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive * 2,
    },
    heroTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(36),
        color: CommonColors.textPrimary,
        marginTop: metrics.margin.medium,
        marginBottom: metrics.margin.medium,
    },
    heroSubtitle: {
        fontFamily: fonts.regular,
        fontSize: RFValue(13),
        color: CommonColors.textSecondary,
        lineHeight: 20,
        marginBottom: metrics.margin.veryHigh,
        paddingRight: metrics.padding.high,
    },
    sectionTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(10),
        color: CommonColors.textLight,
        letterSpacing: 1.2,
        marginBottom: metrics.margin.medium,
    },
    faqList: {
        gap: metrics.margin.medium,
        marginBottom: metrics.margin.extraHigh,
    },
    supportCard: {
        backgroundColor: '#F0F2F5',
        borderRadius: metrics.borderRadius.extraHigh,
        padding: metrics.padding.extraHigh,
        alignItems: 'center',
        marginBottom: metrics.margin.veryHigh,
    },
    supportIconWrapper: {
        width: 56,
        height: 56,
        backgroundColor: CommonColors.white,
        borderRadius: metrics.padding.veryHigh,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: metrics.margin.high,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    supportTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(15),
        color: CommonColors.textPrimary,
        marginBottom: metrics.margin.tiny,
    },
    supportDesc: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    },
    bottomContainer: {
        backgroundColor: CommonColors.background,
        paddingHorizontal: metrics.padding.veryHigh,
    },
    btnText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(14),
    },
    btnIcon: {
        marginRight: metrics.margin.low,
    },
    searchWrapper: {
        marginBottom: metrics.margin.extraHigh,
    },
});

export default HelpSupportScreen;