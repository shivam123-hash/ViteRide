import API_ROUTES from '../redux/endPoints/ApiRoutes';
import api from './apiClient';

export const getMyRidesApi = async () => {
    try {
        const response = await api.get(API_ROUTES.MY_RIDES);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch ride history.';
    }
};