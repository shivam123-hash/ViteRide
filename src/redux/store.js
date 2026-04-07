import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/AuthSlice';
import profileReducer from './features/profile/ProfileSlice';
import messageReducer from './features/messageSlice/messageSlice';
import EditProfilReducer from './features/profile/EditProfileSlice';
import becomeDriverReducer from './features/profile/BecomeDriverSlice';
import driverHomeReducer from './features/driverHome/DriverHomeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        message: messageReducer,
        editProfile: EditProfilReducer,
        becomeDriver: becomeDriverReducer,
        driverHome: driverHomeReducer,
    }
});

export default store;