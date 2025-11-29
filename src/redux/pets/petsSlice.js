import { createSlice } from "@reduxjs/toolkit";
import {
    fetchPets,
    fetchCategories,
    fetchGenders,
    fetchTypes,
    fetchNoticeById,
    addFavorite,
    removeFavorite,
    fetchFavoriteList
} from "./petsOperations";
import { fetchAvailableCities } from "../locations/locationsOperations";

const initialState = {
    items: [],
    totalPages: 0,
    page: 1,
    limit: 6,

    search: "",
    category: "",
    gender: "",
    type: "",
    location: "",
    sort: "",

    categoriesList: [],
    gendersList: [],
    typesList: [],
    locationsList: [],

    favoriteIds: [],

    currentNotice: null,
    isLoading: false,
    error: null,
};

const petsSlice = createSlice({
    name: "pets",
    initialState,
    reducers: {
        setSearch(state, action) { state.search = action.payload; state.page = 1; },
        setCategory(state, action) { state.category = action.payload; state.page = 1; },
        setGender(state, action) { state.gender = action.payload; state.page = 1; },
        setType(state, action) { state.type = action.payload; state.page = 1; },
        setLocation(state, action) { state.location = action.payload; state.page = 1; },
        setSort(state, action) { state.sort = action.payload; state.page = 1; },

        setPage(state, action) {
            state.page = action.payload;
        },

        resetFilters(state) {
            state.search = "";
            state.category = "";
            state.gender = "";
            state.type = "";
            state.location = "";
            state.sort = "";
            state.page = 1;
            state.totalPages = 0;
        }
    },

    extraReducers: builder => {
        builder
            .addCase(fetchPets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchPets.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                // ❗ НЕ створюємо новий масив — React тепер не оновлює весь список
                state.items = payload.items;
                state.totalPages = payload.totalPages;
                state.page = payload.page;
            })

            .addCase(fetchPets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchCategories.fulfilled, (state, { payload }) => {
                state.categoriesList = payload;
            })

            .addCase(fetchGenders.fulfilled, (state, { payload }) => {
                state.gendersList = payload;
            })

            .addCase(fetchTypes.fulfilled, (state, { payload }) => {
                state.typesList = payload;
            })

            .addCase(fetchAvailableCities.fulfilled, (state, { payload }) => {
                state.locationsList = payload;
            })

            .addCase(fetchNoticeById.pending, (state) => {
                state.currentNotice = null;
                state.isLoading = true;
            })

            .addCase(fetchNoticeById.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.currentNotice = payload;
            })

            .addCase(fetchNoticeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // ⭐ favorites: завжди масив ID
            .addCase(fetchFavoriteList.fulfilled, (state, { payload }) => {
                state.favoriteIds = payload;
            })

            .addCase(addFavorite.fulfilled, (state, { payload }) => {
                state.favoriteIds = payload;
            })

            .addCase(removeFavorite.fulfilled, (state, { payload }) => {
                state.favoriteIds = payload;
            });
    }
});

export const {
    setSearch,
    setCategory,
    setGender,
    setType,
    setLocation,
    setSort,
    setPage,
    resetFilters,
} = petsSlice.actions;

export default petsSlice.reducer;
