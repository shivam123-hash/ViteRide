import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveUserData = async (userData) => {
    try {
        if (userData) {
            await AsyncStorage.setItem('user', JSON.stringify(userData?.user));
            await AsyncStorage.setItem('role', JSON.stringify(userData?.user?.role));
            
            if (userData?.accessToken) {
                await AsyncStorage.setItem('accessToken', userData.accessToken);
            }
            if (userData?.refreshToken) {
                await AsyncStorage.setItem('refreshToken', userData.refreshToken);
            }
        }
    } catch (error) {
        console.log('Error saving user data:', error);
    }
};

export const saveProfileData = async (user) => {
    try {
        console.log("User from get async storage :", user)
        if (user) {
            await AsyncStorage.setItem('userProfile', JSON.stringify(user));
        }
    } catch (error) {
        console.log('Error saving user data:', error);
    }
}

export const getUserData = async () => {
    try {
        const user = await AsyncStorage.getItem('user');
        const role = await AsyncStorage.getItem('role');
        const accessToken = await AsyncStorage.getItem('accessToken');
        return {
            user: user ? JSON.parse(user) : null,
            role: role ? JSON.parse(role) : null,
            accessToken: accessToken ?? null, 
        };
    } catch (error) {
        return null;
    }
};


export const clearUserData = async () => {
    try {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('role');
        await AsyncStorage.removeItem('accessToken');
    } catch (error) {
        console.log('Error clearing user data:', error);
    }
};
