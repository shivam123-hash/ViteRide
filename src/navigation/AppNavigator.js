import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { loadInitialState } from '../redux/features/auth/AuthSlice';

import AuthNavigator from './AuthNavigator';
import UserNavigator from './UserNavigator';
import DriverTabNavigator from './DriverTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const dispatch = useDispatch();
    const { isLoggedIn, role, mainloading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(loadInitialState());
    }, [dispatch]);

    if (mainloading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isLoggedIn ? (
                    <Stack.Screen name="AuthFlow" component={AuthNavigator} />
                ) : role === 'driver' || role === 'Driver' ? (
                    <Stack.Screen name="DriverFlow" component={DriverTabNavigator} />
                ) : (
                    <Stack.Screen name="UserFlow" component={UserNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}