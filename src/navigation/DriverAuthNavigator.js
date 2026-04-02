import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverRegistrationFlowScreen from '../screens/commonScreens/authScreens/driverAuthScreens/DriverRegistrationFlowScreen';

const Stack = createNativeStackNavigator();

export default function DriverAuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DriverRegistration" component={DriverRegistrationFlowScreen} />
        </Stack.Navigator>
    );
}