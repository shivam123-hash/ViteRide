import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfileService } from "../../../services/ProfileService";

export const getUserProfile = createAsyncThunk(
    'users/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserProfileService();
            console.log(response, 'response_++__+__+_');
            return response.data.user;
        } catch (error) {
            console.log(error, 'error++++_++_');
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to fetch profile'
            );
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null,
    message: null
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;