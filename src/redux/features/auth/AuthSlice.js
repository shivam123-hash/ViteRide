import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService,getProfileService} from "../../../services/authServices";
import { clearUserData, getUserData, saveUserData,  } from "../../../units/asyncStorageManager";

export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue, dispatch }) => {
        try {
            const response = await loginService(userData);
            saveUserData(response.data);
            dispatch(getProfile());
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

export const loadInitialState = createAsyncThunk(
    'auth/loadInitialState',
    async (_, { dispatch }) => {
        try {
            const storedData = await getUserData();
            const { user, role, accessToken } = storedData || {};
            if (accessToken) {
                dispatch(getProfile());
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

export const getProfile = createAsyncThunk(
    'auth/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProfileService();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Get profile failed'
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
        logout: (state) => {
            clearUserData();
            state.isLoggedIn = false;
            state.user = null;
            state.role = null;
            state.accessToken = null;
            state.error = null;
            state.message = null;
        },
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
                state.isLoggedIn = true;
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

            .addCase(getProfile.pending, (state) => {
                state.profileLoading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profileLoading = false;
                state.user = {
                    ...state.user,
                    ...(action.payload?.user || action.payload),
                };
                state.role = action.payload?.user?.role || action.payload?.role || state.role;
                console.log(action.payload, 'getProfile action payload');
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.profileLoading = false;
            })
    },
});

export const { logout, resetAuthError } = authSlice.actions;
export default authSlice.reducer;