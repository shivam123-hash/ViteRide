import API_ROUTES from '../redux/endPoints/ApiRoutes';
import api from './apiClient';

export const getUserProfileService = async () => {
    try {
        const response = await api.get(API_ROUTES.GET_USER_PROFILE);
        console.log(response, 'response++++')
        return response;
    } catch (error) {
        console.log('errror', error)
        return Promise.reject(error);
    }
}
