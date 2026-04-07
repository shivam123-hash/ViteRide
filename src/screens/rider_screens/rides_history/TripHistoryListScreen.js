import React, { useEffect, useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import CommonColors from '../../../units/CommonColor';
import strings from '../../../units/CommonStrings';
import GlobalMetrics from '../../../units/GlobalMetricsStyles';
import { useTheme } from '../../../common/ThemeContest';
import CommonHeader from '../../../components/CommonHeader';
import { showMessage } from '../../../redux/features/messageSlice/messageSlice';
import { fetchMyRides } from '../../../redux/features/profile/MyRidesSlice';
import RideHistoryCard from './component/RideHistoryCard';

const TripHistoryListScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { fonts } = useTheme();
    const styles = useMemo(() => createStyles(fonts), [fonts]);
    const { rides, loading, error } = useSelector((state) => state.myRides);
    const [activeTab, setActiveTab] = useState('All');
    const tabs = strings.tripHistoryFilters;

    useEffect(() => {
        dispatch(fetchMyRides())
            .unwrap()
            .catch((err) => {
                dispatch(showMessage({ text: err || 'Could not load your rides', type: 'error' }));
            });
    }, [dispatch]);

    const filteredRides = useMemo(() => {
        if (!rides) return [];
        if (activeTab === 'All') return rides;
        return rides.filter((ride) => ride.status?.toLowerCase() === activeTab.toLowerCase());
    }, [rides, activeTab]);

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="car-outline" size={80} color={CommonColors.border} />
            <Text style={styles.emptyTitle}>No Rides Found</Text>
            <Text style={styles.emptySubtitle}>
                You haven't taken any rides in this category yet.
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.screenBg} />

            <CommonHeader
                title={strings.tripHistoryHeader}
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.tabsWrapper}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabButton, isActive && styles.tabButtonActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={styles.listWrapper}>
                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={CommonColors.primary} />
                    </View>
                ) : (
                    <FlatList
                        data={filteredRides}
                        keyExtractor={(item, index) => item._id || index.toString()}
                        renderItem={({ item }) => <RideHistoryCard item={item} />}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={renderEmptyState}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default TripHistoryListScreen;

const createStyles = (fonts) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.screenBg,
    },
    tabsWrapper: {
        flexDirection: 'row',
        paddingHorizontal: GlobalMetrics.padding.veryHigh,
        paddingVertical: GlobalMetrics.padding.medium,
        backgroundColor: CommonColors.screenBg,
        borderBottomWidth: 1,
        borderBottomColor: CommonColors.border,
    },
    tabButton: {
        paddingVertical: GlobalMetrics.padding.low,
        paddingHorizontal: GlobalMetrics.padding.high,
        borderRadius: GlobalMetrics.borderRadius.circular,
        backgroundColor: CommonColors.chipInactive,
        marginRight: GlobalMetrics.margin.medium,
    },
    tabButtonActive: {
        backgroundColor: CommonColors.chipActive,
    },
    tabText: {
        fontFamily: fonts.medium,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },
    tabTextActive: {
        color: CommonColors.white,
        fontFamily: fonts.semiBold,
    },
    listWrapper: {
        flex: 1,
    },
    listContent: {
        padding: GlobalMetrics.padding.veryHigh,
        paddingBottom: GlobalMetrics.padding.massive,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalMetrics.margin.massive * 2,
    },
    emptyTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        color: CommonColors.textPrimary,
        marginTop: GlobalMetrics.margin.high,
    },
    emptySubtitle: {
        fontFamily: fonts.medium,
        fontSize: RFValue(12),
        color: CommonColors.textLight,
        textAlign: 'center',
        marginTop: GlobalMetrics.margin.tiny,
        paddingHorizontal: GlobalMetrics.padding.massive,
    },
});