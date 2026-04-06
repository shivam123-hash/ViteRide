import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/common/ThemeContest';
import AppNavigator from './src/navigation/AppNavigator';
import DriverTabNavigator from './src/navigation/DriverTabNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import MapsScreen from './src/screens/MapsScreen';
import OtpScreen from './src/screens/commonScreens/authScreens/components/AuthOtpScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Provider store={store}>
        <ThemeProvider>
          <AppNavigator />
          {/* <MapsScreen /> */}
          {/* <OtpScreen /> */}
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;