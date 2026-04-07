import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUserProfileService } from '../../../services/ProfileService';

export const editUserProfile = createAsyncThunk(
    'users/editUserProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await editUserProfileService(userData);
            console.log(response, 'response_++__+__+_');
            return response.data.user;
        } catch (error) {
            console.log(error, 'error++++_++_');
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to edit profile'
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

const editProfileSlice = createSlice({
    name: 'editProfile',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(editUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(editUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default editProfileSlice.reducer;