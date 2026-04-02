import React, { useState, useRef, useMemo, useEffect } from 'react';
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
import CommonButton from '../../../components/CommonBtn'; // Button Import Kiya
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
    { id: 'home', label: 'Home', address: '245 E 44th St, Manhattan', icon: 'home' },
    { id: 'work', label: 'Work', address: 'One World Trade Center', icon: 'work' },
    { id: 'recent', label: 'JFK Airport', address: 'Queens, NY 11430', icon: 'history' },
];

// 1. "route" ko props mein add kiya taaki HomeScreen ka data mil sake
const DestinationSearchScreen = ({ navigation, route }) => {
    
    // 2. Do alag states banaye: Pickup (Kahan se) aur Dropoff (Kahan tak)
    const [pickupText, setPickupText] = useState('Current Location'); 
    const [dropoffText, setDropoffText] = useState('');

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    // 3. HomeScreen se aaya hua text Dropoff mein auto-fill karne ke liye
    useEffect(() => {
        if (route.params?.initialQuery) {
            setDropoffText(route.params.initialQuery);
        }
    }, [route.params?.initialQuery]);

    const filteredSuggestions = SUGGESTIONS.filter(
        (s) =>
            dropoffText === '' ||
            s.name.toLowerCase().includes(dropoffText.toLowerCase())
    );

    // 4. Continue Button ka function jo SelectRides par bhejega
    const handleContinue = () => {
        if (pickupText.trim() !== '' && dropoffText.trim() !== '') {
            navigation.navigate('SelectRides', {
                pickupLocation: pickupText,
                dropoffLocation: dropoffText
            });
        }
    };

    // Button tabhi active hoga jab dono fields bhari hongi
    const isButtonEnabled = pickupText.trim().length > 0 && dropoffText.trim().length > 0;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            <CommonHeader
                title={strings.searchTitle}
                onBackPress={() => navigation.goBack()}
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

                {/* ── 5. Yahan 2 Search Bars lagaye gaye hain ── */}
                <View style={styles.searchContainer}>
                    <SearchBar
                        value={pickupText}
                        onChangeText={setPickupText}
                        placeholder="Pickup Location (Kahan se?)"
                    />
                    
                    {/* Connecting Line Effect (Optional UI detail) */}
                    <View style={styles.connectorContainer}>
                        <View style={styles.connectorLine} />
                    </View>

                    <SearchBar
                        value={dropoffText}
                        onChangeText={setDropoffText}
                        placeholder="Dropoff Location (Kahan tak?)"
                    />
                </View>

                {/* ── Continue Button ── */}
                <CommonButton
                    title="Continue to Rides"
                    backgroundColor={isButtonEnabled ? CommonColors.primary : '#E0E0E0'}
                    textColor={isButtonEnabled ? CommonColors.white : '#888888'}
                    height={metrics.windowHeight * 0.065}
                    borderRadius={metrics.borderRadius.high}
                    marginTop={metrics.margin.high}
                    onPress={handleContinue}
                    disabled={!isButtonEnabled} // Jab tak dono field nahi bhari, button disable rahega
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
        backgroundColor: CommonColors.screenBg,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
    },
    heroSection: {
        marginTop: metrics.margin.veryHigh,
        marginBottom: metrics.margin.veryHigh, // Thoda margin adjust kiya
    },
    heroTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(48),
        letterSpacing: -1.5,
        color: CommonColors.primary,
        lineHeight: RFValue(54),
    },
    // Nayi styling 2 search bars ke liye
    searchContainer: {
        backgroundColor: CommonColors.background,
        padding: metrics.padding.medium,
        borderRadius: metrics.borderRadius.high,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    connectorContainer: {
        height: 12,
        justifyContent: 'center',
        paddingLeft: 22, // Taki connector line search icon ke theek neeche aaye
    },
    connectorLine: {
        width: 2,
        height: '100%',
        backgroundColor: CommonColors.border,
        borderRadius: 1,
    },
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
    savedList: {
        // yahan bhi aayega
    },
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