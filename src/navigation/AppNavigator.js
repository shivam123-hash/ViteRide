import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import DriverAuthNavigator from './DriverAuthNavigator';
import DriverTabNavigator from './DriverTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const isLoggedIn = false;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isLoggedIn ? (
                    <Stack.Screen name="AuthFlow" component={AuthNavigator} />
                ) : (
                    <>
                        <Stack.Screen name="UserFlow" component={UserNavigator} />
                        <Stack.Screen name="DriverAuthFlow" component={DriverAuthNavigator} />
                        <Stack.Screen name="DriverFlow" component={DriverTabNavigator} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}