import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/common/ThemeContest'; 
import EditProfileScreen from './src/screens/commonScreens/profileScreeen/components/EditProfileScreen';
import LoginScreen from './src/screens/commonScreens/authScreens/LoginScreen';
import HomeScreen from './src/screens/rider_screens/home_screen/HomeScreen';
import SearchScreen from './src/screens/rider_screens/search_screen/SearchScreen';
import SelectRidesScreen from './src/screens/rider_screens/select_ride_screen/SelectRidesScreen';

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
        <SelectRidesScreen  />
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