import API_ROUTES from '../redux/endPoints/ApiRoutes';
import api from './apiClient';

export const driverOnlineStatusService = async () => {
    try {
        const response = await api.post(API_ROUTES.DRIVER_STATUS_ONLINE);
        return response;
    } catch (error) {
        console.log('errror', error)
        return Promise.reject(error);
    }
}

export const driverOfflineStatusService = async () => {
    try {
        const response = await api.post(API_ROUTES.DRIVER_STATUS_OFFLINE);
        return response;
    } catch (error) {
        console.log('errror', error)
        return Promise.reject(error);
    }
}

export const getDriverStatusService = async () => {
    try {
        const response = await api.get(API_ROUTES.GET_DRIVER_STATUS);
        return response;
    } catch (error) {
        console.log('errror', error)
        return Promise.reject(error);
    }
}
     