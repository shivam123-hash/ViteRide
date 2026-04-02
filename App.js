import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/common/ThemeContest';
import AppNavigator from './src/navigation/AppNavigator';
import DriverTabNavigator from './src/navigation/DriverTabNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ThemeProvider>
        <AppNavigator />
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