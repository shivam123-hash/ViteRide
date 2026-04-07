import API_ROUTES from '../redux/endPoints/ApiRoutes';
import api from './apiClient';
import { tokenService } from '../units/TokenServices';

export const loginService = async (userData) => {
    try {
        const response = await api.post(API_ROUTES.LOGIN_AUTH, userData);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const registerService = async (userData) => {
    try {
        const response = await api.post(API_ROUTES.REGISTER_AUTH, userData);
        const accessToken = response?.data?.accessToken || response?.data?.access_token;
        if (accessToken) {
            await tokenService.setTokens(accessToken, null);
        }
        return response;
    } catch (error) {
        console.log(error,'error++++__+__+++__+_+__+_+_+_')
        if (error.response) {
            console.log("Server Responded With:", error.response.data);
        } else {
            console.log("Server did not respond at all. (Check your IP and Port!)");
        }
        return Promise.reject(error);
    }
}

export const verifyOtpService = async (payload) => {
    return api.post(API_ROUTES.VERIFY_OTP, payload);
};

export const logoutService = async () => {
    try {
        const response = await api.post(API_ROUTES.LOGOUT_AUTH);
        return response;
    } catch (error) {
        console.log('logout error:', error);
        return Promise.reject(error);
    }
};