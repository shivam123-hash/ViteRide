import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/commonScreens/authScreens/LoginScreen';
import OtpScreen from '../screens/commonScreens/authScreens/components/AuthOtpScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OtpScreen} />
        </Stack.Navigator>
    );
}