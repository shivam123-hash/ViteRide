import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/AuthSlice';
import profileReducer from './features/profile/ProfileSlice';
import messageReducer from './features/messageSlice/messageSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        message: messageReducer,
    }
});

export default store;