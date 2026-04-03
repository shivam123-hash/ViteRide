import API_ROUTES from '../redux/endPoints/ApiRoutes';
import { tokenService } from '../units/tokenServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './apiClient';
import axios from 'axios';

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


export const registerService = async (userData) => { }

