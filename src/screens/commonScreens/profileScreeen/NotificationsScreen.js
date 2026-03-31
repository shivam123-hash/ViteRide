import React, { useMemo } from 'react';
import {
    Text,
    StyleSheet,
    SectionList,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../../../common/ThemeContest';
import CommonColors from '../../../units/CommonColor';
import CommonHeader from '../../../components/CommonHeader';
import NotificationCard from './components/NotificationCard';


const NOTIFICATIONS_DATA = [
    {
        title: "RECENT UPDATES",
        data: [
            {
                id: '1',
                icon: 'car',
                title: 'Ride Completed',
                time: '2m ago',
                description: 'Your trip to San Francisco International Airport has been successfully completed. View your receipt now.',
                hasButton: true,
            },
            {
                id: '2',
                icon: 'wallet',
                title: 'Payout Successful',
                time: '1h ago',
                description: 'Your weekly earnings of $1,240.50 have been deposited to your linked bank account.',
            }
        ]
    },
    {
        title: "YESTERDAY",
        data: [
            {
                id: '3',
                icon: 'pricetag',
                title: '20% Off Weekend Travel',
                time: 'Yesterday',
                description: 'Unlock premium comfort for less. Use code WEEKENDVIP on your next two ViteRide Lux bookings.',
                image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop',
                badgeText: 'SPECIAL EVENT',
            },
            {
                id: '4',
                icon: 'shield-checkmark',
                title: 'Security Alert',
                time: 'Yesterday',
                description: "A new login was detected on a Safari browser in London, UK. If this wasn't you, please reset your password immediately.",
            }
        ]
    }
];

const NotificationsScreen = ({ navigation }) => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />
            <CommonHeader
                title="Notifications"
                onBackPress={() => navigation?.goBack()}
                onRightPress={() => console.log('Menu options')}
            />
            <SectionList
                sections={NOTIFICATIONS_DATA}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
                renderItem={({ item }) => (
                    <NotificationCard item={item} />
                )}
                stickySectionHeadersEnabled={false}
            />
        </SafeAreaView>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },
    listContainer: {
        paddingHorizontal: metrics.padding.veryHigh,
        paddingBottom: metrics.padding.massive,
    },
    sectionHeader: {
        fontFamily: fonts.bold,
        fontSize: RFValue(11),
        color: CommonColors.textLight,
        letterSpacing: 1.2,
        marginTop: metrics.margin.extraHigh,
        marginBottom: metrics.margin.medium,
    },
});

export default NotificationsScreen;