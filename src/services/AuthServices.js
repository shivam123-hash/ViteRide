import API_ROUTES from '../redux/endPoints/ApiRoutes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './apiClient';
import { tokenService } from '../units/TokenServices';

export const loginService = async (userData) => {
    try {
        const response = await api.post(API_ROUTES.LOGIN_AUTH, userData);
        const accessToken = response?.data?.accessToken || response?.data?.access_token;

        if (accessToken) {
            await tokenService.setTokens(accessToken, null);
            await AsyncStorage.setItem('user_credentials', JSON.stringify(userData));
        }
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const registerService = async (userData) => {
    console.log(userData, 'userData+++')
    try {
        const response = await api.post(API_ROUTES.REGISTER_AUTH, userData);
        const accessToken = response?.data?.accessToken || response?.data?.access_token;
        if (accessToken) {
            await tokenService.setTokens(accessToken, null);
        }
        console.log('error:',response)
        return response;
    } catch (error) {
        console.log("--- API CRASH REPORT ---");
        console.log("URL Configured:", error.config?.url);
        console.log("Error Message:", error.message);
        if (error.response) {
            console.log("Server Responded With:", error.response.data);
        } else {
            console.log("Server did not respond at all. (Check your IP and Port!)");
        }
        return Promise.reject(error);
    }
}