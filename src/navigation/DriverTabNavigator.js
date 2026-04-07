import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/material-icons';
import GlobalMetrics from '../units/GlobalMetricsStyles';
import DriveOffineScreen from '../screens/driver_screens/driver_status_screen/DriverOfflineScreen';
import RequestScreen from '../screens/driver_screens/rider_request_screen/RequestsScreen';
import EarningsScreen from '../screens/driver_screens/earnings_screen/EarningsScreen';
import Profile from '../screens/commonScreens/profileScreeen/ProfileScreen';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigatingToPickupScreen from '../screens/driver_screens/rider_pickup_screen/ NavigatingToPickupScreen';
import OtpScreen from '../screens/driver_screens/otp_screen/OtpScreen';
import RideCompletedScreen from '../screens/driver_screens/ride_completed_screen/RideCompletedScreen';
import ActiveTripScreen from '../screens/driver_screens/active_trip_screen/ActiveTripScreen';
import TripRequestDetailScreen from '../screens/driver_screens/rider_request_screen/components/TripRequestDetailScreen';
import EditProfileScreen from '../screens/commonScreens/profileScreeen/components/EditProfileScreen';
import TripHistoryScreen from '../screens/driver_screens/trip_history_screen/TripHistoryScreen';
import MissionScreen from '../screens/driver_screens/mission_screens/MissionScreens';
import HelpInfoScreen from '../screens/driver_screens/help_info_screen/HelpInfoScreen';
import LoginScreen from '../screens/commonScreens/authScreens/LoginScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const Requests = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: Platform.OS === 'ios' ? 'fade' : 'default' }} initialRouteName="NoticesListScreen" >
            <Stack.Screen name="NoticesListScreen" component={RequestScreen} />
            <Stack.Screen name="NavigatingToPickupScreen" component={NavigatingToPickupScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="RideCompletedScreen" component={RideCompletedScreen} />
            <Stack.Screen name="ActiveTripScreen" component={ActiveTripScreen} />
            <Stack.Screen name="TripRequestDetailScreen" component={TripRequestDetailScreen} />
        </Stack.Navigator>
    );
};


export const ProfileOption = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: Platform.OS === 'ios' ? 'fade' : 'default' }} initialRouteName="Profile" >
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='EditProfile' component={EditProfileScreen} />
            <Stack.Screen name='TripHistoryScreen' component={TripHistoryScreen} />
            <Stack.Screen name='ActiveMission' component={MissionScreen} />
            <Stack.Screen name='HelpInfoScreen' component={HelpInfoScreen} />
             <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}



const defaultTabBarStyle = {
    bottom: Platform.OS === 'ios' ? GlobalMetrics.margin.extraHigh : GlobalMetrics.margin.veryHigh,
    left: GlobalMetrics.margin.veryHigh,
    right: GlobalMetrics.margin.veryHigh,
    backgroundColor: '#F0F0F0',
    height: 80,
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 10
};

export default function DriverTabNavigator() {
    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar,
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        if (route.name === 'DriverStatusScreen') {
                            iconName = 'home';
                        } else if (route.name === 'RequestScreen') {
                            iconName = 'motorcycle';
                        } else if (route.name === 'EarningScreen') {
                            iconName = 'account-balance-wallet';
                        } else if (route.name === 'ProfileOption') {
                            iconName = 'person';
                        }
                        return (
                            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
                                <Ionicons
                                    name={iconName}
                                    size={GlobalMetrics.iconSize.veryHigh / 1.2}
                                    color={focused ? '#FFFFFF' : '#4A4A4A'}
                                />
                            </View>
                        );
                    },
                })}
            >
                <Tab.Screen name="DriverStatusScreen" component={DriveOffineScreen} />
                <Tab.Screen name="RequestScreen" component={Requests}
                    options={({ route }) => ({
                        tabBarStyle: (() => {
                            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
                            if (routeName === 'NavigatingToPickupScreen' || routeName === 'OtpScreen' || routeName === 'ActiveTripScreen' || routeName === "RideCompletedScreen" || routeName === "TripRequestDetailScreen") return { display: 'none' };
                            return defaultTabBarStyle;
                        })(),
                    })}
                />
                <Tab.Screen name="EarningScreen" component={EarningsScreen} />
                <Tab.Screen name="ProfileOption" component={ProfileOption}
                    options={({ route }) => ({
                        tabBarStyle: (() => {
                            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
                            if (routeName === 'EditScreen' || routeName === 'TripHistoryScreen' || routeName === 'ActiveMission' || routeName === "HelpInfoScreen") return { display: 'none' };
                            return defaultTabBarStyle;
                        })(),
                    })}
                />
            </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    tabBar: {
        bottom: Platform.OS === 'ios' ? GlobalMetrics.margin.extraHigh : GlobalMetrics.margin.veryHigh,
        left: GlobalMetrics.margin.veryHigh,
        right: GlobalMetrics.margin.veryHigh,
        backgroundColor: '#F0F0F0',
        height: 80,
        borderTopWidth: 0,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 10
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? 60 : 50,
        width: Platform.OS === 'ios' ? 60 : 50,
        borderRadius: GlobalMetrics.borderRadius.circular,
        marginTop: Platform.OS === 'ios' ? GlobalMetrics.padding.extraHigh : 20
    },
    activeIconContainer: {
        backgroundColor: '#000000',
    },
});