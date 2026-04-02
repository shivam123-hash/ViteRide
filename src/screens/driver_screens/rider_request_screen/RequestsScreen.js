import React, { useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../../common/ThemeContest';
import strings from '../../../units/CommonStrings';
import CommonHeader from '../../../components/CommonHeader';
import RequestCard from './components/RequestCard';

const DUMMY_REQUESTS = [
    {
        id: '1',
        name: 'Arjun Mehta',
        rating: '4.9',
        distance: '4.2 KM AWAY',
        fare: '₹342',
        pickup: 'Bandra West',
        destination: 'Lower Parel Business District',
    },
    {
        id: '2',
        name: 'Sanya Kapoor',
        rating: '5.0',
        distance: '1.8 KM AWAY',
        fare: '₹510',
        pickup: 'Juhu Tara Road',
        destination: 'Chhatrapati Shivaji Terminal',
    },
    {
        id: '3',
        name: 'Rohit Verma',
        rating: '4.8',
        distance: '6.5 KM AWAY',
        fare: '₹225',
        pickup: 'Worli Sea Face',
        destination: 'Prabhadevi',
    },
];

const RequestsScreen = ({ navigation }) => {

    const { colors, fonts, metrics } = useTheme();
    const styles = getStyles(colors, fonts, metrics);

    const renderHeader = useCallback(() => (
        <View style={styles.listHeader}>
            <Text style={styles.marketplaceSub}>{strings.activeMarketplace}</Text>
            <Text style={styles.mainTitle}>{strings.newRequests}</Text>
        </View>
    ), [styles]);

    const renderFooter = useCallback(() => (
        <View style={styles.listFooter}>
            <View style={styles.scanningPill}>
                <View style={styles.scanningDot} />
                <Text style={styles.scanningText}>{strings.scanningTrips}</Text>
            </View>
        </View>
    ), [styles]);

    const renderItem = useCallback(({ item }) => (
        <RequestCard
            item={item}
            colors={colors}
            fonts={fonts}
            metrics={metrics}
        />
    ), [colors, fonts, metrics]);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <CommonHeader
                title={strings.requestsTitle}
                onBackPress={() => navigation?.goBack()}
            />
            <FlatList
                data={DUMMY_REQUESTS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatlistContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

export default RequestsScreen;

const getStyles = (colors, fonts, metrics) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.screenBg,
    },
    flatlistContent: {
        paddingHorizontal: metrics.padding.high,
        paddingBottom: metrics.padding.massive,
    },
    listHeader: {
        marginTop: metrics.margin.high,
        marginBottom: metrics.margin.extraHigh,
    },
    marketplaceSub: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1.5,
        marginBottom: metrics.margin.tiny,
    },
    mainTitle: {
        fontSize: RFValue(28),
        fontFamily: fonts.bold,
        color: colors.textPrimary,
        letterSpacing: -0.5,
    },
    listFooter: {
        alignItems: 'center',
        marginTop: metrics.margin.high,
    },
    scanningPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.chipInactive,
        paddingVertical: metrics.padding.medium,
        paddingHorizontal: metrics.padding.high,
        borderRadius: metrics.borderRadius.circular,
    },
    scanningDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.textPrimary,
        marginRight: metrics.margin.medium,
    },
    scanningText: {
        fontSize: RFValue(9),
        fontFamily: fonts.bold,
        color: colors.textSecondary,
        letterSpacing: 1,
    },
});