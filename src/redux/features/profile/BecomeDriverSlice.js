import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { becomeDriverService } from "../../../services/ProfileService";

export const becomeDriver = createAsyncThunk(
    'driver/becomeDriver',
    async (driverData, { rejectWithValue }) => {
        try {
            const response = await becomeDriverService(driverData);
            console.log(response, 'response_++__+__+_');
            return response.data.driver;
        } catch (error) {
            console.log(error, 'error++++_++_');
            return rejectWithValue(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to become driver'
            );
        }
    }
);

const initialState = {
    driverData: null,
    loading: false,
    error: null,
    message: null
};

const becomeDriverSlice = createSlice({
    name: 'becomeDriver',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(becomeDriver.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(becomeDriver.fulfilled, (state, action) => {
                state.loading = false;
                state.driverData = action.payload;
            })
            .addCase(becomeDriver.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default becomeDriverSlice.reducer;