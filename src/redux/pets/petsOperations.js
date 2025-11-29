import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/authOperations";

export const fetchPets = createAsyncThunk(
    "pets/fetchPets",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().pets;
        const { page, limit, search, category, gender, type, location, sort } = state;

        const params = { page, limit };

        if (search) params.keyword = search;
        if (category) params.category = category;
        if (gender) params.sex = gender;
        if (type) params.species = type;
        if (location) params.location = location;
        if (sort) params.sort = sort;

        try {
            const { data } = await api.get("/notices", { params });

            return {
                items: data.results,
                page: data.page,
                totalPages: data.totalPages
            };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);


export const fetchCategories = createAsyncThunk(
    "pets/fetchCategories",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/notices/categories");
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const fetchGenders = createAsyncThunk(
    "pets/fetchGenders",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/notices/sex");
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const fetchTypes = createAsyncThunk(
    "pets/fetchTypes",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/notices/species");
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);


export const fetchNoticeById = createAsyncThunk(
    "pets/fetchNoticeById",
    async (id, thunkAPI) => {
        console.log("FETCHING ID:", id);
        try {
            const { data } = await api.get(`/notices/${id}`);
            console.log("NOTICE DATA:", data);
            return data;
        } catch (err) {
            console.log("ERROR:", err.response?.data || err.message);
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchFavoriteList = createAsyncThunk(
    "pets/fetchFavoriteList",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/users/current");

            console.log("USER DATA FROM BACKEND:", data);

            // backend returns objects: noticesFavorites: [{_id, ...}, ...]
            return data.noticesFavorites?.map(fav => fav._id) || [];

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);


export const addFavorite = createAsyncThunk(
    "pets/addFavorite",
    async (id, thunkAPI) => {
        try {
            const { data } = await api.post(`/notices/favorites/add/${id}`);

            // data — це вже масив ID: ["id1", "id2", "id3"]
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const removeFavorite = createAsyncThunk(
    "pets/removeFavorite",
    async (id, thunkAPI) => {
        try {
            const { data } = await api.delete(`/notices/favorites/remove/${id}`);

            // data — це масив ID
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
