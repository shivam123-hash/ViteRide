// src/screens/rider_screens/home_screen/DestinationSearchScreen.js
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Image,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../units/CommonColor';
import SearchBar from '../../../components/SearchBar';
import SuggestionCard from './components/SuggestionCard';
import SavedLocationRow from './components/SavedLocationRow';

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
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation?.goBack()}
                    activeOpacity={0.7}
                >
                    <MaterialIcons name="arrow-back" size={24} color={CommonColors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Set Destination</Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}>Where to?</Text>
                </View>

                <SearchBar
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmit={handleSearch}
                />

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Suggestions</Text>
                    <View style={styles.suggestionList}>
                        {filteredSuggestions.map((item) => (
                            <SuggestionCard key={item.id} item={item} />
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Saved Locations</Text>
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


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: CommonColors.background,
    },
    backButton: {
        padding: 4,
        marginRight: 4,
    },
    headerTitle: {
        fontFamily: 'Manrope-ExtraBold',
        fontWeight: '800',
        fontSize: 11,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        color: CommonColors.primary,
        marginLeft: 16,
    },

    // Scroll
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 48,
    },

    // Hero
    heroSection: {
        marginTop: 24,
        marginBottom: 28,
    },
    heroTitle: {
        fontFamily: 'Manrope-ExtraBold',
        fontWeight: '800',
        fontSize: 48,
        letterSpacing: -1.5,
        color: CommonColors.primary,
        lineHeight: 54,
    },

    // Search
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 64,
        backgroundColor: CommonColors.white,
        borderRadius: 12,
        paddingHorizontal: 20,
        gap: 12,
        shadowColor: CommonColors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 24,
        elevation: 4,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 16,
        color: CommonColors.primary,
        padding: 0,
        margin: 0,
    },

    // Section
    section: {
        marginTop: 36,
    },
    sectionLabel: {
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 10,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
        marginBottom: 12,
        marginLeft: 4,
    },
    suggestionList: {
        gap: 10,
    },

    // Map Preview
    mapPreview: {
        marginTop: 40,
        height: 180,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: CommonColors.screenBg,
    },
    mapImage: {
        width: '100%',
        height: '100%',
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
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 8,
    },
    mapButtonText: {
        fontFamily: 'Manrope-Bold',
        fontWeight: '700',
        fontSize: 13,
        color: CommonColors.white,
        letterSpacing: 0.3,
    },
});

export default DestinationSearchScreen;