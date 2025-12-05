import { createSlice } from "@reduxjs/toolkit";
import {
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
} from "./favoritesOperations";

const initialState = {
    favorites: [],
    viewed: [],
    isLoading: false,
    error: null,
    activeTab: "favorites",
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,

    reducers: {
        setActiveTab(state, action) {
            state.activeTab = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // ------------------ FETCH ------------------
            .addCase(fetchFavorites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchFavorites.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.favorites = payload.favorites;
                state.viewed = payload.viewed;
            })

            .addCase(fetchFavorites.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })

            // ------------------ ADD ------------------
            .addCase(addToFavorites.fulfilled, (state, { payload }) => {
                const ids = payload; // масив ID з бекенду
                state.favorites = state.favorites.filter(item => ids.includes(item._id));
            })

            .addCase(removeFromFavorites.fulfilled, (state, { payload }) => {
                const ids = payload; // масив ID з бекенду
                state.favorites = state.favorites.filter(item => ids.includes(item._id));
            })

    },
});

export const { setActiveTab } = favoritesSlice.actions;
export default favoritesSlice.reducer;
