import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/rider_screens/home_screen/HomeScreen';
import SearchScreen from '../screens/rider_screens/search_screen/SearchScreen';
import SelectRidesScreen from '../screens/rider_screens/select_ride_screen/SelectRidesScreen';
import ProposeFareScreen from '../screens/rider_screens/propose_fare/ProposeFareScreen';
import FindingRideScreen from '../screens/rider_screens/finding_ride_screen/FindingRideScreen';
import BookForOthersScreen from '../screens/rider_screens/book_for_others/BookForOthersScreen';
import InTransitScreen from '../screens/rider_screens/in_transit_screen/InTransitScreen';
import TripSummaryScreen from '../screens/rider_screens/trip_summary/TripSummaryScreen';
import EditProfileScreen from '../screens/commonScreens/profileScreeen/components/EditProfileScreen';
import ProfileScreen from '../screens/commonScreens/profileScreeen/ProfileScreen';
import LoginScreen from '../screens/commonScreens/authScreens/LoginScreen';
import DriverRegistrationFlowScreen from '../screens/commonScreens/authScreens/driverAuthScreens/DriverRegistrationFlowScreen';
import SavedAddressesScreen from '../screens/commonScreens/profileScreeen/components/SavedAddressesScreen';
import HelpSupportScreen from '../screens/commonScreens/profileScreeen/HelpSupportScreen';

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserHome" component={HomeScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SelectRides" component={SelectRidesScreen} />
      <Stack.Screen name="ProposeFare" component={ProposeFareScreen} />
      <Stack.Screen name="FindingRide" component={FindingRideScreen} />
      <Stack.Screen name="BookForOthers" component={BookForOthersScreen} />
      <Stack.Screen name="InTransit" component={InTransitScreen} />
      <Stack.Screen name="TripSummary" component={TripSummaryScreen} />
      <Stack.Screen name="DriverRegistration" component={DriverRegistrationFlowScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}