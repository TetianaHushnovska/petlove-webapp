import { createSlice } from "@reduxjs/toolkit";
import { fetchPets, fetchCategories, fetchGenders, fetchTypes } from "./petsOperations";
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
            state.totalPages = 0; // важливо!
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

                // Копіюємо масив
                let items = [...payload.items];

                // apply local sorting
                switch (state.sort) {
                    case "price:asc":
                        items.sort((a, b) => a.price - b.price);
                        break;

                    case "price:desc":
                        items.sort((a, b) => b.price - a.price);
                        break;

                    case "popularity:asc":
                        items.sort((a, b) => a.popularity - b.popularity);
                        break;

                    case "popularity:desc":
                        items.sort((a, b) => b.popularity - a.popularity);
                        break;

                    default:
                        break;
                }

                state.items = items;
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
