import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService, logoutService, registerService, verifyOtpService } from "../../../services/AuthServices";
import { clearUserData, getUserData, saveUserData } from "../../../units/AsyncStorageManager";
import { TokenService } from "../../../units/TokenServices";

export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue, dispatch }) => {
        try {
            const response = await loginService(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Login Failed'
            );
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await registerService(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Registration Failed'
            );
        }
    }
);

export const loadInitialState = createAsyncThunk(
    'auth/loadInitialState',
    async (_, { dispatch }) => {
        try {
            const storedData = await getUserData();
            const { user, role, accessToken } = storedData || {};
            if (accessToken) {
            }
            return {
                user: user || null,
                role: role || null,
                accessToken: accessToken || null,
                isLoggedIn: !!accessToken,
            };
        } catch (error) {
            throw error;
        }
    }
);

export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await verifyOtpService(payload);
            const data = response?.data || {};
            const accessToken =
                data?.accessToken || data?.access_token || data?.token || null;
            const refreshToken =
                data?.refreshToken || data?.refresh_token || null;
            const user = data?.user || null;
            const role = data?.user?.role || null;
            if (accessToken || refreshToken) {
                await TokenService.setTokens(accessToken, refreshToken);
            }
            await saveUserData({
                user,
                role,
                accessToken,
                refreshToken,
            });
            return data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                "OTP Verification Failed"
            );
        }
    }
);

export const logoutApi = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await logoutService();
            await clearUserData();
            return response.data;
        } catch (error) {
            await clearUserData();
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Logout Failed'
            );
        }
    }
);



const initialState = {
    isLoggedIn: false,
    user: null,
    role: null,
    accessToken: null,
    loading: false,
    mainloading: false,
    profileLoading: false,
    error: null,
    message: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // logout: (state) => {
        //     clearUserData();
        //     state.isLoggedIn = false;
        //     state.user = null;
        //     state.role = null;
        //     state.accessToken = null;
        //     state.error = null;
        //     state.message = null;
        // },
        resetAuthError: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                // state.isLoggedIn = true;
                state.user = action.payload?.user || null;
                state.role = action.payload?.user?.role || null;
                state.accessToken = action.payload?.accessToken || null;
                state.message = action.payload?.message || null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload?.message || 'Registration Successful';
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
            })
            .addCase(loadInitialState.pending, (state) => {
                state.mainloading = true;
            })
            .addCase(loadInitialState.fulfilled, (state, action) => {
                state.mainloading = false;
                state.isLoggedIn = action.payload.isLoggedIn;
                state.user = action.payload.user;
                state.role = action.payload.role;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(loadInitialState.rejected, (state) => {
                state.mainloading = false;
                state.isLoggedIn = false;
            })

            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload?.user || null;
                state.role = action.payload?.user?.role || null;
                state.accessToken =
                    action.payload?.accessToken ||
                    action.payload?.access_token ||
                    action.payload?.token ||
                    null;
                state.message =
                    action.payload?.message || "OTP verified successfully";
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload || "OTP verification failed";
            })
            .addCase(logoutApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutApi.fulfilled, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.user = null;
                state.role = null;
                state.accessToken = null;
                state.error = null;
                state.message = null;
            })
            .addCase(logoutApi.rejected, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.user = null;
                state.role = null;
                state.accessToken = null;
                state.error = null;
                state.message = null;
            });
    },
});

export const { resetAuthError } = authSlice.actions;
export default authSlice.reducer;