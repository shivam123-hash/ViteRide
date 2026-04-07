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

export const editUserProfileService = async (userData) => {
    try {
        const response = await api.patch(API_ROUTES.EDIT_USER_PROFILE, {
            name: userData.name,
            email: userData.email
        });
        console.log(response, 'response++++')
        return response;
    } catch (error) {
        console.log('errror', error)
        return Promise.reject(error);
    }
}


export const becomeDriverService = async (driverData) => {
    try {
        const payload = {
            vehicleType: driverData.vehicleCategory,
            vehicleNumber: driverData.plateNumber,
            vehicleModel: `${driverData.vehicleMake} ${driverData.vehicleModel}`,
            licenseNumber: driverData.plateNumber,
            licenseImageUrl: driverData.documents?.drivingLicense?.uri || null,
            vehicleImageUrl: driverData.documents?.profileSelfie?.uri || null,
        };

        console.log('🚀 API PAYLOAD:', JSON.stringify(payload, null, 2)); // ← add this

        const response = await api.post(API_ROUTES.BECOME_DRIVER, payload);
        return response;
    } catch (error) {
        console.log('errror', error)
        return Promise.reject(error);
    }
}


