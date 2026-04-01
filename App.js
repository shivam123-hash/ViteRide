import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/common/ThemeContest';
import EditProfileScreen from './src/screens/commonScreens/profileScreeen/components/EditProfileScreen';
import LoginScreen from './src/screens/commonScreens/authScreens/LoginScreen';
import HomeScreen from './src/screens/rider_screens/home_screen/HomeScreen';
import SearchScreen from './src/screens/rider_screens/search_screen/SearchScreen';
import SelectRidesScreen from './src/screens/rider_screens/select_ride_screen/SelectRidesScreen';
import ProposeFareScreen from './src/screens/rider_screens/propose_fare/ProposeFareScreen';
import FindingRideScreen from './src/screens/rider_screens/finding_ride_screen/FindingRideScreen';
import BookForOthersScreen from './src/screens/rider_screens/book_for_others/BookForOthersScreen';
import InTransitScreen from './src/screens/rider_screens/in_transit_screen/InTransitScreen';
import TripSummaryScreen from './src/screens/rider_screens/trip_summary/TripSummaryScreen';
import DriverRegistrationFlowScreen from './src/screens/commonScreens/authScreens/driverAuthScreens/DriverRegistrationFlowScreen';
import MissionScreens from './src/screens/driver_screens/mission_screens/MissionScreens';
import HelpInfoScreen from './src/screens/driver_screens/help_info_screen/HelpInfoScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <ThemeProvider>
        <HelpInfoScreen />
      </ThemeProvider>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;