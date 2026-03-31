import React, { useState ,useMemo} from 'react';
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
import { useTheme } from "../../../common/ThemeContest";
import { RFValue } from 'react-native-responsive-fontsize';

const HomeScreen = () => {
    const { fonts, metrics } = useTheme();
        const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);
       
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

const createStyles = (fonts, metrics) =>  StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: metrics.padding.extraHigh,
        paddingTop: metrics.padding.high,
        paddingBottom:  metrics.padding.medium,
        zIndex: RFValue(10),
    },
    searchSection: {
        gap: metrics.padding.high,
    },
    spacer: {
        flex: 1,
    },
});

export default HomeScreen;