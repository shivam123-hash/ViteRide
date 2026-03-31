// src/screens/rider_screens/home_screen/DestinationSearchScreen.js
import React, { useState, useRef, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonColors from '../../../units/CommonColor';
import SearchBar from '../../../components/SearchBar';
import CommonHeader from '../../../components/CommonHeader';
import SuggestionCard from './components/SuggestionCard';
import SavedLocationRow from './components/SavedLocationRow';
import { useTheme } from "../../../common/ThemeContest";
import { RFValue } from 'react-native-responsive-fontsize';
import strings from "../../../units/CommonStrings";

const SUGGESTIONS = [
    {
        id: '1',
        name: 'The Metropolitan Museum of Art',
        address: '1000 5th Ave, New York, NY 10028',
    },
    {
        id: '2',
        name: 'Rockefeller Center',
        address: '45 Rockefeller Plaza, New York, NY 10111',
    },
];

const SAVED_LOCATIONS = [
    {
        id: 'home',
        label: 'Home',
        address: '245 E 44th St, Manhattan',
        icon: 'home',
    },
    {
        id: 'work',
        label: 'Work',
        address: 'One World Trade Center',
        icon: 'work',
    },
    {
        id: 'recent',
        label: 'JFK Airport',
        address: 'Queens, NY 11430',
        icon: 'history',
    },
];


const DestinationSearchScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef(null);
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);
    const filteredSuggestions = SUGGESTIONS.filter(
        (s) =>
            searchText === '' ||
            s.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleSearch = () => {

    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            {/* ── Header ── */}
            <CommonHeader
                title={strings.searchTitle}
                onBackPress={() => console.log("Go Back")}
            />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}>{strings.whereTo}</Text>
                </View>

                <SearchBar
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmit={handleSearch}
                />

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>{strings.suggestions}</Text>
                    <View style={styles.suggestionList}>
                        {filteredSuggestions.map((item) => (
                            <SuggestionCard key={item.id} item={item} />
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>{strings.savedLocations}</Text>
                    <View style={styles.savedList}>
                        {SAVED_LOCATIONS.map((item, index) => (
                            <SavedLocationRow
                                key={item.id}
                                item={item}
                                isLast={index === SAVED_LOCATIONS.length - 1}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.mapPreview}>
                    <Image
                        source={{
                            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs0XYxq93GJwxR_O9N0F9tjtf9db_s_YeDfr4qlrLqpzgaBxFXsKEfHw0Jgajjia_v-TFKYafmKK8kmBmnymfg1VaHpXfIjamhBQAPUEFFY2YH4P507GnmVPIa_G6Q-Mc7sGemo8nph9crQXkWywXFA5PKRsBkrDy8QwJldNzZINM93KOmTkuZScILcaM76sq9WJwWn0JysQB7kOJ8zr5qsoTNIdjozK3inF6qn__JTYYoBqr0fxhvQb9vg_qXL36dCcXKepMeeC7z',
                        }}
                        style={styles.mapImage}
                        resizeMode="cover"
                    />
                    {/* Overlay */}
                    <View style={styles.mapOverlay} />
                    <TouchableOpacity style={styles.mapButton} activeOpacity={0.85}>
                        <Text style={styles.mapButtonText}>Select on Map</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};


const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: metrics.padding.veryHigh,
        paddingTop: metrics.padding.high,
        paddingBottom: metrics.padding.medium,
        backgroundColor: CommonColors.background,
    },
    backButton: {
        padding: metrics.padding.tiny,
        marginRight: metrics.margin.tiny,
    },
    headerTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(20),
        letterSpacing: -0.4,
        color: CommonColors.primary,
    },

    // Scroll
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
    },

    // Hero
    heroSection: {
        marginTop: metrics.margin.veryHigh,
        marginBottom: metrics.margin.veryHigh * 1.15,
    },

    heroTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(48),
        letterSpacing: -1.5,
        color: CommonColors.primary,
        lineHeight: RFValue(54),

    },
    // Search
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: metrics.windowHeight * 0.065,
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.medium,
        paddingHorizontal: metrics.padding.veryHigh,
        gap: metrics.padding.medium,
        shadowColor: CommonColors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: metrics.borderRadius.extraHigh,
        elevation: 4,
    },

    searchInput: {
        flex: 1,
        fontFamily: fonts.regular,
        fontSize: RFValue(16),
        color: CommonColors.primary,
        padding: metrics.padding.none,
        margin: metrics.margin.none,
    },

    // Section
    section: {
        marginTop: metrics.margin.extraHigh,
    },
    sectionLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(10),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        marginBottom: metrics.margin.medium,
        marginLeft: metrics.margin.tiny,
    },
    suggestionList: {
        gap: metrics.padding.low,
    },

    // Map Preview
    mapPreview: {
        marginTop: metrics.margin.massive,
        height: metrics.windowHeight * 0.2,
        borderRadius: metrics.borderRadius.high,
        overflow: 'hidden',
        backgroundColor: CommonColors.screenBg,
    },
    mapImage: {
        width: metrics.windowWidth,
        height: metrics.windowHeight,
        opacity: 0.3,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(249,249,249,0.2)',
    },
    mapButton: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        transform: [{ translateY: -22 }],
        backgroundColor: CommonColors.primary,
        paddingHorizontal: metrics.padding.veryHigh,
        paddingVertical: metrics.padding.medium,
        borderRadius: metrics.borderRadius.medium,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: metrics.borderRadius.veryHigh,
        elevation: RFValue(8),
    },
    mapButtonText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(13),
        color: CommonColors.white,
        letterSpacing: 0.3,
    },
});

export default DestinationSearchScreen;