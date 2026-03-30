import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/common/ThemeContest'; 
import EditProfileScreen from './src/screens/commonScreens/profileScreeen/components/EditProfileScreen';
import LoginScreen from './src/screens/commonScreens/authScreens/LoginScreen';

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
        <EditProfileScreen  />
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