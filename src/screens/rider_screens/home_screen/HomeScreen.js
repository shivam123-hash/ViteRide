// src/screens/HomeScreen.js
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapBackground from './components/MapBackground';
import TopAppBar from './components/TopAppBar';
import SearchBar from '../../../components/SearchBar';
import QuickAccessChips from './components/QuickAccessChip';
import CommonColors from '../../../units/CommonColor';

const HomeScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [activeChip, setActiveChip] = useState('home');

    const handleMenuPress = () => {

    };

    const handleSearch = () => {};

    const handleChipPress = (chipId) => {

    };

    const handleReferNow = () => {
    };

    const handleTabPress = (tabId) => {
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <MapBackground />
                <TopAppBar onMenuPress={handleMenuPress} />
                <View style={styles.content}>
                    <View style={styles.searchSection}>
                        <SearchBar
                            value={searchText}
                            onChangeText={setSearchText}
                            onSubmit={handleSearch}
                        />
                        <QuickAccessChips
                            activeChip={activeChip}
                            onChipPress={handleChipPress}
                        />
                    </View>

                    {/* Spacer */}
                    <View style={styles.spacer} />


                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 12,
        zIndex: 10,
    },
    searchSection: {
        gap: 16,
    },
    spacer: {
        flex: 1,
    },
});

export default HomeScreen;