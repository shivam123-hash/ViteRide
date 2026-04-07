import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyRidesApi } from '../../../services/MyRidesService';

export const fetchMyRides = createAsyncThunk(
    'ride/fetchMyRides',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getMyRidesApi();
            return data?.rides || data || [];
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    rides: [],
    loading: false,
    error: null,
};

const rideSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        clearRideError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyRides.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyRides.fulfilled, (state, action) => {
                state.loading = false;
                state.rides = action.payload;
            })
            .addCase(fetchMyRides.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearRideError } = rideSlice.actions;
export default rideSlice.reducer;