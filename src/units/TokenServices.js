import AsyncStorage from '@react-native-async-storage/async-storage';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const TokenService = {
  setTokens: async (access, refresh) => {
    try {
      if (access) await AsyncStorage.setItem(ACCESS_TOKEN, access);
      if (refresh) await AsyncStorage.setItem(REFRESH_TOKEN, refresh);

      console.log('tokenService.setTokens — stored access:', !!access, '| stored refresh:', !!refresh);
    } catch (error) {
      console.error('tokenService.setTokens error:', error);
    }
  },

  getAccessToken: async () => {
    try {
      return await AsyncStorage.getItem(ACCESS_TOKEN);
    } catch (error) {
      console.error('tokenService.getAccessToken error:', error);
      return null;
    }
  },

  getRefreshToken: async () => {
    try {
      const token = await AsyncStorage.getItem(REFRESH_TOKEN);
      if (!token) {
        console.warn('tokenService.getRefreshToken — no refresh token in storage');
      }
      return token;
    } catch (error) {
      console.error('tokenService.getRefreshToken error:', error);
      return null;
    }
  },

  clearTokens: async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      await AsyncStorage.removeItem(REFRESH_TOKEN);
      console.log('tokenService.clearTokens — tokens cleared');
    } catch (error) {
      console.error('tokenService.clearTokens error:', error);
    }
  },
};