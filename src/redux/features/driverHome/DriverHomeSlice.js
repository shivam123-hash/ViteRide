import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { driverOfflineStatusService, driverOnlineStatusService, getDriverStatusService } from '../../../services/DriverHomeService';

export const DriverStatusOnline = createAsyncThunk(
    'driver/driverStatusOnline',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await driverOnlineStatusService();
            console.log(response, 'response_++__+__+_');
            if (response.status === 200) {
                dispatch(getDriverStatus());
            }
            return response.data;
        } catch (error) {
            console.log(error, 'error++++_++_');
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to set driver status online'
            );
        }
    }
);

export const DriverStatusOffline = createAsyncThunk(
    'driver/driverStatusOffline',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await driverOfflineStatusService();
            if (response.status === 200) {
                dispatch(getDriverStatus());
            }
            console.log(response, 'response_++__+__+_');
            return response.data;
        } catch (error) {
            console.log(error, 'error++++_++_');
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to set driver status offline'
            );
        }
    }
);

export const getDriverStatus = createAsyncThunk(
    'driver/getDriverStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getDriverStatusService();
            console.log(response.data.online, 'response_++__+__+_');
            return response.data.online;
        } catch (error) {
            console.log(error, 'error++++_++_');
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to get driver status'
            );
        }
    }
);

const initialState = {
    driverStatus: null,
    loading: false,
    error: null,
    message: null
};

const driverHomeSlice = createSlice({
    name: 'driverHome',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(DriverStatusOffline.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DriverStatusOffline.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(DriverStatusOffline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DriverStatusOnline.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DriverStatusOnline.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(DriverStatusOnline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getDriverStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDriverStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.driverStatus = action.payload;
            })
            .addCase(getDriverStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default driverHomeSlice.reducer;;