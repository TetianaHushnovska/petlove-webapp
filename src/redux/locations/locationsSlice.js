import { createSlice } from "@reduxjs/toolkit";
import { fetchAvailableCities, searchCities } from "./locationsOperations";

const initialState = {
    list: [],
    searchResults: [],
    isLoading: false,
    error: null,
};

const locationsSlice = createSlice({
    name: "locations",
    initialState,
    reducers: {
        clearSearchResults(state) {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAvailableCities.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAvailableCities.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.list = payload;
            })
            .addCase(fetchAvailableCities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(searchCities.fulfilled, (state, { payload }) => {
                state.searchResults = payload;
            });
    }
});

export const { clearSearchResults } = locationsSlice.actions;
export default locationsSlice.reducer;
